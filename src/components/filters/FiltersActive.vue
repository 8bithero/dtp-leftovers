<template>
  <!-- <div class="bg-gray-100 zig-zag"> -->
  <div class="zig-zag">
    <div
      class="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:flex sm:items-center sm:px-6 md:pb-0.5 lg:px-8"
    >
      <h3
        class="hidden text-sm font-medium leading-10 text-gray-500 md:inline-block"
      >
        Filters
        <span class="sr-only">, active</span>
      </h3>

      <div
        aria-hidden="true"
        class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
      />

      <div class="mt-2 sm:mt-0 sm:ml-4">
        <div class="-m-1 flex flex-wrap items-center">
          <span
            v-for="activeFilter in props.activeFilters"
            :key="activeFilter.value"
            class="m-1 inline-flex items-center rounded-full border-2 border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
            :class="[borderColourSelector(activeFilter.type)]"
          >
            <span>{{ activeFilter.label }}</span>
            <button
              type="button"
              class="cursor-big-pointer ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
              @click="activeFilter.checked = false"
            >
              <span class="sr-only"
                >Remove filter for {{ activeFilter.label }}</span
              >
              <svg
                class="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['activeFilters']);

const borderColourSelector = (traitType: string) => {
  let colours = {
    background: 'border-vivid-sky-blue',
    fur: 'border-ultramarine-blue',
    body: 'border-electric-violet',
    head: 'border-radical-red',
    glasses: 'border-dark-orange',
    mouth: 'border-bitter-lemon',
    rarity: 'border-sea-green-crayola',
  } as any;

  return colours[traitType];
};
</script>

<style>
.zig-zag {
  background: #a3e635;
  position: relative;
  margin: 0;
}

.zig-zag:after {
  background: linear-gradient(-45deg, transparent 20px, #a3e635 0),
    linear-gradient(45deg, transparent 20px, #a3e635 0);
  background-position: left bottom;
  background-size: 20px 20px;
  content: '';
  display: block;
  height: 20px;
  width: 100%;
  position: absolute;
}

.zig-zag:before {
  background: linear-gradient(45deg, transparent 20px, #f9eddd 0),
    linear-gradient(-45deg, transparent 20px, #f9eddd 0);
  background-position: left bottom;
  background-size: 20px 20px;
  content: '';
  display: block;
  height: 20px;
  width: 100%;
  position: absolute;
}
</style>
