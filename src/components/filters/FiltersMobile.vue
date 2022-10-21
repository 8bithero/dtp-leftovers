<template>
  <Dialog
    as="div"
    class="relative z-40 cursor-big md:hidden"
    @close="props.toggleMobileFiltersOpen"
  >
    <TransitionChild
      as="template"
      enter="transition-opacity ease-linear duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black bg-opacity-25" />
    </TransitionChild>

    <div class="fixed inset-0 z-40 flex">
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <DialogPanel
          class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-l-2 border-mine-shaft bg-white py-4 pb-12 shadow-xl"
        >
          <div class="flex items-center justify-between px-4">
            <h2 class="font-space-grotesk text-lg font-medium text-mine-shaft">
              Filters
            </h2>
            <button
              type="button"
              class="!cursor-big-pointer -mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-mine-shaft"
              @click="props.toggleMobileFiltersOpen"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon
                class="!cursor-big-pointer h-6 w-6 stroke-2 text-mine-shaft"
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- Filters -->
          <form class="mt-4">
            <Disclosure
              v-for="section in props.filters"
              :key="section.name"
              v-slot="{ open }"
              as="div"
              class="border-t-2 border-mine-shaft bg-white last:border-b-2"
            >
              <h3
                class="flow-root bg-white px-2 py-3"
                :class="filterHelper.buttonBackgroundClasses(section.id)"
              >
                <DisclosureButton
                  class="cursor-big-pointer font-space-grotesk flex w-full items-center justify-between px-2 py-3 text-sm text-mine-shaft decoration-wavy underline-offset-8"
                  :class="[
                    hasActiveFilter(section.id) ? 'underline' : 'no-underline',
                  ]"
                >
                  <span class="font-medium text-mine-shaft">
                    {{ section.name }}
                  </span>
                  <span class="!cursor-big-pointer ml-6 flex items-center">
                    <ChevronDownIcon
                      :class="[
                        open ? '-rotate-180' : 'rotate-0',
                        '!cursor-big-pointer h-5 w-5 transform stroke-2 text-mine-shaft',
                      ]"
                      aria-hidden="true"
                    />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel class="">
                <div class="">
                  <div
                    v-for="(option, optionIdx) in section.options"
                    :key="option.value"
                    class="flex items-center py-3 px-3"
                  >
                    <input
                      :id="`filter-mobile-${section.id}-${optionIdx}`"
                      v-model="option.checked"
                      :name="`${section.id}[]`"
                      :value="option.value"
                      type="checkbox"
                      class="cursor-big-pointer h-4 w-4 border-gray-300"
                      :class="filterHelper.checkBoxClasses(section.id)"
                    />
                    <label
                      :for="`filter-mobile-${section.id}-${optionIdx}`"
                      class="cursor-big-pointer ml-3 w-full text-sm"
                      >{{ option.label }}</label
                    >
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </form>
        </DialogPanel>
      </TransitionChild>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  TransitionChild,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useFilter } from '@/composables/useFilter';

const props = defineProps([
  'filters',
  'activeFilterValuesByTrait',
  'toggleMobileFiltersOpen',
]);

const filterHelper = useFilter();

const hasActiveFilter = (id: number): boolean =>
  !!(props.activeFilterValuesByTrait && props.activeFilterValuesByTrait[id]);
</script>
