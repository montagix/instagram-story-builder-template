import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import './ButtonGroup.styles.scss';

interface ButtonProps {
  value: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
  defaultValue: string;
  ariaLabel: string;
}

const ButtonGroup = (props: ButtonGroupProps) => (
  <ToggleGroup.Root
    className="btn-group"
    type="single"
    defaultValue={props.defaultValue}
    aria-label={props.ariaLabel}
  >
    {props.buttons.map((button, index) => (
      <ToggleGroup.Item
        key={index}
        className="btn-group__item"
        value={button.value}
        aria-label={button.ariaLabel}
      >
        {button.icon}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
);

export default ButtonGroup;
