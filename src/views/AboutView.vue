<template>
  <div class="about">
    <div>
      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="mobileMenuOpen">
        <Dialog
          as="div"
          class="relative z-40 lg:hidden"
          @close="mobileMenuOpen = false"
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
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel
                class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
              >
                <div class="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    @click="mobileMenuOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Links -->
                <TabGroup as="div" class="mt-2">
                  <div class="border-b border-gray-200">
                    <TabList class="-mb-px flex space-x-8 px-4">
                      <Tab
                        v-for="category in navigation.categories"
                        :key="category.name"
                        v-slot="{ selected }"
                        as="template"
                      >
                        <button
                          :class="[
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-900',
                            'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium',
                          ]"
                        >
                          {{ category.name }}
                        </button>
                      </Tab>
                    </TabList>
                  </div>
                  <TabPanels as="template">
                    <TabPanel
                      v-for="(category, categoryIdx) in navigation.categories"
                      :key="category.name"
                      class="space-y-12 px-4 pt-10 pb-6"
                    >
                      <div
                        class="grid grid-cols-1 items-start gap-y-10 gap-x-6"
                      >
                        <div class="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p
                              :id="`mobile-featured-heading-${categoryIdx}`"
                              class="font-medium text-gray-900"
                            >
                              Featured
                            </p>
                            <ul
                              role="list"
                              :aria-labelledby="`mobile-featured-heading-${categoryIdx}`"
                              class="mt-6 space-y-6"
                            >
                              <li
                                v-for="item in category.featured"
                                :key="item.name"
                                class="flex"
                              >
                                <a :href="item.href" class="text-gray-500">{{
                                  item.name
                                }}</a>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p
                              id="mobile-categories-heading"
                              class="font-medium text-gray-900"
                            >
                              Categories
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-categories-heading"
                              class="mt-6 space-y-6"
                            >
                              <li
                                v-for="item in category.categories"
                                :key="item.name"
                                class="flex"
                              >
                                <a :href="item.href" class="text-gray-500">{{
                                  item.name
                                }}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p
                              id="mobile-collection-heading"
                              class="font-medium text-gray-900"
                            >
                              Collection
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-collection-heading"
                              class="mt-6 space-y-6"
                            >
                              <li
                                v-for="item in category.collection"
                                :key="item.name"
                                class="flex"
                              >
                                <a :href="item.href" class="text-gray-500">{{
                                  item.name
                                }}</a>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <p
                              id="mobile-brand-heading"
                              class="font-medium text-gray-900"
                            >
                              Brands
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-brand-heading"
                              class="mt-6 space-y-6"
                            >
                              <li
                                v-for="item in category.brands"
                                :key="item.name"
                                class="flex"
                              >
                                <a :href="item.href" class="text-gray-500">{{
                                  item.name
                                }}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>

                <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div
                    v-for="page in navigation.pages"
                    :key="page.name"
                    class="flow-root"
                  >
                    <a
                      :href="page.href"
                      class="-m-2 block p-2 font-medium text-gray-900"
                      >{{ page.name }}</a
                    >
                  </div>
                </div>

                <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                      >Create an account</a
                    >
                  </div>
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                      >Sign in</a
                    >
                  </div>
                </div>

                <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                  <!-- Currency selector -->
                  <form>
                    <div class="inline-block">
                      <label for="mobile-currency" class="sr-only"
                        >Currency</label
                      >
                      <div
                        class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"
                      >
                        <select
                          id="mobile-currency"
                          name="currency"
                          class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                        >
                          <option
                            v-for="currency in currencies"
                            :key="currency"
                          >
                            {{ currency }}
                          </option>
                        </select>
                        <div
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
                        >
                          <ChevronDownIcon
                            class="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <header class="relative">
        <nav aria-label="Top">
          <!-- Top navigation -->
          <div class="bg-gray-900">
            <div
              class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            >
              <!-- Currency selector -->
              <form class="hidden lg:block lg:flex-1">
                <div class="flex">
                  <label for="desktop-currency" class="sr-only">Currency</label>
                  <div
                    class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white"
                  >
                    <select
                      id="desktop-currency"
                      name="currency"
                      class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                    >
                      <option v-for="currency in currencies" :key="currency">
                        {{ currency }}
                      </option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
                    >
                      <ChevronDownIcon
                        class="h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <p
                class="flex-1 text-center text-sm font-medium text-white lg:flex-none"
              >
                Get free delivery on orders over $100
              </p>

              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Create an account</a
                >
                <span class="h-6 w-px bg-gray-600" aria-hidden="true" />
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Sign in</a
                >
              </div>
            </div>
          </div>

          <!-- Secondary navigation -->
          <div class="bg-white">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="border-b border-gray-200">
                <div class="flex h-16 items-center justify-between">
                  <!-- Logo (lg+) -->
                  <div class="hidden lg:flex lg:items-center">
                    <a href="#">
                      <span class="sr-only">Your Company</span>
                      <img
                        class="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>

                  <div class="hidden h-full lg:flex">
                    <!-- Mega menus -->
                    <PopoverGroup class="ml-8">
                      <div class="flex h-full justify-center space-x-8">
                        <Popover
                          v-for="(
                            category, categoryIdx
                          ) in navigation.categories"
                          :key="category.name"
                          v-slot="{ open }"
                          class="flex"
                        >
                          <div class="relative flex">
                            <PopoverButton
                              :class="[
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                              ]"
                              >{{ category.name }}</PopoverButton
                            >
                          </div>

                          <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <PopoverPanel
                              class="absolute inset-x-0 top-full z-20 text-gray-500 sm:text-sm"
                            >
                              <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                              <div
                                class="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div class="relative bg-white">
                                <div class="mx-auto max-w-7xl px-8">
                                  <div
                                    class="grid grid-cols-2 items-start gap-y-10 gap-x-8 pt-10 pb-12"
                                  >
                                    <div
                                      class="grid grid-cols-2 gap-y-10 gap-x-8"
                                    >
                                      <div>
                                        <p
                                          :id="`desktop-featured-heading-${categoryIdx}`"
                                          class="font-medium text-gray-900"
                                        >
                                          Featured
                                        </p>
                                        <ul
                                          role="list"
                                          :aria-labelledby="`desktop-featured-heading-${categoryIdx}`"
                                          class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          <li
                                            v-for="item in category.featured"
                                            :key="item.name"
                                            class="flex"
                                          >
                                            <a
                                              :href="item.href"
                                              class="hover:text-gray-800"
                                              >{{ item.name }}</a
                                            >
                                          </li>
                                        </ul>
                                      </div>
                                      <div>
                                        <p
                                          id="desktop-categories-heading"
                                          class="font-medium text-gray-900"
                                        >
                                          Categories
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="desktop-categories-heading"
                                          class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          <li
                                            v-for="item in category.categories"
                                            :key="item.name"
                                            class="flex"
                                          >
                                            <a
                                              :href="item.href"
                                              class="hover:text-gray-800"
                                              >{{ item.name }}</a
                                            >
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div
                                      class="grid grid-cols-2 gap-y-10 gap-x-8"
                                    >
                                      <div>
                                        <p
                                          id="desktop-collection-heading"
                                          class="font-medium text-gray-900"
                                        >
                                          Collection
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="desktop-collection-heading"
                                          class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          <li
                                            v-for="item in category.collection"
                                            :key="item.name"
                                            class="flex"
                                          >
                                            <a
                                              :href="item.href"
                                              class="hover:text-gray-800"
                                              >{{ item.name }}</a
                                            >
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <p
                                          id="desktop-brand-heading"
                                          class="font-medium text-gray-900"
                                        >
                                          Brands
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="desktop-brand-heading"
                                          class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          <li
                                            v-for="item in category.brands"
                                            :key="item.name"
                                            class="flex"
                                          >
                                            <a
                                              :href="item.href"
                                              class="hover:text-gray-800"
                                              >{{ item.name }}</a
                                            >
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </transition>
                        </Popover>

                        <a
                          v-for="page in navigation.pages"
                          :key="page.name"
                          :href="page.href"
                          class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >{{ page.name }}</a
                        >
                      </div>
                    </PopoverGroup>
                  </div>

                  <!-- Mobile menu and search (lg-) -->
                  <div class="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      class="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      @click="mobileMenuOpen = true"
                    >
                      <span class="sr-only">Open menu</span>
                      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Search -->
                    <a
                      href="#"
                      class="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Search</span>
                      <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  <!-- Logo (lg-) -->
                  <a href="#" class="lg:hidden">
                    <span class="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      class="h-8 w-auto"
                    />
                  </a>

                  <div class="flex flex-1 items-center justify-end">
                    <div class="flex items-center lg:ml-8">
                      <div class="flex space-x-8">
                        <div class="hidden lg:flex">
                          <a
                            href="#"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span class="sr-only">Search</span>
                            <MagnifyingGlassIcon
                              class="h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        <div class="flex">
                          <a
                            href="#"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span class="sr-only">Account</span>
                            <UserIcon class="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        class="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div class="flow-root">
                        <a href="#" class="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span
                            class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                            >0</span
                          >
                          <span class="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <FiltersMobile
          :filters="filters"
          :toggle-mobile-filters-open="toggleMobileFiltersOpen"
        />
      </TransitionRoot>

      <main>
        <TheHeader />

        <!-- Filters -->
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" class="sr-only">Filters</h2>
          <FiltersDesktop
            :filters="filters"
            :toggle-mobile-filters-open="toggleMobileFiltersOpen"
          />
          <FiltersActive :active-filters="activeFilters" />
        </section>

        <!-- Product grid -->
        <section
          aria-labelledby="products-heading"
          class="mx-auto max-w-2xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8"
        >
          <ProductGrid />
        </section>
      </main>

      <footer
        aria-labelledby="footer-heading"
        class="border-t border-gray-200 bg-white"
      >
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="py-20">
            <div
              class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16"
            >
              <!-- Image section -->
              <div
                class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1"
              >
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                  class="h-8 w-auto"
                />
              </div>

              <!-- Sitemap sections -->
              <div
                class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2"
              >
                <div
                  class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Products</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li
                        v-for="item in footerNavigation.products"
                        :key="item.name"
                        class="text-sm"
                      >
                        <a
                          :href="item.href"
                          class="text-gray-500 hover:text-gray-600"
                          >{{ item.name }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Company</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li
                        v-for="item in footerNavigation.company"
                        :key="item.name"
                        class="text-sm"
                      >
                        <a
                          :href="item.href"
                          class="text-gray-500 hover:text-gray-600"
                          >{{ item.name }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li
                      v-for="item in footerNavigation.customerService"
                      :key="item.name"
                      class="text-sm"
                    >
                      <a
                        :href="item.href"
                        class="text-gray-500 hover:text-gray-600"
                        >{{ item.name }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Newsletter section -->
              <div
                class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1"
              >
                <h3 class="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p class="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form class="mt-2 flex sm:max-w-md">
                  <label for="email-address" class="sr-only"
                    >Email address</label
                  >
                  <input
                    id="email-address"
                    type="text"
                    autocomplete="email"
                    required=""
                    class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div class="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 py-10 text-center">
            <p class="text-sm text-gray-500">
              &copy; 2021 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect } from "vue";
import TheHeader from "@/components/redo/TheHeader.vue";
import FiltersDesktop from "@/components/redo/FiltersDesktop.vue";
import FiltersMobile from "@/components/redo/FiltersMobile.vue";
import FiltersActive from "@/components/redo/FiltersActive.vue";
import ProductGrid from "@/components/redo/ProductGrid.vue";

import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const breadcrumbs = [
  { id: 1, name: "Objects", href: "#" },
  { id: 2, name: "Workspace", href: "#" },
  { id: 3, name: "Sale", href: "#" },
];

const footerNavigation = {
  products: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  customerService: [
    { name: "Contact", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "Secure Payments", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
  ],
};

const filters = reactive([
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "All New Arrivals", checked: false },
      { value: "tees", label: "Tees", checked: false },
      { value: "objects", label: "Objects", checked: false },
      { value: "sweatshirts", label: "Sweatshirts", checked: false },
      { value: "pants-shorts", label: "Pants & Shorts", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
  },
]);

const getActiveFilter = () =>
  filters.flatMap((f: any) => f.options.filter((o: any) => o.checked));

const toggleMobileFiltersOpen = () =>
  (mobileFiltersOpen.value = !mobileFiltersOpen.value);

const activeFilters = ref<any[]>([]);
const mobileMenuOpen = ref(false);
const mobileFiltersOpen = ref(false);

watchEffect(() => {
  activeFilters.value = getActiveFilter();
});
</script>
