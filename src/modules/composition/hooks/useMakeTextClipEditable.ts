import { TextNode } from '@montagix/engine';
import engineStore from '../../../store/EngineStore';
import { useEffect } from 'react';
import { reaction } from 'mobx';

interface UseCreateEditableClipProps {
  targetRef: React.RefObject<HTMLElement>;
}

const useMakeTextClipEditable = (props: UseCreateEditableClipProps) => {
  const engine = engineStore.getEngine();
  const selectedNodeId = engine.selectedNodeId;

  const textEditorId = (): string => {
    return `text-editor-${selectedNodeId}`;
  };

  useEffect(() => {
    if (props.targetRef.current == null || !selectedNodeId) return;

    const clip = engine.sceneGraph.getNodeById(selectedNodeId);
    if (!clip || !(clip instanceof TextNode)) return;

    props.targetRef.current.addEventListener('dblclick', dblClick);

    const disposer = reaction(
      () => clip.style?.toStyleObject(),
      (newStyle) => {
        if (newStyle == null || props.targetRef.current == null) {
          return;
        }

        const textInput = props.targetRef.current.querySelector(
          `#${textEditorId()}`
        ) as HTMLInputElement;
        if (textInput == null) return;

        Object.assign(textInput.style, extractTextStyles(newStyle));
      }
    );

    return () => {
      disposer();
      props.targetRef.current?.removeEventListener('dblclick', dblClick);
    };
  }, [props.targetRef.current, selectedNodeId]);

  const dblClick = () => {
    if (!props.targetRef?.current || !selectedNodeId) return;

    let textInput = props.targetRef.current.querySelector(
      `#${textEditorId()}`
    ) as HTMLInputElement;

    if (textInput) {
      textInput.focus();
      return;
    }

    const clip = engine.sceneGraph.getNodeById(selectedNodeId);
    if (!clip || !(clip instanceof TextNode)) return;

    textInput = createInputElement(clip);
    props.targetRef.current.appendChild(textInput);
    textInput.focus();
  };

  function createInputElement(clip: TextNode): HTMLInputElement {
    const clipStyle = clip.style.toStyleObject();

    const input = document.createElement('input');
    input.id = textEditorId();
    input.setAttribute('type', 'text');

    Object.assign(input.style, extractTextStyles(clipStyle), {
      position: 'absolute',
      top: '0',
      width: '100%',
      height: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '0',
      overflow: 'visible',
      color: 'transparent',
    } as CSSStyleDeclaration);

    input.value = clip.text;

    input.addEventListener('input', (event: any) => {
      clip.changeText(event.target.value);
      clip.style.update(clip.sprite!);
    });

    return input;
  }

  function extractTextStyles(
    clipStyle: Partial<Record<keyof CSSStyleDeclaration, any>>
  ): Partial<Record<keyof CSSStyleDeclaration, any>> {
    return {
      fontSize: clipStyle.fontSize,
      fontFamily: clipStyle.fontFamily,
      fontWeight: clipStyle.fontWeight,
      fontStyle: clipStyle.fontStyle,
      textAlign: clipStyle.textAlign,
      caretColor: clipStyle.color,
    };
  }
};

export default useMakeTextClipEditable;
