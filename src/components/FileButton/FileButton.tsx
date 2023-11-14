import IconButton, { IconButtonProps } from '../IconButton';

interface FileButtonProps extends IconButtonProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileButton = (props: FileButtonProps) => {
  return (
    <IconButton {...props}>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,video/*"
        onChange={props.onChange}
        id='file-upload-button'
      />
      <label htmlFor="file-upload-button"></label>
    </IconButton>
  );
};

export default FileButton;
