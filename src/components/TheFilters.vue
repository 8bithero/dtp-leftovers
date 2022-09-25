<template>
  <!-- <div class="border-b border-gray-200 bg-white dark:bg-slate-800 pb-4"> -->
  <div class="border-b border-gray-200 pb-4">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <!-- <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"> -->
          <MenuButton class="group inline-flex justify-center text-sm font-medium hover:text-sky-500 dark:hover:text-sky-400">
            Sort
            <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>

      <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden" @click="open = true">Filters</button>

      <div class="hidden sm:block">
        <div class="flow-root">
          <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
            <Popover v-for="(section) in filters" :key="section.name" class="relative inline-block px-4 text-left">
              <!-- <PopoverButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"> -->
              <PopoverButton class="group inline-flex justify-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 focus:outline-none">
                <span>{{ section.name }}</span>
                <span
                  v-if="activeFilterValuesByTrait?.[section.id]"
                  class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700"
                >
                  {{ activeFilterValuesByTrait?.[section.id].length }}
                </span>
                <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <PopoverPanel class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <form class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input
                        :id="`filter-${section.id}-${optionIdx}`"
                        :name="`${section.id}[]`"
                        :value="option.value"
                        type="checkbox"
                        v-model="option.checked"
                        @input="$emit('update:option.checked', $event.target.value)"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ option.label }}</label>
                    </div>
                  </form>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'

export default defineComponent({
  name: 'TheFilters',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
  },

  props: {
    activeFilterValuesByTrait: Object,
    filters: Array
  },

  setup() {
    const sortOptions = [
      { name: 'Most Popular', href: '#', current: true },
      { name: 'Best Rating', href: '#', current: false },
      { name: 'Newest', href: '#', current: false },
      { name: 'Price: Low to High', href: '#', current: false },
      { name: 'Price: High to Low', href: '#', current: false },
    ]

    return { sortOptions }
  }
});
</script>
