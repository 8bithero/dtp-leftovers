<template>
  <div class="home">
    <div
      v-for="nft in nfts"
      :key="nft.id"
    >
    <img alt="Vue logo" width="60" height="60" :src="nft.image">
      {{nft.id}}
    </div>

     <!-- <NFTCard
            v-for="nft in nfts"
            :key="nft.mint"
            :nft="nft"
            :price-method="priceMethod"
            :is-sol="isSol"
            :hidden="hideSold && nft.soldAt !== undefined"
        /> -->
    <TrashPandas msg="Welcome to Your Vue.js + TypeScript App"/>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashPandas from '@/components/TrashPandas.vue'; // @ is an alias to /src
import { INFTData } from "@/common/types";
// import * as dtpData from "@/common/dtp-data.json";
import dtpData from "@/common/dtp-data.json";


export default defineComponent({
  name: 'TrashPandasView',
  components: {
    TrashPandas,
  },
  setup() {
    const nfts = ref<INFTData[]>(dtpData);

    console.log('hello: ', dtpData[0].id)
    console.log({dtpData})

    return {
      nfts
    }
  }


});
</script>
