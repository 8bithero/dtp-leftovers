import { reactive } from 'vue';
import { IFilter } from './types';

import {
  backgroundTraits,
  bodyTraits,
  furTraits,
  headTraits,
  glassesTraits,
  mouthTraits,
  rarityTraits,
} from './traitsData';

export const filters: IFilter[] = reactive([
  {
    id: 'background',
    name: 'Background',
    options: backgroundTraits,
  },
  {
    id: 'fur',
    name: 'Fur',
    options: furTraits,
  },
  {
    id: 'head',
    name: 'Head',
    options: headTraits,
  },
  {
    id: 'body',
    name: 'Body',
    options: bodyTraits,
  },
  {
    id: 'glasses',
    name: 'Glasses',
    options: glassesTraits,
  },
  {
    id: 'mouth',
    name: 'Mouth',
    options: mouthTraits,
  },
  {
    id: 'rarity',
    name: 'Rarity',
    options: rarityTraits,
  },
]);
