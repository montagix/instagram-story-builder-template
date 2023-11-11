import './FilterPicker.styles.scss';
import * as RadixPopover from '@radix-ui/react-popover';
import IconButton from '../IconButton';
import { FilterNode } from '@montagix/engine';

export interface FilterOption {
  icon: React.ReactElement;
  description: string;
  filter: () => FilterNode | null;
}

interface FilterPickerProps {
  filters: FilterOption[];
  onFilterSet: (filter: FilterNode | null) => void;
  icon: React.ReactElement;
}

const FilterPicker = (props: FilterPickerProps) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger asChild>
      <div className="filter-picker__trigger">
        <IconButton icon={props.icon} />
      </div>
    </RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content className="filter-picker__content" sideOffset={5}>
        <div className="filter-picker__container">
          <div className="filter-picker__container__grid">
            {props.filters.map((option) => (
              <button
                key={`filter-${option.description}`}
                className="filter-picker__container__grid__item"
                onClick={() => props.onFilterSet(option.filter())}
              >
                {option.icon}
                {option.description}
              </button>
            ))}
          </div>
        </div>

        <RadixPopover.Arrow className="filter-picker__arrow" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);

export default FilterPicker;
