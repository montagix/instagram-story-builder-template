import IconButton from '../../../../components/IconButton';
import ColorPicker from '../../../../components/ColorPicker';
import Popover from '../../../../components/Popover';

interface ButtonColorPickerProps {
  icon: React.ReactElement;
  value: string;
  gradient?: boolean;
  onChange: (color: string) => void;
  buttonStyle?: React.CSSProperties;
}

const ButtonColorPicker = (props: ButtonColorPickerProps) => {
  return (
    <div>
      <Popover
        trigger={
          <div>
            <IconButton icon={props.icon} style={props.buttonStyle} />
          </div>
        }
      >
        <ColorPicker
          value={props.value}
          onChange={props.onChange}
          gradient={props.gradient}
        />
      </Popover>
    </div>
  );
};

export default ButtonColorPicker;
