import React, { useEffect, useRef } from 'react';
import { reaction } from 'mobx';
import Moveable from 'moveable';
import engineStore from '../../../store/EngineStore';
import { ClipNode, MediaClipNode, TextNode } from '@montagix/engine';

interface UseCreateInteractiveClipProps {
  targetRef: React.RefObject<HTMLElement>;
  toolbarRef: React.RefObject<HTMLElement>;
}

const pixiConvertor = () => {
  const engine = engineStore.getEngine();
  const [canvasX, canvasY] = engine.resolution;
  const parentNode = (engine.app.view.parentNode as HTMLElement | null);

  if(!parentNode) return;

  const container = parentNode.getBoundingClientRect();

  function coordinatesToDom(x: number, y: number) {
    return {
      x: (x / canvasX) * container.width,
      y: (y / canvasY) * container.height,
    };
  }

  function coordinatesToPixi(x: number, y: number) {
    return {
      x: (x / container.width) * canvasX,
      y: (y / container.height) * canvasY,
    };
  }

  function sizeToDom(width: number, height: number) {
    return {
      width: (width / canvasX) * container.width,
      height: (height / canvasY) * container.height,
    }
  }

  function sizeToPixi(width: number, height: number) {
    return {
      width: (width / container.width) * canvasX,
      height: (height / container.height) * canvasY
    }
  }

  return {
    pixiToDomCoordinates: coordinatesToDom,
    domToPixiCoordinates: coordinatesToPixi,
    pixiToDomSizes: sizeToDom,
    domToPixiSizes: sizeToPixi
  }
}

const useMakeClipInteractive = (props: UseCreateInteractiveClipProps) => {
  const moveableRef = useRef<Moveable | null>(null);
  const engine = engineStore.getEngine();
  const selectedNodeId = engine.selectedNodeId;
  let convertor = pixiConvertor();
  

  useEffect(() => {
    if (selectedNodeId == null || props.targetRef.current == null) {
      return;
    }

    const node = engine.sceneGraph.getNodeById(selectedNodeId);

    if (node == null || !(node instanceof ClipNode)) {
      return;
    }

    convertor = pixiConvertor()!;

    Object.assign(props.targetRef.current.style, node.style?.toStyleObject());
  
    const transorm = parseTransform(props.targetRef.current.style.transform);
    const domCoord = convertor.pixiToDomCoordinates(transorm.x, transorm.y);
    const size = convertor.pixiToDomSizes(props.targetRef.current.clientWidth, props.targetRef.current.clientHeight);
    
    props.targetRef.current.style.transform = `translate(${domCoord.x}px, ${domCoord.y}px) rotate(${transorm.rotation}rad)`;
    props.targetRef.current.style.width = `${size.width}px`;
    props.targetRef.current.style.height = `${size.height}px`;
    

    const disposer = reaction(
      () => node.style?.toStyleObject(),
      (newStyle) => {
        if (newStyle == null || props.targetRef.current == null) {
          return;
        }

        Object.assign(props.targetRef.current.style, newStyle);

        const transorm = parseTransform(props.targetRef.current.style.transform);
        const domCoord = convertor!.pixiToDomCoordinates(transorm.x, transorm.y);
        const size = convertor!.pixiToDomSizes(props.targetRef.current.clientWidth, props.targetRef.current.clientHeight);
        
        props.targetRef.current.style.transform = `translate(${domCoord.x}px, ${domCoord.y}px) rotate(${transorm.rotation}rad)`;
        props.targetRef.current.style.width = `${size.width}px`;
        props.targetRef.current.style.height = `${size.height}px`;

        moveableRef.current?.updateRect();
      }
    );

    return () => {
      disposer();
    };
  }, [selectedNodeId]);

  useEffect(() => {
    if (selectedNodeId == null) {
      return;
    }

    const node = engine.sceneGraph.getNodeById(selectedNodeId) as
      | MediaClipNode
      | TextNode;

    if (node.sprite == null) {
      return;
    }

    moveableRef.current = new Moveable(document.body, {
      target: props.targetRef.current,
      draggable: true,
      resizable: true,
      rotatable: true,
      keepRatio: true,
      throttleResize: 0,
      throttleDrag: 0,
      throttleRotate: 0,
    });

    moveableRef.current.on('drag', ({ translate: [x, y] }) => {
      const pixiCoords = convertor!.domToPixiCoordinates(x, y);

      node.style.x = pixiCoords.x;
      node.style.y = pixiCoords.y;

      node.style.update(node.sprite as any);
    });

    moveableRef.current.on('resize', (event) => {
      let [width, height] = event.delta;
      let { x, y } = parseTransform(event.transform);

      const sizes = convertor!.domToPixiSizes(width, height);
      width = sizes.width;
      height = sizes.height;

      const coord = convertor!.domToPixiCoordinates(x, y);
      x = coord.x;
      y = coord.y;

      if (node instanceof MediaClipNode) {
        node.style.width += width;
        node.style.height += height;
      }

      if (node instanceof TextNode) {
        const fontSize = node.style.fontSize + width / 10;
        node.changeFontSize(fontSize);
      }

      node.style.x = x;
      node.style.y = y;

      node.style.update(node.sprite as any);
      event.target.style.transform = event.transform;
    });

    moveableRef.current.on('rotate', (event) => {
      event.target.style.transformOrigin = '0% 0%';

      const { rotation } = parseTransform(event.transform);

      node.style.rotation = rotation;
      node.style.update(node.sprite as any);
    });

    moveableRef.current.on('dragEnd', (_) => engine.commit());
    moveableRef.current.on('rotateEnd', (_) => engine.commit());
    moveableRef.current.on('resizeEnd', (_) => engine.commit());

    return () => {
      moveableRef.current?.destroy();
    };
  }, [selectedNodeId, props.targetRef]);
};

function parseTransform(transformString: string) {
  const translateMatch = transformString.match(
    /translate\((-?\d+(\.\d+)?)px,\s*(-?\d+(\.\d+)?)px\)/
  );
  const rotateRadMatch = transformString.match(/rotate\((-?\d+(\.\d+)?)rad\)/);
  const rotateDegMatch = transformString.match(/rotate\((-?\d+(\.\d+)?)deg\)/);

  let rotation = 0;

  if (rotateRadMatch) {
    rotation = parseFloat(rotateRadMatch[1]);
  } else if (rotateDegMatch) {
    // Convert degree to radian
    rotation = parseFloat(rotateDegMatch[1]) * (Math.PI / 180);
  }

  return {
    x: translateMatch ? parseFloat(translateMatch[1]) : 0,
    y: translateMatch ? parseFloat(translateMatch[3]) : 0,
    rotation: rotation,
  };
}

export default useMakeClipInteractive;
