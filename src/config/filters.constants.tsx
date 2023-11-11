import { FilterOption } from '../components/FilterPicker/FilterPicker';
import TransitionNoneIcon from '../assets/images/transition-none-icon.svg';
import AzureWaveFilterIcon from '../assets/images/azure-wave-filter.webp';

import {
  AzureWaveFilter,
  BlushBloomFilter,
  CandyPopFilter,
  DesertSunFilter,
  DuskCharmFilter,
  ForestHushFilter,
  GoldenGlowFilter,
  NeonPulseFilter,
  PeachyKeenFilter,
  PolarBreezFilter,
  SilverMistFilter,
  UrbanEdgeFilter,
  VelvetTouchFilter,
} from '@montagix/engine';

import GlodenGlowFilterIcon from '../assets/images/golden-glow-filter.webp';
import SilverMistFilterIcon from '../assets/images/silver-mist-filter.webp';
import ForestHushFilterIcon from '../assets/images/forest-hush-filter.webp';
import CandyPopFilterIcon from '../assets/images/candy-pop-filter.webp';
import DuskCharmFilterIcon from '../assets/images/dusk-charm-filter.webp';
import NeonPulseFilterIcon from '../assets/images/neon-pulse-filter.webp';
import UrbanEdgeFilterIcon from '../assets/images/urban-edge-filter.webp';
import VelvetTouchFilterIcon from '../assets/images/velvet-touch-filter.webp';
import PeachyKeenFilterIcon from '../assets/images/peachy-keen-filter.webp';
import PolarBreezeFilterIcon from '../assets/images/polar-breeze-filter.webp';
import DesertSunFilterIcon from '../assets/images/desert-sun-filter.webp';
import BlushBloomFilterIcon from '../assets/images/blush-bloom-filter.webp';

export const DEFAULT_FILTERS: FilterOption[] = [
  {
    icon: <TransitionNoneIcon />,
    description: 'None',
    filter: () => null,
  },
  {
    icon: <img src={AzureWaveFilterIcon} />,
    description: 'Azure Wave',
    filter: () => new AzureWaveFilter(),
  },
  {
    icon: <img src={GlodenGlowFilterIcon} />,
    description: 'Golden Glow',
    filter: () => new GoldenGlowFilter(),
  },
  {
    icon: <img src={SilverMistFilterIcon} />,
    description: 'Silver Mist',
    filter: () => new SilverMistFilter(),
  },
  {
    icon: <img src={ForestHushFilterIcon} />,
    description: 'Foresh Hush',
    filter: () => new ForestHushFilter(),
  },
  {
    icon: <img src={CandyPopFilterIcon} />,
    description: 'Candy Pop',
    filter: () => new CandyPopFilter(),
  },
  {
    icon: <img src={DuskCharmFilterIcon} />,
    description: 'Dusk Charm',
    filter: () => new DuskCharmFilter(),
  },
  {
    icon: <img src={NeonPulseFilterIcon} />,
    description: 'Neon Pulse',
    filter: () => new NeonPulseFilter(),
  },
  {
    icon: <img src={UrbanEdgeFilterIcon} />,
    description: 'Urban Edge',
    filter: () => new UrbanEdgeFilter(),
  },
  {
    icon: <img src={VelvetTouchFilterIcon} />,
    description: 'Velvet Touch',
    filter: () => new VelvetTouchFilter(),
  },
  {
    icon: <img src={PeachyKeenFilterIcon} />,
    description: 'Peachy Keen',
    filter: () => new PeachyKeenFilter(),
  },
  {
    icon: <img src={PolarBreezeFilterIcon} />,
    description: 'Polar Breeze',
    filter: () => new PolarBreezFilter(),
  },
  {
    icon: <img src={DesertSunFilterIcon} />,
    description: 'Desert Sun',
    filter: () => new DesertSunFilter(),
  },
  {
    icon: <img src={BlushBloomFilterIcon} />,
    description: 'Blush Bloom',
    filter: () => new BlushBloomFilter(),
  },
];
