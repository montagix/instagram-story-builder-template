import DragAndDropIcon from '../../assets/images/drag-and-drop-icon.svg';
import './DragArea.styles.scss';

interface StoryBuilderDragAreaProps {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DragArea = (props: StoryBuilderDragAreaProps) => (
  <div className="drag-area">
    <div>
      <DragAndDropIcon />
      <div>
        Drag and drop
        <br />
        Image or Video to upload
      </div>
    </div>

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp,video/*"
      onChange={props.onFileChange}
    />
  </div>
);

export default DragArea;
