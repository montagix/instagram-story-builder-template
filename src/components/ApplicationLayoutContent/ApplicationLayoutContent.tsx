import UploadImageIcon from '../../assets/images/upload-image-icon.svg';
import AddTextIcon from '../../assets/images/add-text-icon.svg';
import InstagramBottomBarImage from '../../assets/images/instagram-ui-bottom-bar.svg';
import Toaster from '../Toaster';
import './ApplicationLayoutContent.styles.scss';

interface StoryBuilderContentProps {
  isEmpty: boolean;
  isDisabled: boolean;
  onAddText: () => void;
  onUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationLayoutContent = (
  props: React.PropsWithChildren<StoryBuilderContentProps>
) => (
  <div className="app-layout-content">
    <div className="app-layout-content__progress-bar"></div>
    <div className="app-layout-content__user">
      <div className="app-layout-content__user__icon"></div>
      <div>username</div>
      <div>6h</div>
    </div>

    {props.children}

    {props.isEmpty && (
      <div className="app-layout-content__input-buttons">
        <button disabled={props.isDisabled}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,video/*"
            onChange={props.onUploadFile}
          />
          <UploadImageIcon />
          Upload Photos, Videos
        </button>
        <button onClick={props.onAddText} disabled={props.isDisabled}>
          <AddTextIcon />
          Write something
        </button>
      </div>
    )}

    {/* @ts-ignore */}
    <InstagramBottomBarImage className="app-layout-content__footer" />
    <Toaster />
  </div>
);

export default ApplicationLayoutContent;
