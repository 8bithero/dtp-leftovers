<template>
  <div class="currently-playing">
    <article class="card horizontal">
      <div class="card-inner">
        <span class="card-pin simple"></span>
        <div class="card-content grid grid-cols-2 gap-2 px-5">
          <div class="border-r-2">
            <div class="card-meta">
              <span class="font-medium">Leftovers</span>
            </div>
            <h2 class="card-title">
              <span class="font-semibold text-mine-shaft">
                {{ currentNFTCount.toLocaleString() }}
              </span>
            </h2>
          </div>
          <div>
            <div class="card-meta">
              <span class="font-medium">Mint Probability</span>
            </div>
            <h2 class="card-title">
              <span class="font-semibold text-mine-shaft">
                {{ mintPercentage }}
              </span>
            </h2>
          </div>
        </div>
        <span class="card-pin simple"></span>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

const props = defineProps({
  nftCount: { type: Number, default: 0 },
  filteredNftCount: { type: Number, default: 0 },
});

const totalNFTCount = ref<number>(props.nftCount);
const currentNFTCount = ref<number>(props.filteredNftCount);

watchEffect(() => {
  totalNFTCount.value = props.nftCount;
  currentNFTCount.value = props.filteredNftCount;
});

const mintPercentage = computed(() => {
  const value = currentNFTCount.value / totalNFTCount.value;
  return value.toLocaleString(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
  });
});
</script>

<style scoped lang="scss">
@import 'tailwindcss/utilities';

$c-gray-500: #5f5f5f;
$c-gray-900: #1d1d1d;
$c-yellow-300: #f8e0b1;
$rotation: -3deg;

.currently-playing {
  padding: 1rem 0.5rem;
}

.card {
  width: 200px;
  transform: rotate($rotation);
  transition: 0.15s ease-out;
  // border: 2px solid #242424;

  &.horizontal {
    width: 100%;
    transform: rotate(3deg);

    .card-inner {
      flex-direction: row;
      align-items: center;

      &:after {
        background-color: theme('colors.sea-green-crayola');
      }
    }

    .card-title {
      font-weight: 500;
      color: $c-gray-500;
      font-size: 1.125em;
      margin-top: 0.125em;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}

.card-inner {
  display: flex;
  flex-direction: column;
  border: 2px solid $c-gray-900;
  border-radius: 20px;
  padding: 0.5rem;
  background-color: #fff;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 95%;
    height: 100%;
    bottom: -9px;
    left: calc(50% - 47.5%);
    border-radius: 20px;
    border: 2px solid $c-gray-900;
    background-color: $c-yellow-300;
  }
}

.card-pin {
  width: 12px;
  height: 12px;
  background-color: $c-gray-900;
  position: absolute;
  top: 20px;
  left: calc(50% - 6px);
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px $c-gray-900;
  transform: rotate(3deg);
  z-index: 1;

  &:before,
  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    position: absolute;
    transition: 0.15s ease-out;
  }

  &:before {
    width: 12px;
    height: 12px;
    background-color: $c-gray-900;
    border-radius: 50%;
    left: calc(50% - 6px);
    top: -44px;
  }

  &:after {
    width: 6px;
    background-color: #fff;
    border: 1px solid;
    border-radius: 99em;
    height: 50px;
    left: calc(50% - 3px);
    bottom: 3px;
  }

  &.simple {
    box-shadow: none;

    &:nth-of-type(odd) {
      left: 10px;
      top: 10px;
      transform: rotate(-45deg);
    }

    &:nth-of-type(even) {
      left: calc(100% - 20px);
      top: calc(100% - 20px);
      transform: rotate(120deg);
    }
  }
}

.card-meta,
.card-title {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.card-meta {
  padding-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
}
</style>
