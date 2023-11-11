import { useEngineStoreContext } from '../../contexts/EngineStoreContext';
import { useEffect, useRef } from 'react';
import MoveableContainer from './containers/MoveableContainer';
import Toolbar from '../toolbar';

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
    <div className="relative">
      <div ref={containerRef} />

      <MoveableContainer>
        <Toolbar />
      </MoveableContainer>
    </div>
  );
};

export default Composition;
