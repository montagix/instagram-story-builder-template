import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import './Popover.styles.scss';

interface PopoverProps {
  trigger: React.ReactElement;
}

const Popover = (props: React.PropsWithChildren<PopoverProps>) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{props.trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="popover__content" sideOffset={5}>
          {props.children}

          <RadixPopover.Arrow className="popover__arrow" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
