<template>
  <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <!-- <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> -->

    <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="nft in nfts" :key="nft.id" class="group relative bg-slate-700">
        <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 border dark:border-gray-700">
          <VLazyImage :src="nft.image" :alt="nft.name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 pl-2 pb-3 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700 dark:text-stone-100">
              <a :href="nft.image">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ nft.name }}
              </a>
            </h3>
            <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
          </div>
          <!-- <p class="text-sm font-medium text-gray-900">{{ product.price }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VLazyImage from 'v-lazy-image';

export default defineComponent({
  name: 'TrashPandas',
  props: {
    nfts: Array,
  },
  components: {
    VLazyImage,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// h3 {
//   margin: 40px 0 0;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
</style>
