import { ClipNode, CompositingNode, FilterNode } from '@montagix/engine';
import { useEngineStoreContext } from '../contexts/EngineStoreContext';
import { useApplicationContext } from '../contexts/ApplicationContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DEFAULT_FONTS } from '../config/fonts.constants';

const useComposition = () => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.engine;
  const [isLoading, setLoading] = useState(false);
  const { layerId } = useApplicationContext();

  const domToPixiFontSize = (fontSize: number) => {
    const [canvasX, canvasY] = engine.resolution;
    const parentNode = (engine.app.view.parentNode as HTMLElement | null);

    if(!parentNode) return fontSize;

    const container = parentNode.getBoundingClientRect();

    return (fontSize / container.width) * canvasX;
  };

  async function handleAddText() {
    try {
      const node = await engine.text('Double click to edit');

      node.startAt = 0;
      node.style.fontSize = domToPixiFontSize(25);
      node.style.fontFamily = ['SF Pro'];
      node.style.fontWeight = '600';
      node.style.color = 'FFFFFF';
      node.style.backgroundColor = '000000';
      
      node.style.zIndex = engine.getBiggestZIndex() + 1;

      const layer = engine.sceneGraph.getNodeById(layerId) as CompositingNode;
      layer?.addNode(node);
      engine.rerender();
    } finally {
      makeClipsHaveSameDuration();
    }
  }

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file == null) {
      return;
    }

    const isVideo = file.type.includes('video');
    const isImage = file.type.includes('image');

    if (isVideo) {
      return handleAddVideo(file);
    }

    if (isImage) {
      return handleAddImage(file);
    }

    return null;
  }

  async function handleAddImage(url: File) {
    setLoading(true);

    try {
      const node = await engine.image(url);

      node.startAt = 0;
      node.style.zIndex = engine.getBiggestZIndex() + 1;

      const layer = engine.sceneGraph.getNodeById(layerId) as CompositingNode;
      layer?.addNode(node);
      engine.rerender();
    } catch (e: any) {
      toast.error(e.message || e);
      console.log({ e });
    } finally {
      makeClipsHaveSameDuration();
      setLoading(false);
    }
  }

  async function handleAddVideo(url: File) {
    setLoading(true);

    try {
      const node = await engine.video(url);

      node.startAt = 0;
      node.style.zIndex = engine.getBiggestZIndex() + 1;

      const layer = engine.sceneGraph.getNodeById(layerId) as CompositingNode;
      layer?.addNode(node);
      engine.rerender();
    } catch (e: any) {
      toast.error(e.message || e);
      console.log({ e });
    } finally {
      makeClipsHaveSameDuration();
      setLoading(false);
    }
  }

  function handleAddFilter(filter: FilterNode | null) {
    const layer = engine.sceneGraph.getNodeById(layerId) as CompositingNode;

    if (filter == null) {
      layer.resetFilters();
      return;
    }

    layer?.addFilter(filter);
  }

  async function handleAddGif(src: string) {
    setLoading(true);

    try {
      const node = await engine.gif(src);
      node.startAt = 0;
      node.style.zIndex = engine.getBiggestZIndex() + 1;

      const layer = engine.sceneGraph.getNodeById(layerId) as CompositingNode;
      layer.addNode(node);
    } catch (e: any) {
      toast.error(e.message || e);
      console.log({ e });
    } finally {
      makeClipsHaveSameDuration();
      setLoading(false);
    }
  }

  function handleCreateLayer() {
    const layer = new CompositingNode();
    engine.sceneGraph.addNode(layer);

    return layer;
  }

  function handleLoadFonts() {
    Object.entries(DEFAULT_FONTS).forEach(([name, url]) => {
      engine.fontRegistry.loadFromCssUrl(name, url);
    });
  }
  function makeClipsHaveSameDuration() {
    engine.sceneGraph.nodes.forEach((node) => {
      if (node instanceof ClipNode) {
        node.duration = engine.duration;
      }
    });

    engine.seek(0);
    engine.play();
  }

  return {
    isLoading,
    onAddImage: handleAddImage,
    onAddVideo: handleAddVideo,
    onAddText: handleAddText,
    onUploadFile: handleUploadFile,
    onAddGif: handleAddGif,
    onAddFilter: handleAddFilter,
    onLoadFonts: handleLoadFonts,
    onCreateLayer: handleCreateLayer,
  };
};

export default useComposition;
