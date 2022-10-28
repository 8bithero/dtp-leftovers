<template>
  <Popover class="relative mt-10">
    <div class="pointer-events-none absolute inset-0 z-30" aria-hidden="true" />
    <div class="relative z-20">
      <div
        class="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 sm:px-6 sm:py-4 md:space-x-10 lg:px-8"
      >
        <div class="flex w-full items-center md:justify-center">
          <PopoverGroup as="nav" class="flex w-full justify-evenly lg:w-3/4">
            <Popover
              v-for="(section, sectionIdx) in props.filters"
              v-slot="{ open }"
              :key="section.name"
              class="flex"
            >
              <PopoverButton
                class="cursor-big-pointer group inline-flex items-center justify-between border-2 border-mine-shaft p-2 text-base font-medium underline decoration-wavy underline-offset-4 !shadow-[4px_4px_0] !shadow-mine-shaft outline-none hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-[2px_2px_0] active:translate-x-[4px] active:translate-y-[4px] active:!shadow-[0px_0px_0]"
                :class="[
                  open
                    ? 'translate-x-[2px] translate-y-[2px] bg-linen !shadow-[2px_2px_0]'
                    : filterHelper.buttonBackgroundClasses(section.id),
                  hasActiveFilter(section.options)
                    ? [
                        filterHelper.buttonUnderlineClasses(section.id),
                        '!bg-linen',
                      ]
                    : 'decoration-transparent',
                ]"
              >
                <span class="font-space-grotesk">{{ section.name }}</span>

                <ChevronDownIcon
                  :class="[
                    open ? '-rotate-180' : 'rotate-0',
                    'ml-2 h-5 w-5 text-mine-shaft',
                  ]"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <PopoverPanel
                  class="pointer-events-none absolute inset-x-0 top-full z-10 hidden transform md:block"
                >
                  <div
                    class="flex w-full justify-center"
                    :class="[
                      hasMultipleRarities(section.options)
                        ? ''
                        : sectionIdx === 0
                        ? 'transform md:-translate-x-1/3 lg:-translate-x-1/4'
                        : 'transform md:translate-x-1/3 lg:translate-x-1/4',
                    ]"
                  >
                    <div
                      class="pointer-events-auto mx-auto mx-2 grid max-w-7xl gap-y-6 border-2 border-mine-shaft bg-white px-4 py-6 !shadow-[4px_4px_0] !shadow-mine-shaft sm:grid-cols-4 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-5 lg:px-8"
                    >
                      <div
                        v-for="(group, name) in groupOptions(section.options)"
                        :key="name"
                        class="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-50"
                        :class="[
                          hasMultipleRarities(section.options)
                            ? 'col-span-1'
                            : 'col-span-5',
                        ]"
                      >
                        <div class="flex md:h-full lg:flex-col">
                          <div
                            class="md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0"
                          >
                            <div>
                              <h3
                                class="font-tt-commons-bold mb-3 text-base text-gray-900"
                              >
                                {{
                                  section.name === 'Rarity'
                                    ? 'Rarity'
                                    : camelCaseToTitleCase(name)
                                }}
                              </h3>
                              <ul class="font-tt-commons-bold font-medium">
                                <li
                                  v-for="(option, optionIdx) in group"
                                  :key="option.value"
                                  :class="
                                    filterHelper.buttonHoverClasses(section.id)
                                  "
                                  class="group flex w-full pl-1 pr-1"
                                >
                                  <label
                                    class="cursor-big-pointer inline-flex w-full items-center py-2"
                                  >
                                    <input
                                      :id="`filter-${name}-${optionIdx}`"
                                      v-model="option.checked"
                                      :name="`${name}[]`"
                                      :value="option.value"
                                      type="checkbox"
                                      :class="
                                        filterHelper.checkBoxClasses(section.id)
                                      "
                                      class="cursor-big-pointer h-6 w-6 border-mine-shaft"
                                    />
                                    <span
                                      class="ml-3 h-full text-gray-700 group-hover:text-zinc-200"
                                    >
                                      {{ option.label }}
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
      </div>
    </div>
  </Popover>
</template>

<script lang="ts" setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { camelCaseToTitleCase, groupBy } from '@/common/formatters';
import { useFilter } from '@/composables/useFilter';
import { IFilter, ITraits } from '@/common/types';

const props = defineProps<{
  filters: IFilter[];
}>();

const filterHelper = useFilter();

const groupOptions = (options: ITraits[]) =>
  groupBy(options, (i) => i.rarity || 'unGrouped');

const hasMultipleRarities = (options: ITraits[]): boolean =>
  [...new Set(options.map((obj) => obj?.rarity))].length > 1;

const hasActiveFilter = (options: ITraits[]): boolean =>
  options.some((o) => o.checked);
</script>

<style scoped lang="scss"></style>
