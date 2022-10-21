<template>
  <div class="panda">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <FiltersMobile
          v-model:activeFilterValuesByTrait="state.activeFilterValuesByTrait"
          :filters="state.filters"
          :toggle-mobile-filters-open="toggleMobileFiltersOpen"
        />
      </TransitionRoot>

      <main class="overflow-x-hidden">
        <section id="sect" aria-labelledby="heading" class="area">
          <div
            class="mx-auto flex max-w-7xl justify-center px-4 pt-0 sm:px-6 lg:px-8"
          >
            <ul class="circles">
              <li v-for="x in 10" :key="x" />
            </ul>
            <div class="mt-10 w-full max-w-md text-center">
              <h2
                class="font-splatter-kings text-7xl tracking-tight text-mine-shaft sm:text-8xl"
              >
                Trash Panda
                <div class="relative">
                  <img
                    src="~@/assets/images/goldstar.png"
                    loading="lazy"
                    alt=""
                    class="absolute -right-1 -bottom-10 max-w-[50px] sm:-right-10"
                  />
                  <img
                    src="~@/assets/images/goldstar.png"
                    loading="lazy"
                    alt=""
                    class="absolute -top-32 -left-8 max-w-[50px] sm:-left-24"
                  />
                  <p class="font-splatter-kings mt-5 text-4xl text-gray-400">
                    Leftovers
                  </p>
                </div>
              </h2>
              <HangingTag :nft-count="nfts.length" class="-mx-4 mt-10" />
            </div>
          </div>
        </section>

        <!-- Filters -->
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" class="sr-only">Filters</h2>
          <div class="mb-6 hidden md:block">
            <FiltersDesktop
              v-model:activeFilterValuesByTrait="
                state.activeFilterValuesByTrait
              "
              v-model:filters="state.filters"
            />
          </div>
          <div class="my-6 flex justify-center md:hidden">
            <div class="relative w-fit">
              <button
                type="button"
                class="cursor-big-pointer font-space-grotesk group inline-flex items-center justify-between border-2 border-mine-shaft bg-linen p-2 text-base font-medium !shadow-[4px_4px_0] !shadow-mine-shaft outline-none hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-[2px_2px_0] active:translate-x-[4px] active:translate-y-[4px] active:!shadow-[0px_0px_0]"
                @click="toggleMobileFiltersOpen"
              >
                <span class="sr-only">Load More Pandas</span>
                Filter Traits
                <span
                  class="ml-2 inline-flex items-center rounded bg-mine-shaft px-2 py-0.5 text-xs font-medium text-sugar-milk"
                >
                  {{ state.activeFilters.length }}
                </span>
              </button>
            </div>
          </div>
          <FiltersActive :active-filters="state.activeFilters" />
        </section>

        <!-- Product grid -->
        <section
          aria-labelledby="products-heading"
          class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div
            aria-labelledby="stats"
            class="sm:overflow-visible lg:col-span-3"
          >
            <div class="flex justify-between">
              <div class="hidden sm:inline-block">
                <Transition name="bounce">
                  <ElevatorDownButton
                    v-if="!pop"
                    class="pop cursor-big-pointer inline-block"
                    @click="elevate($event)"
                  />
                </Transition>
              </div>
              <StatsCard
                class="w-full sm:w-2/3 lg:w-1/3"
                :nft-count="nfts.length"
                :filtered-nft-count="state.filteredNFTs.length"
              />
            </div>
          </div>
          <PandaList :nfts="state.filteredNFTs" />
        </section>
      </main>

      <!-- Elevator Up Button -->
      <Transition name="bounce">
        <button
          v-if="!pop"
          ref="elevatorRaccoon"
          class="elevator-raccoon cursor-big-pointer z-100 pop invisible fixed right-2 bottom-5 hidden max-w-[45px] sm:inline-block md:right-3 md:bottom-4 md:max-w-[65px] lg:right-8 lg:bottom-10"
          role="button"
          aria-label="scroll to top of the page"
          @click="elevate($event, true)"
        >
          <img
            src="~@/assets/images/elevator-raccoon-fill.png"
            alt=""
            class="max-w-[45px] md:max-w-[65px]"
          />
          <img
            src="~@/assets/images/elevator-raccoon-colour-fill.png"
            alt=""
            class="max-w-[45px] md:max-w-[65px]"
          />
        </button>
      </Transition>

      <footer aria-labelledby="footer-heading" class="overflow-x-hidden">
        <h2 id="footer-heading" ref="bottomFloorRef" class="sr-only">Footer</h2>
        <TheBottom />
        <div class="py-16 text-center">
          <p class="text-sm text-gray-500">Made with ❤️</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  reactive,
  watchEffect,
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import StatsCard from '@/components/StatsCard.vue';
import PandaList from '@/components/PandaList.vue';
import ElevatorDownButton from '@/components/ElevatorDownButton.vue';
import FiltersMobile from '@/components/filters/FiltersMobile.vue';
import FiltersActive from '@/components/filters/FiltersActive.vue';
import FiltersDesktop from '@/components/filters/FiltersDesktop.vue';
import HangingTag from '@/components/HangingTag.vue';
import TheBottom from '@/components/TheBottom.vue';

import { TransitionRoot } from '@headlessui/vue';
import confetti from 'canvas-confetti';
import Elevator from 'elevator.js';

import { INFTData2 } from '@/common/types';
import dtpData from '@/common/dtp-data-v4.json';
import {
  ETraitTypes,
  filterTraits,
  IFilterGroup,
  ITraits,
  STraitTypes,
} from '@/common/traits';
import { capitalized } from '@/common/formatters';
import { filterer, transduce } from '@/common/transduce';

const pop = ref(false);

const bottomFloorRef = ref(null);
const elevatorRaccoon = ref(null);
const positionY = ref(0.5);
const positionX = ref(0.5);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = (): void => {
  if (window.scrollY > 4000) {
    elevatorRaccoon.value.classList.remove('invisible');
  } else {
    elevatorRaccoon.value.classList.add('invisible');
  }
};

const elevate = (event, goingUp = false): void => {
  if (event) {
    const { x, y } = event.target.getBoundingClientRect();
    positionY.value = Math.abs(y / window.innerHeight) + 0.05;
    positionX.value = Math.abs(x / window.innerWidth) + 0.02;
  }

  pop.value = true;
  const targetElement = goingUp ? null : bottomFloorRef.value;

  const lift = new Elevator({
    targetElement: targetElement,
    mainAudio: require('@/assets/music/elevator.mp3'),
    endAudio: require('@/assets/music/ding.mp3'),
    duration: 4000,
  });

  fire();

  setTimeout(() => {
    lift.elevate();
    setTimeout(() => {
      pop.value = false;
    }, 2000);
  }, 200);
};

function pew(particleRatio: number, opts: any) {
  const defaults = { origin: { y: positionY.value, x: positionX.value } };

  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(200 * particleRatio),
    })
  );
}

const fire = () => {
  pew(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  pew(0.2, {
    spread: 60,
  });
  pew(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  pew(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  pew(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const traitsByType = (traitType: STraitTypes): ITraits[] =>
  filterTraits.filter((trait: ITraits) => trait.type === traitType);

const getTraitsByRarity = (rarity: string): ITraits[] =>
  filterTraits.filter((x: ITraits) => x.rarity === rarity);

const buildFilterGroup = (trait: ETraitTypes): IFilterGroup =>
  Object.assign(
    {},
    {
      id: trait,
      name: capitalized(trait),
      options: traitsByType(trait),
    }
  );

const buildFilterGroups = (): IFilterGroup[] =>
  Object.values(ETraitTypes).map((trait) => buildFilterGroup(trait));

const filterActiveFilterItems = (): ITraits[] =>
  state.filters.flatMap(({ options }: { options: ITraits[] }) =>
    options.filter((o: ITraits) => o.checked)
  );

const pluckActiveFilterValues = (type: string): string[] =>
  state.activeFilters.reduce(
    (list: string[], x: ITraits) =>
      x.type === type ? list.push(x.value) && list : list,
    []
  );

const getActiveFilterValuesByTrait = (): any =>
  state.activeFilters.reduce(
    (acc: any, f: any) =>
      Object.keys(acc).includes(f.type)
        ? acc
        : (acc[f.type] = pluckActiveFilterValues(f.type)) && acc,
    {}
  );

const traitsByRarity: any = reactive({
  common: computed(() => getTraitsByRarity('common')),
  uncommon: computed(() => getTraitsByRarity('uncommon')),
  rare: computed(() => getTraitsByRarity('rare')),
  superRare: computed(() => getTraitsByRarity('superRare')),
  mythic: computed(() => getTraitsByRarity('mythic')),
});

const includerV3 = (
  traitType: Exclude<STraitTypes, 'rarity'>,
  nft: INFTData2
) => {
  const list = state.activeFilterValuesByTrait[traitType] || [];
  return list.length === 0 ? true : list.includes(nft[traitType]);
};

const rarityChecker = (nft: INFTData2) => {
  type validTraitTypes = Exclude<STraitTypes, 'rarity'>;

  const list = state.activeFilterValuesByTrait['rarity'] || [];

  if (list.length === 0) {
    return true;
  }

  return list.some((rarity: validTraitTypes) =>
    traitsByRarity[rarity].some(
      (trait: ITraits) => trait.value === nft[trait.type as validTraitTypes]
    )
  );
};

const updateNFTs = () =>
  state.activeFilters.value.length === 0
    ? nfts.value
    : transduce(
        filterer((panda: INFTData2) => includerV3('background', panda)),
        filterer((panda: INFTData2) => includerV3('fur', panda)),
        filterer((panda: INFTData2) => includerV3('body', panda)),
        filterer((panda: INFTData2) => includerV3('head', panda)),
        filterer((panda: INFTData2) => includerV3('glasses', panda)),
        filterer((panda: INFTData2) => includerV3('mouth', panda)),
        filterer((panda: INFTData2) => rarityChecker(panda))
      )(nfts.value);

const nfts = ref<INFTData2[]>(dtpData);

const state: any = reactive({
  filteredNFTs: computed(() => updateNFTs()),
  filters: buildFilterGroups(),
  activeFilters: computed(() => filterActiveFilterItems()),
  activeFilterValuesByTrait: computed(() => getActiveFilterValuesByTrait()),
});

const getActiveFilter = () =>
  state.filters.flatMap((f: any) => f.options.filter((o: any) => o.checked));

const toggleMobileFiltersOpen = () =>
  (mobileFiltersOpen.value = !mobileFiltersOpen.value);

// const activeFilters = ref<any[]>([]);
const mobileFiltersOpen = ref(false);

watchEffect(() => {
  state.activeFilters.value = getActiveFilter();
});
</script>
<style lang="scss" scoped>
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

@keyframes pop {
  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.pop {
  display: inline-block;

  /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0); */

  animation-name: pop;
  animation-duration: 0.03s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}

.fade-out {
  animation: fadeOut ease 0.3s;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    display: inline-block;
  }

  100% {
    opacity: 0;
    display: none;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.03s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.elevator-raccoon {
  img:last-child {
    display: none;
  }

  &:hover {
    img:last-child {
      display: block;
    }

    img:first-child {
      display: none;
    }
  }
}
</style>
