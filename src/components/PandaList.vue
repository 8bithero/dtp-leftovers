<template>
  <!-- <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> -->
  <div class="py-5 sm:py-24">
    <div
      class="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
    >
      <div v-for="nft in nftList" :key="nft.id" class="relative">
        <PandaCard :nft="nft" />
      </div>
    </div>
    <div class="mt-32 flex justify-center">
      <div v-if="showLoadMore" class="relative w-fit">
        <img
          src="~@/assets/images/star.png"
          loading="lazy"
          alt=""
          class="absolute -right-10 -bottom-10 max-w-[30px]"
        />
        <img
          src="~@/assets/images/star.png"
          loading="lazy"
          alt=""
          class="absolute -top-10 -left-8 max-w-[30px]"
        />
        <button
          type="button"
          class="cursor-big-pointer group inline-flex items-center justify-between border-2 border-mine-shaft p-2 text-base font-medium !shadow-[4px_4px_0] !shadow-mine-shaft outline-none hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-[2px_2px_0] active:translate-x-[4px] active:translate-y-[4px] active:!shadow-[0px_0px_0]"
          @click="loadMore"
        >
          <span class="sr-only">Load More Pandas</span>
          Load More Pandas
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import PandaCard from '@/components/PandaCard.vue';
import { INFTData2 } from '@/common/types';

const props = defineProps<{
  nfts: INFTData2[];
}>();

const nftList = ref<INFTData2[]>([]);
const perPage = ref(100);
const showLoadMore = ref(false);

const loadMore = () => (perPage.value += 100);

watchEffect(() => {
  nftList.value = props.nfts.slice(0, perPage.value);
  showLoadMore.value = props.nfts.length > perPage.value;
});
</script>

<style scoped lang="scss"></style>
