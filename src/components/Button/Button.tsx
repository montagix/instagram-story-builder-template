import './Button.styles.scss';

interface ButtonProps {
  value: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => (
  <button className="btn" disabled={props.disabled} onClick={props.onClick}>
    {props.value}
  </button>
);

export default Button;
