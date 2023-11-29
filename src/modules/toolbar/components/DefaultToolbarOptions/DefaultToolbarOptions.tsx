import React from 'react';
import IconButton from '../../../../components/IconButton';
import LayerDownIcon from '../../../../assets/images/layer-down-icon.svg';
import LayerUpIcon from '../../../../assets/images/layer-up-icon.svg';
import DeleteIconIcon from '../../../../assets/images/delete-icon.svg';
import { ClipNode } from '@montagix/engine';
import { useEngineStoreContext } from '../../../../contexts/EngineStoreContext';
import './DefaultToolbarOptions.styles.scss';
import { observer } from 'mobx-react-lite';

interface DefaultToolbarOptionsProps {
  node: ClipNode;
}

const DefaultToolbarOptions = observer(
  ({ node, children }: React.PropsWithChildren<DefaultToolbarOptionsProps>) => {
    const engineStore = useEngineStoreContext();
    const engine = engineStore.getEngine();

    function handleDelete() {
      engine.sceneGraph.removeNode(node.id);
      engine.rerender();
    }

    function handleLayerUp() {
      if (node.style.zIndex >= engine.getBiggestZIndex()) return;

      node.style.zIndex += 2;
    }

    function handleLayerDown() {
      if (node.style.zIndex <= 1) return;

      node.style.zIndex -= 2;
    }

    return (
      <div className="toolbar-options">
        {children}

        <IconButton icon={<LayerDownIcon />} onClick={handleLayerDown} />
        <IconButton icon={<LayerUpIcon />} onClick={handleLayerUp} />
        <IconButton icon={<DeleteIconIcon />} onClick={handleDelete} />
      </div>
    );
  }
);

export default DefaultToolbarOptions;
