<template>
  <div class="panda">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="filter.state.mobileMenuOpen">
        <FiltersMobile
          :filters="filter.state.all"
          :toggle-mobile-filters-open="filter.toggleMobileFilterMenu"
        />
      </TransitionRoot>

      <main class="overflow-x-hidden">
        <section id="sect" aria-labelledby="heading" class="area">
          <div
            class="mx-auto flex max-w-7xl justify-center px-4 pt-0 sm:px-6 lg:px-8"
          >
            <BackgroundCircles />
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
              :filters="filter.state.all"
              :active-filters="filter.state.active"
            />
          </div>
          <div class="my-6 flex justify-center md:hidden">
            <div class="relative w-fit">
              <button
                type="button"
                class="cursor-big-pointer font-space-grotesk group inline-flex items-center justify-between border-2 border-mine-shaft bg-linen p-2 text-base font-medium !shadow-[4px_4px_0] !shadow-mine-shaft outline-none hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-[2px_2px_0] active:translate-x-[4px] active:translate-y-[4px] active:!shadow-[0px_0px_0]"
                @click="filter.toggleMobileFilterMenu"
              >
                <span class="sr-only">Load More Pandas</span>
                Filter Traits
                <span
                  class="ml-2 inline-flex items-center rounded bg-mine-shaft px-2 py-0.5 text-xs font-medium text-sugar-milk"
                >
                  {{ filter.state.activeFiltersSize }}
                </span>
              </button>
            </div>
          </div>
          <FiltersActive :active-filters="filter.state.active" />
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
                    v-if="!confetti.pop"
                    class="pop cursor-big-pointer inline-block"
                    @click="elevate($event)"
                  />
                </Transition>
              </div>
              <StatsCard
                class="w-full sm:w-2/3 lg:w-1/3"
                :nft-count="nfts.length"
                :filtered-nft-count="filteredNFTs.length"
              />
            </div>
          </div>
          <PandaList :nfts="filteredNFTs" />
        </section>
      </main>

      <!-- Elevator Up Button -->
      <Transition name="bounce">
        <button
          v-if="!confetti.pop"
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
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
import { INFTData2 } from '@/common/types';

import dtpData from '@/common/dtp-data-v4.json';
import Elevator from 'elevator.js';

// COMPONENTS
import BackgroundCircles from '@/components/BackgroundCircles.vue';
import ElevatorDownButton from '@/components/ElevatorDownButton.vue';
import FiltersActive from '@/components/filters/FiltersActive.vue';
import FiltersDesktop from '@/components/filters/FiltersDesktop.vue';
import FiltersMobile from '@/components/filters/FiltersMobile.vue';
import HangingTag from '@/components/HangingTag.vue';
import PandaList from '@/components/PandaList.vue';
import StatsCard from '@/components/StatsCard.vue';
import TheBottom from '@/components/TheBottom.vue';

// COMPOSABLES
import { usePandaData } from '@/composables/usePandaData';
import { useConfetti } from '@/composables/useConfetti';
import { useTraitFilter } from '@/composables/useTraitFilter';
// import { useMintAddressUpdater } from '@/composables/useMintAddressUpdater';

// REFs
const bottomFloorRef = ref<HTMLDivElement | null>(null);
const confetti = reactive(useConfetti());
const elevatorRaccoon = ref<HTMLDivElement | null>(null);
const filter = reactive(useTraitFilter());
const nfts = ref<INFTData2[]>([]);
const pandas = reactive(usePandaData());

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);

  // await setNFTData().then(async () => await useMintAddressUpdater(nfts.value));
  await setNFTData();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const setNFTData = async (): Promise<void> => {
  nfts.value = process.env.VUE_APP_USE_LOCALDATA
    ? (dtpData as INFTData2[])
    : await pandas.getAll();
};

const updateNFTs = () =>
  filter.state.activeFiltersSize === 0 ? nfts.value : filter.run(nfts.value);

const filteredNFTs = computed(() => updateNFTs());

const handleScroll = (): void => {
  if (!elevatorRaccoon.value) return;

  if (window.scrollY > 4000) {
    elevatorRaccoon.value.classList.remove('invisible');
  } else {
    elevatorRaccoon.value.classList.add('invisible');
  }
};

const elevate = (
  event: { target: { getBoundingClientRect: () => { x: number; y: number } } },
  goingUp = false
): void => {
  if (event) {
    const { x, y } = event.target.getBoundingClientRect();

    confetti.position.x = Math.abs(x / window.innerWidth) + 0.02;
    confetti.position.y = Math.abs(y / window.innerHeight) + 0.05;
  }

  confetti.pop = true;
  const targetElement = goingUp ? null : bottomFloorRef.value;

  const lift = new Elevator({
    targetElement: targetElement,
    mainAudio: require('@/assets/music/elevator.mp3'),
    endAudio: require('@/assets/music/ding.mp3'),
    duration: 4000,
  });

  confetti.fire();

  setTimeout(() => {
    lift.elevate();
    setTimeout(() => {
      confetti.pop = false;
    }, 2000);
  }, 200);
};
</script>
<style lang="scss" scoped>
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
