import {
  IActiveFilter,
  INFTData2,
  ITraits,
  SRarityType,
  STraitTypes,
} from '@/common/types';
import { reactive, computed } from 'vue';

import { filters } from '@/common/filters';
import { filterer, transduce } from '@/common/transduce';

export function useTraitFilter() {
  /*
  ----------------------------------------
    Constants
  ---------------------------------------- */
  const state: any = reactive({
    mobileMenuOpen: false,
    all: filters,
    active: computed(() => getActiveFilters()),
    activeFiltersSize: computed(
      () => Object.values(state.active).flat().length
    ),
  });

  const traitsByRarity: { [K in SRarityType]: ITraits[] } = reactive({
    common: computed(() => getTraitsByAttribute('rarity', 'common')),
    uncommon: computed(() => getTraitsByAttribute('rarity', 'uncommon')),
    rare: computed(() => getTraitsByAttribute('rarity', 'rare')),
    superRare: computed(() => getTraitsByAttribute('rarity', 'superRare')),
    mythic: computed(() => getTraitsByAttribute('rarity', 'mythic')),
  });

  /*
  ----------------------------------------
    NFT Filter
  ---------------------------------------- */
  const run = (NFTS: INFTData2[]) =>
    transduce(
      filterer((panda: INFTData2) => includer('background', panda)),
      filterer((panda: INFTData2) => includer('fur', panda)),
      filterer((panda: INFTData2) => includer('body', panda)),
      filterer((panda: INFTData2) => includer('head', panda)),
      filterer((panda: INFTData2) => includer('glasses', panda)),
      filterer((panda: INFTData2) => includer('mouth', panda)),
      filterer((panda: INFTData2) => rarityChecker(panda))
    )(NFTS);

  const includer = (
    traitType: Exclude<STraitTypes, 'rarity'>,
    nft: INFTData2
  ) => {
    const list = state.active[traitType];

    const listValues = list.map((x: { value: string }) => x.value);
    return listValues.length === 0 ? true : listValues.includes(nft[traitType]);
  };

  const rarityChecker = (nft: INFTData2) => {
    type validTraitTypes = Exclude<STraitTypes, 'rarity'>;

    const list = state.active['rarity'];

    return list.length === 0
      ? true
      : list.some(({ value }: { value: SRarityType }) =>
          traitsByRarity[value].some(
            (trait: ITraits) =>
              trait.value === nft[trait.type as validTraitTypes]
          )
        );
  };

  /*
  ----------------------------------------
    Traits Filter
  ---------------------------------------- */
  const getTraitsByAttribute = (
    attr: 'rarity' | 'checked',
    value: string | boolean
  ) =>
    state.all.flatMap(({ options }: { options: ITraits[] }) =>
      options.filter((o: ITraits) => o[attr] === value)
    );

  const getActiveFilters = (): IActiveFilter =>
    state.all.reduce(
      (
        acc: IActiveFilter,
        { id, options }: { id: STraitTypes; options: ITraits[] }
      ) =>
        Object.assign(acc, { [id]: options.filter((o: ITraits) => o.checked) }),
      {}
    );

  /*
  ----------------------------------------
    Misc
  ---------------------------------------- */
  const toggleMobileFilterMenu = (): void => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
  };

  return {
    run,
    toggleMobileFilterMenu,
    state,
    traitsByRarity,
  };
}
