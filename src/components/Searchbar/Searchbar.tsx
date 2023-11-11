import React, { useCallback } from 'react';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import debounce from 'lodash/debounce';
import './Searchbar.styles.scss';

interface SearchbarProps {
  onChangeDebounced: (value: string) => void;
}

const Searchbar = (props: SearchbarProps) => {
  const handleChangeDebounced = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      return props.onChangeDebounced(e.target.value);
    }, 1000),
    [props.onChangeDebounced]
  );

  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        placeholder="Search for GIFs and Stickers"
        onChange={handleChangeDebounced}
      />

      <div className="searchbar__icon">
        <SearchIcon />
      </div>
    </div>
  );
};

export default Searchbar;
