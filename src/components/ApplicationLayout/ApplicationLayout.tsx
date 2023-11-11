import DragArea from '../DragArea';
import Loader from '../Loader';
import { useState } from 'react';
import './ApplicationLayout.styles.scss';

interface ApplicationLayoutProps {
  isLoading?: boolean;
  isInitializing?: boolean;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationLayout = (
  props: React.PropsWithChildren<ApplicationLayoutProps>
) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setTimeout(() => setIsDragging(false), 1000);
  }

  return (
    <div
      className="app-layout"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {props.children}

      {isDragging && <DragArea onFileChange={props.onFileChange} />}

      {props.isLoading && (
        <Loader>
          <div>
            Uploading media,
            <br />
            please wait ...
          </div>
        </Loader>
      )}

      {props.isInitializing && (
        <Loader>
          <div>
            Initializing,
            <br />
            please wait ...
          </div>
        </Loader>
      )}
    </div>
  );
};

export default ApplicationLayout;
