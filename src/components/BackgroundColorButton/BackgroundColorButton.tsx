import React from 'react';
import './BackgroundColorButton.styles.scss';
import ColorPicker from '../ColorPicker';
import Popover from '../Popover';

interface BackgroundColorButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const BackgroundColorButton = (props: BackgroundColorButtonProps) => {
  return (
    <Popover
      trigger={
        <div
          className="bg-color-btn"
          style={{
            background: props.value,
          }}
        ></div>
      }
    >
      <ColorPicker value={props.value} onChange={props.onChange} gradient />
    </Popover>
  );
};

export default BackgroundColorButton;
