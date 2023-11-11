import './Dropdown.styles.scss';
import DropdownIcon from '../../assets/images/dropdown-open-icon.svg';
import { useMemo, useState } from 'react';
import { clsx } from 'clsx';

export interface DropdownOption {
  value: string;
  description: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!isOpen);

  const update = (newValue: string) => {
    toggle();
    props.onChange(newValue);
  };

  const selectedOption = useMemo(() => {
    const option = props.options.find((x) => x.value === props.value);
    return option;
  }, [props.value, props.options.length]);

  return (
    <div
      onClick={toggle}
      className={clsx('dropdown', {
        'dropdown--active': isOpen,
      })}
    >
      <div className="dropdown__container">
        <div className="dropdown__container__value">
          {selectedOption?.description ?? '-'}
        </div>

        {/* @ts-ignore */}
        <DropdownIcon className="dropdown__container__status" />
      </div>

      {isOpen && (
        <div className="dropdown__options">
          {props.options.map((option) => {
            return (
              <div
                key={option.value}
                className={clsx('dropdown__options__item', {
                  'dropdown__options__item--active':
                    props.value === option.value,
                })}
                onClick={() => update(option.value)}
              >
                {option.description}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
