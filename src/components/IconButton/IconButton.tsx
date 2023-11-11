import './IconButton.styles.scss';
import { clsx } from 'clsx';

export interface IconButtonProps {
  icon?: React.ReactElement;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'default' | 'file-input';
  disabled?: boolean;
  style?: React.CSSProperties;
}

const IconButton = (props: React.PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      className={clsx('icon-btn', props.className)}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
    >
      {props.children}
      {props.icon}
    </button>
  );
};

export default IconButton;
