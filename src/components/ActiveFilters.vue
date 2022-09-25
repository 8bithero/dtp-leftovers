<template>
  <!-- <div class="bg-gray-100"> -->
  <div class="bg-gray-100 dark:bg-slate-700">
    <div class="mx-auto max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
      <h3 class="text-sm font-medium text-gray-500">
        Filters
        <span class="sr-only">, active</span>
      </h3>

      <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

      <div class="mt-2 sm:mt-0 sm:ml-4">
        <div class="-m-1 flex flex-wrap items-center">
          <span v-for="activeFilter in activeFilters" :key="activeFilter.value" class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
            <span>{{ activeFilter.label }}</span>
            <button
              @click="removeActiveFilter(activeFilter)"
              type="button"
              class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
            >
              <span class="sr-only">Remove filter for {{ activeFilter.label }}</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ActiveFilters',
  props: {
    activeFilters: Array
  },

  setup() {
    const removeActiveFilter = (activeFilter: any): void => {
      activeFilter.checked = !activeFilter.checked
    }

    return { removeActiveFilter }
  }
});
</script>
