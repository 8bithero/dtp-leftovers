import { STraitTypes } from '@/common/types';

export function useFilter() {
  const classList = {
    background: {
      background: 'bg-vivid-sky-blue',
      hover: 'hover:bg-vivid-sky-blue',
      underline: 'decoration-vivid-sky-blue',
      checkbox: 'text-vivid-sky-blue focus:ring-vivid-sky-blue',
    },

    fur: {
      background: 'bg-ultramarine-blue',
      hover: 'hover:bg-ultramarine-blue',
      underline: 'decoration-ultramarine-blue',
      checkbox: 'text-ultramarine-blue focus:ring-ultramarine-blue',
    },

    body: {
      background: 'bg-electric-violet',
      hover: 'hover:bg-electric-violet',
      underline: 'decoration-electric-violet',
      checkbox: 'text-electric-violet focus:ring-electric-violet',
    },

    head: {
      background: 'bg-radical-red',
      hover: 'hover:bg-radical-red',
      underline: 'decoration-radical-red',
      checkbox: 'text-radical-red focus:ring-radical-red',
    },

    glasses: {
      background: 'bg-dark-orange',
      hover: 'hover:bg-dark-orange',
      underline: 'decoration-dark-orange',
      checkbox: 'text-dark-orange focus:ring-dark-orange',
    },

    mouth: {
      background: 'bg-bitter-lemon',
      hover: 'hover:bg-bitter-lemon',
      underline: 'decoration-bitter-lemon',
      checkbox: 'text-bitter-lemon focus:ring-bitter-lemon',
    },

    rarity: {
      background: 'bg-sea-green-crayola',
      hover: 'hover:bg-sea-green-crayola',
      underline: 'decoration-sea-green-crayola',
      checkbox: 'text-sea-green-crayola focus:ring-sea-green-crayola',
    },
  };

  const buttonBackgroundClasses = (filterName: STraitTypes): string =>
    classList[filterName].background;

  const buttonUnderlineClasses = (filterName: STraitTypes): string =>
    classList[filterName].underline;

  const buttonHoverClasses = (filterName: STraitTypes): string =>
    classList[filterName].hover;

  const checkBoxClasses = (filterName: STraitTypes): string =>
    classList[filterName].checkbox;

  return {
    buttonBackgroundClasses,
    buttonUnderlineClasses,
    buttonHoverClasses,
    checkBoxClasses,
  };
}
