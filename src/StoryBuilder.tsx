import EngineStoreContextProvider from './contexts/EngineStoreContext';
import EditorContainer from './containers/EditorContainer/EditorContainer';
import ApplicationContextProvider from './contexts/ApplicationContext';
import './theme/main.scss';

interface StoryBuilderProps {
  giphyKey?: string;
}

const StoryBuilder = (props: StoryBuilderProps) => {
  return (
    <ApplicationContextProvider giphyKey={props.giphyKey}>
      <EngineStoreContextProvider>
        <EditorContainer />
      </EngineStoreContextProvider>
    </ApplicationContextProvider>
  );
};

export { StoryBuilder };
