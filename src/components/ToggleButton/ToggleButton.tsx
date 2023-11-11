import IconButton from '../IconButton';
import './ToggleButton.styles.scss';
import { useState } from 'react';
import { clsx } from 'clsx';

interface ToggleButtonProps {
  enabled?: boolean;
  icon: React.ReactElement;
  onClick: (isEnabled: boolean) => void;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const [isEnabled, setEnabled] = useState<boolean>(!!props.enabled);

  function handleClick() {
    setEnabled(!isEnabled);
    props.onClick(!isEnabled);
  }

  return (
    <div
      className={clsx('toggle-btn', {
        'toggle-btn--active': isEnabled,
      })}
    >
      <IconButton icon={props.icon} onClick={handleClick} />
    </div>
  );
};

export default ToggleButton;
