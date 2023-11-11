import React from 'react';
import { useEngineStoreContext } from '../../contexts/EngineStoreContext';
import { GIFNode, ImageNode, TextNode, VideoNode } from '@montagix/engine';
import DefaultToolbarOptions from './components/DefaultToolbarOptions';
import TextToolbarOptions from './components/TextToolbarOptions';
import { observer } from 'mobx-react-lite';
import './Toolbar.styles.scss';

const Toolbar = observer(() => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();
  const selectedNodeId = engine.selectedNodeId;

  const renderContent = () => {
    if (selectedNodeId == null) {
      return null;
    }

    const selectedNode = engine.sceneGraph.getNodeById(selectedNodeId);

    if (selectedNode instanceof VideoNode) {
      return <DefaultToolbarOptions node={selectedNode} />;
    } else if (selectedNode instanceof ImageNode) {
      return <DefaultToolbarOptions node={selectedNode} />;
    } else if (selectedNode instanceof TextNode) {
      return <TextToolbarOptions node={selectedNode} />;
    } else if (selectedNode instanceof GIFNode) {
      return <DefaultToolbarOptions node={selectedNode} />;
    } else {
      return null;
    }
  };

  return <div className="toolbar">{renderContent()}</div>;
});

export default Toolbar;
