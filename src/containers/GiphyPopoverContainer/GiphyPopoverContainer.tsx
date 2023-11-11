import React, { useCallback, useRef, useState } from 'react';
import { Grid, Loader } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Popover from '../../components/Popover';
import './GiphyPopoverContainer.styles.scss';
import Searchbar from '../../components/Searchbar';
import { useApplicationContext } from '../../contexts/ApplicationContext';

interface GiphyPopoverContainerProps {
  trigger: React.ReactElement;
  onAddGif: (src: string) => Promise<void>;
}

const GiphyPopoverContainer = (props: GiphyPopoverContainerProps) => {
  const { giphyKey } = useApplicationContext();
  const [searchKey, setSearchKey] = useState('');
  const gfRef = useRef(new GiphyFetch(giphyKey ?? ''));

  async function handleFetchGifs(offset: number) {
    const gf = gfRef.current;
    const options = { offset, limit: 10 };

    if (searchKey.length > 0) {
      return gf.search(searchKey, options);
    }

    return gf.trending(options);
  }

  const handleSearch = useCallback((value: string) => {
    setSearchKey(value);
  }, []);

  return (
    <Popover trigger={props.trigger}>
      <div className="giphy-popover__container">
        <Searchbar onChangeDebounced={handleSearch} />

        <div className="giphy-popover__content">
          <Grid
            key={searchKey}
            width={250}
            columns={2}
            gutter={4}
            noLink
            user={{}}
            hideAttribution
            loader={Loader}
            fetchGifs={handleFetchGifs}
            onGifClick={(gif, event) => {
              return props.onAddGif(gif.images.original.url);
            }}
          />
        </div>
      </div>
    </Popover>
  );
};

export default GiphyPopoverContainer;
