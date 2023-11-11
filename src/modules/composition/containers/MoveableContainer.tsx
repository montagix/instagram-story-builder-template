import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import useMakeClipInteractive from '../hooks/useMakeClipInteractive';
import useMakeTextClipEditable from '../hooks/useMakeTextClipEditable';
import { useEngineStoreContext } from '../../../contexts/EngineStoreContext';

const MoveableContainer = observer((props: React.PropsWithChildren) => {
  const handlerRef = useRef<HTMLDivElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();
  const selectedNodeId = engine.selectedNodeId;

  useMakeClipInteractive({
    targetRef: handlerRef,
    toolbarRef: toolbarRef,
  });

  useMakeTextClipEditable({
    targetRef: handlerRef,
  });

  if (selectedNodeId == null) {
    return null;
  }

  return (
    <div ref={handlerRef} className="absolute">
      <div
        ref={toolbarRef}
        style={{
          bottom: '-58px',
          position: 'absolute',
          left: 0,
          right: 0,
          marginInline: 'auto',
          width: 'fit-content',
        }}
      >
        {props.children}
      </div>
    </div>
  );
});

export default MoveableContainer;
