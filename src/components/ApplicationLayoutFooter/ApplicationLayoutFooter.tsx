import React from 'react';
import FileButton from '../FileButton';
import UploadImageIcon from '../../assets/images/upload-image-icon.svg';
import IconButton from '../IconButton';
import AddTextIcon from '../../assets/images/add-text-icon.svg';
import GiphyPopoverContainer from '../../containers/GiphyPopoverContainer';
import GifIcon from '../../assets/icons/GifIcon.svg';
import FilterPicker from '../FilterPicker';
import FiltersIcon from '../../assets/images/filters-icon.svg';
import EffectsIcon from '../../assets/images/effects-icon.svg';
import BackgroundColorButton from '../BackgroundColorButton';
import { FilterNode } from '@montagix/engine';
import { DEFAULT_FILTERS } from '../../config/filters.constants';
import { DEFAULT_EFFECTS } from '../../config/effects.constants';
import './ApplicationLayoutFooter.styles.scss';

interface ApplicationLayoutFooterProps {
  backgroundColor: string;
  onAddText: () => void;
  onAddGif: (src: string) => Promise<void>;
  onChangeBackgroundColor: (color: string) => void;
  onAddFilter: (filter: FilterNode | null) => void;
  onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationLayoutFooter = (props: ApplicationLayoutFooterProps) => {
  return (
    <div className="app-layout-footer">
      <FileButton icon={<UploadImageIcon />} onChange={props.onUploadFile} />
      <IconButton icon={<AddTextIcon />} onClick={props.onAddText} />

      <GiphyPopoverContainer
        trigger={
          <div>
            <IconButton icon={<GifIcon />} />
          </div>
        }
        onAddGif={props.onAddGif}
      />

      <div className="app-layout-footer__stage-options">
        <FilterPicker
          filters={DEFAULT_FILTERS}
          onFilterSet={props.onAddFilter}
          icon={<FiltersIcon />}
        />

        <FilterPicker
          filters={DEFAULT_EFFECTS}
          onFilterSet={props.onAddFilter}
          icon={<EffectsIcon />}
        />

        <BackgroundColorButton
          value={props.backgroundColor}
          onChange={props.onChangeBackgroundColor}
        />
      </div>
    </div>
  );
};

export default ApplicationLayoutFooter;
