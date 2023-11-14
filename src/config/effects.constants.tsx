import React from 'react';
import { FilterOption } from '../components/FilterPicker/FilterPicker';
import TransitionNoneIcon from '../assets/images/transition-none-icon.svg';
import AquaGlitterEffectIcon from '../assets/images/aqua-glitter-effect.webp';
import {
  AquaGlitterEffect,
  BloomEffect,
  ChromaticPulseEffect,
  GlitchEffect,
  GlitterEffect,
  PartyLightsEffect,
  PixelateEffect,
  RippleEffect,
  TriangleWindowsEffect,
} from '@montagix/engine';
import GlitchEffectIcon from '../assets/images/glitch-effect.webp';
import GlitterEffectIcon from '../assets/images/glitter-effect.webp';
import ChromaticPulseEffectIcon from '../assets/images/chromatic-pulse-effect.webp';
import PixelateEffectIcon from '../assets/images/pixelate-effect.webp';
import TriangeWindowsEffectIcon from '../assets/images/triange-windows-effect.webp';
import BloomEffectIcon from '../assets/images/bloom-effect.webp';
import RippleEffectIcon from '../assets/images/ripple-effect.webp';
import PartyLightsEffectIcon from '../assets/images/party-lights-effect.webp';

export const DEFAULT_EFFECTS: FilterOption[] = [
  {
    icon: <TransitionNoneIcon />,
    description: 'None',
    filter: () => null,
  },
  {
    icon: <img src={AquaGlitterEffectIcon} />,
    description: 'Aqua Glitter',
    filter: () => new AquaGlitterEffect(),
  },
  {
    icon: <img src={GlitchEffectIcon} />,
    description: 'Glitch',
    filter: () => new GlitchEffect(),
  },
  {
    icon: <img src={GlitterEffectIcon} />,
    description: 'Glitter',
    filter: () => new GlitterEffect(),
  },
  {
    icon: <img src={ChromaticPulseEffectIcon} />,
    description: 'Pulse',
    filter: () => new ChromaticPulseEffect(),
  },
  {
    icon: <img src={PixelateEffectIcon} />,
    description: 'Pixelate',
    filter: () => new PixelateEffect(),
  },
  {
    icon: <img src={TriangeWindowsEffectIcon} />,
    description: 'Triangles',
    filter: () => new TriangleWindowsEffect(),
  },
  {
    icon: <img src={BloomEffectIcon} />,
    description: 'Bloom',
    filter: () => new BloomEffect(),
  },
  {
    icon: <img src={RippleEffectIcon} />,
    description: 'Ripple',
    filter: () => new RippleEffect(),
  },
  {
    icon: <img src={PartyLightsEffectIcon} />,
    description: 'Party Lights',
    filter: () => new PartyLightsEffect(),
  },
];
