import React, { useEffect, useMemo } from 'react';
import { useEngineStoreContext } from '../../contexts/EngineStoreContext';
import CompositionContainer from '../../modules/composition/Composition';
import { observer } from 'mobx-react-lite';
import { ClipNode } from '@montagix/engine';

import ApplicationLayout from '../../components/ApplicationLayout';
import ApplicationLayoutHeader from '../../components/ApplicationLayoutHeader';
import ApplicationLayoutContent from '../../components/ApplicationLayoutContent';
import { useApplicationContext } from '../../contexts/ApplicationContext';
import ApplicationLayoutFooter from '../../components/ApplicationLayoutFooter';
import useComposition from '../../hooks/useComposition';

const EditorContainer = observer(() => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();

  const {
    isLoading,
    onAddGif,
    onAddFilter,
    onAddText,
    onUploadFile,
    onLoadFonts,
    onCreateLayer,
  } = useComposition();

  const { onSelectLayerId } = useApplicationContext();

  useEffect(() => {
    if (engine.isInitializing) return;

    init();
  }, [engine.isInitializing]);

  async function init() {
    const layer = onCreateLayer();

    onLoadFonts();
    onSelectLayerId(layer.id);

    engine.loop = true;
    engine.play();
  }

  const isCompositionEmpty = useMemo(() => {
    let result = true;

    engine.sceneGraph.nodes.forEach((node) => {
      if (node instanceof ClipNode) {
        result = false;
      }
    });

    return result;
  }, [engine.sceneGraph.nodes.size]);

  function handleChangeBackgroundColor(color: string) {
    engine.setBackgroundColor(color);
  }

  async function handleSave() {
    return engine.render();
  }

  return (
    <ApplicationLayout
      onFileChange={onUploadFile}
      isLoading={isLoading}
      isInitializing={engine.isInitializing}
    >
      <ApplicationLayoutHeader onSave={handleSave} />

      <ApplicationLayoutContent
        isEmpty={isCompositionEmpty}
        isDisabled={engine.isInitializing}
        onAddText={onAddText}
        onUploadFile={onUploadFile}
      >
        <CompositionContainer />
      </ApplicationLayoutContent>

      <ApplicationLayoutFooter
        backgroundColor={engine.backgroundColor}
        onAddText={onAddText}
        onAddFilter={onAddFilter}
        onChangeBackgroundColor={handleChangeBackgroundColor}
        onAddGif={onAddGif}
        onUploadFile={onUploadFile}
      />
    </ApplicationLayout>
  );
});

export default EditorContainer;
