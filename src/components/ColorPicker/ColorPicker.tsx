import React from 'react';
import ReactGPicker from 'react-gcolor-picker';
import './ColorPicker.styles.scss';

interface ColorPickerProps {
  value: string;
  gradient?: boolean;
  onChange: (color: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  return (
    <div className="g-color-picker">
      <ReactGPicker
        format="hex"
        value={props.value}
        solid
        gradient={props.gradient}
        debounceMS={0}
        showGradientMode={false}
        showGradientAngle={false}
        showGradientPosition={false}
        showGradientStops
        showGradientResult={false}
        defaultColors={[]}
        onChange={props.onChange}
      />
    </div>
  );
};

export default ColorPicker;
