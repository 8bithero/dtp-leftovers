<template>
  
    <!-- <h3 class="text-lg font-medium leading-6 text-gray-900">Last 30 days</h3> -->
  <!-- <div class="bg-white dark:bg-slate-800 pt-10"> -->
  <div class="pt-10">
    <!-- <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> -->
    <div class="p-10 bg-white dark:bg-slate-800 rounded-md">
      <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in stats" :key="item.id" class="relative overflow-hidden rounded-lg bg-white dark:bg-slate-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
            <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
              <ArrowUpIcon v-if="item.changeType === 'increase'" class="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
              <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
              <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
              {{ item.change }}
            </p>
            <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  View all<span class="sr-only"> {{ item.name }} stats</span></a
                >
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { ref, watch } from "vue";
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'StatsBar',
  props: {
    nftCount: Number,
    filteredNftCount: Number
  },
  components: {
    ArrowDownIcon,
    ArrowUpIcon,
  },
  setup(props) {
    // console.log
    const totalNFTCount = ref<number | undefined>(props.nftCount)
    const currentNFTCount = ref<number | undefined>(props.filteredNftCount)
    // const chanceOfmint = ref<number | undefined>(props.mintPercentage)
    // const stats = ref()

    watch(props, (oldV, newV) => {
      console.log("oldV: ", oldV)
      console.log("newV: ", newV)
      totalNFTCount.value = props.nftCount;
      currentNFTCount.value = props.filteredNftCount;
      // chanceOfmint.value = props.mintPercentage;
    });

    const val1 = computed(() => `${totalNFTCount.value}`)
    const val2 = computed(() => `${currentNFTCount.value}`)
    const mintPercentage = computed(() => {
      const value = currentNFTCount.value as number / (totalNFTCount.value as number)
      return value.toLocaleString(undefined, {
        style: 'percent',
        maximumFractionDigits: 2
      });
      // `${.toFixed(2)}%`)
    })
      // `${((currentNFTCount.value as number / (totalNFTCount.value as number)) * 100).toFixed(2)}%`)
    // watchEffect(props, (oldV, newV) => {
    //   // console.log("oldV: ", oldV)
    //   // console.log("newV: ", newV)
    //   totalNFTCount.value = props.nftCount;
    //   currentNFTCount.value = props.filteredNftCount;
    //   chanceOfmint.value = props.mintPercentage;
    // });

    // const chanceOfmint = () => (
    //   ((props.filteredNftCount as number) / (props.nftCount as number))*100
    // )
    
    const stats = reactive([
      { id: 1, name: 'Total Leftovers', stat: val1, icon: UsersIcon, change: '122', changeType: 'increase' },
      { id: 2, name: 'Avg. Open Rate', stat: val2, icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
      { id: 3, name: 'Avg. Click Rate', stat: mintPercentage, icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
    ])

    return { stats }
  }
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
