import React from 'react';
import './PopoverGridContent.styles.scss';
import { clsx } from 'clsx';

interface GridItem {
  title?: string;
  previewComponent?: React.ReactElement;
  value: string | null;
}

interface PopoverGridContentProps {
  items: GridItem[];
  onClick: (value: string | null) => void;
}

const PopoverGridContent = (props: PopoverGridContentProps) => {
  function handleClick(item: GridItem) {
    props.onClick(item.value);
  }

  return (
    <div className="popover-grid-content">
      {props.items.map((item, index) => (
        <div
          key={item.title}
          className="popover-grid-content__container"
          onClick={() => handleClick(item)}
        >
          <div
            className={clsx('popover-grid-content__item', {
              'popover-grid-content__item--selected': index === 0,
            })}
          >
            {item.previewComponent != null && (
              <div className="popover-grid-content__component">
                {item.previewComponent}
              </div>
            )}

            <span>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopoverGridContent;
