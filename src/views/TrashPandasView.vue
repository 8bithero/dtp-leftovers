<template>
  <div class="bg-white dark:bg-slate-900">
    <!-- Mobile filter dialog -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 sm:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
            <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <Disclosure as="div" v-for="section in filters" :key="section.name" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span class="font-medium text-gray-900">{{ section.name }}</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                        <input
                          :id="`filter-mobile-${section.id}-${optionIdx}`"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          type="checkbox"
                          v-model="option.checked"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-stone-200 splatter-kings">DTP Leftovers</h1>
      <!-- <p class="mt-4 max-w-xl text-sm text-gray-700">Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and organization with these sale items before we run out.</p> -->
    </div>

    <!-- Filters -->
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">Filters</h2>

      <TheFilters
        v-model:activeFilterValuesByTrait="activeFilterValuesByTrait"
        v-model:filters="filters"
      />

      <ActiveFilters
        v-model:activeFilters="activeFilters"
      />
    </section>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Product grid -->
      <div class="lg:col-span-3">
        <StatsBar :nft-count="nftCount" :filtered-nft-count="filteredNFTCount" />
      </div>
      <div class="lg:col-span-3">
        <TrashPandas :nfts="filteredNFTs" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from 'vue';
import TrashPandas from '@/components/TrashPandas.vue'; // @ is an alias to /src
import StatsBar from '@/components/StatsBar.vue';
import TheFilters from '@/components/TheFilters.vue';
import ActiveFilters from '@/components/ActiveFilters.vue';

import {
  INFTData2,
} from "@/common/types";
import dtpData from "@/common/dtp-data-v3.json";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ERarityType, ETraitTypes, filterTraits, IFilterGroup, ITraits, STraitTypes } from '@/common/traits';
import { capitalized } from '@/common/formatters';
import { transduce, filterer } from '@/common/transduce';

export default defineComponent({
  name: 'TrashPandasView',
  components: {
    TrashPandas,
    StatsBar,
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
    XMarkIcon,
    ChevronDownIcon,
    TheFilters,
    ActiveFilters,
  },
  setup() {
    const open = ref(false)
    const nfts = ref<INFTData2[]>(dtpData);

    const traitsByType = (traitType: STraitTypes): ITraits[] =>
      filterTraits.filter((trait: ITraits) => trait.type === traitType)
    
    const getTraitsByRarity = (rarity: string): ITraits[] => 
      filterTraits.filter((x: ITraits) => x.rarity === rarity);

    const buildFilterGroup = (trait: ETraitTypes): IFilterGroup =>
      Object.assign({}, {
        id: trait,
        name: capitalized(trait),
        options: traitsByType(trait)
      })

    const buildFilterGroups = (): IFilterGroup[] =>
      Object.values(ETraitTypes).map((trait) => buildFilterGroup(trait))

    const filterActiveFilterItems = (): ITraits[] =>
      state.filters.flatMap(({ options }: { options: ITraits[] }) =>
        options.filter((o: ITraits) => o.checked)
      )

    const pluckActiveFilterValues = (type: string): string[] =>
      state.activeFilters.reduce((list: string[], x: ITraits) => (
        x.type === type
          ? (list.push(x.value) && list)
          : list
      ), [])

    const getActiveFilterValuesByTrait = (): any =>
      state.activeFilters.reduce((acc: any, f: any) => (
        Object.keys(acc).includes(f.type)
          ? acc
          : (acc[f.type] = pluckActiveFilterValues(f.type)) && acc
      ), {})

    
    const stats: any = reactive({
      nftCount: computed(() => nfts.value.length),
      filteredNFTCount: computed(() => state.filteredNFTs.length),
    })

    const state: any = reactive({
      filteredNFTs: computed(() => updateNFTs()),
      filters: buildFilterGroups(),
      activeFilters: computed(() => filterActiveFilterItems()),
      activeFilterValuesByTrait: computed(() => getActiveFilterValuesByTrait())
    })

    const traitsByRarity: any = reactive({
      common: computed(() => getTraitsByRarity('common')),
      uncommon: computed(() => getTraitsByRarity('uncommon')),
      rare: computed(() => getTraitsByRarity('rare')),
      superRare: computed(() => getTraitsByRarity('superRare')),
      mythic: computed(() => getTraitsByRarity('mythic')),
    })

    const includerV3 = (traitType:Exclude<STraitTypes, 'rarity'>, nft: INFTData2) => {
      const list = state.activeFilterValuesByTrait[traitType] || []
      return list.length === 0 ? true : list.includes(nft[traitType])
    }

    const rarityChecker = (nft: INFTData2) => {
      type validTraitTypes = Exclude<STraitTypes, 'rarity'>;

      const list = state.activeFilterValuesByTrait['rarity'] || []

      if(list.length === 0) {
        return true
      }

      return list.some((rarity: validTraitTypes) =>
       traitsByRarity[rarity].some((trait: ITraits) => trait.value === nft[(trait.type as validTraitTypes)])
      )
    }

    const updateNFTs = () => (
      transduce(
        filterer((panda: INFTData2) => includerV3('background', panda)),
        filterer((panda: INFTData2) => includerV3('fur', panda)),
        filterer((panda: INFTData2) => includerV3('body', panda)),
        filterer((panda: INFTData2) => includerV3('head', panda)),
        filterer((panda: INFTData2) => includerV3('glasses', panda)),
        filterer((panda: INFTData2) => includerV3('mouth', panda)),
        filterer((panda: INFTData2) => rarityChecker(panda)),
      )(nfts.value)
    )

    return {
      nfts,
      open,
      ...toRefs(state),
      ...toRefs(stats),
    }
  }


});
</script>
<style scoped>
  .splatter-kings {
    font-family: "Splatter Kings", Helvetica, Arial !important;
  }
</style>