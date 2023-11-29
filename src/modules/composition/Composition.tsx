import { useEngineStoreContext } from '../../contexts/EngineStoreContext';
import { useEffect, useRef } from 'react';
import MoveableContainer from './containers/MoveableContainer';
import Toolbar from '../toolbar';
import './Composition.styles.scss';

const Composition = () => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current != null) {
      engine.append(containerRef.current);
    }
  }, [containerRef.current]);

  return (
    <div className="app-composition">
      <div ref={containerRef} className='app-composition__editor-container' />

      <MoveableContainer>
        <Toolbar />
      </MoveableContainer>
    </div>
  );
};

export default Composition;
