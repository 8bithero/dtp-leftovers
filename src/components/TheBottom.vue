<template>
  <div
    class="container relative mx-auto w-full max-w-5xl py-16 px-4 pb-0 sm:px-6 lg:px-8"
  >
    <img
      src="~@/assets/images/arrow_rounded.png"
      loading="lazy"
      alt=""
      class="image-left-arrow hidden lg:inline-block"
    /><img
      src="~@/assets/images/arrow_striped.png"
      loading="lazy"
      alt=""
      class="image-right-arrow hidden lg:inline-block"
    />
    <div
      class="rounded-xl bg-mine-shaft p-4 shadow-[7px_7px_0_0_rgba(255,255,255,1)]"
    >
      <div class="flex w-full flex-wrap justify-center md:flex-nowrap">
        <div class="md:pr-4">
          <h3
            class="font-space-grotesk mt-5 text-3xl font-medium text-sugar-milk"
          >
            About
          </h3>

          <p class="my-5 text-sugar-milk">
            Trash Panda Leftovers is a community built tool which shows you the
            probability of minting any of the 'leftover' Degenerate Trash Pandas
            in the collection that have yet to be minted.
          </p>

          <h3
            class="font-space-grotesk mt-12 text-3xl font-medium text-sugar-milk"
          >
            Donations
          </h3>

          <p class="my-5 text-sugar-milk">
            If you appreciate this tool feel free to buy my a beer by sending
            any donations to my
            <span
              class="cursor-big-pointer font-bold underline decoration-vivid-sky-blue decoration-wavy underline-offset-4"
              @click="copyButton"
              >Solana Wallet</span
            >
            below.
          </p>
        </div>

        <a
          href="https://twitter.com/PandaParis_"
          alt="Panda Paris - Twitter"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-big-pointer my-5"
        >
          <img
            class="min-w-[125px] rounded-full ring-1 ring-white hover:ring-vivid-sky-blue"
            src="~@/assets/images/panda-sm.png"
            alt="Paris Panda"
          />
        </a>
        <!-- </div> -->
      </div>

      <div class="mb-10 mt-6 w-full">
        <div
          class="relative rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
        >
          <input
            id="wallet"
            ref="walletInputRef"
            type="text"
            name="wallet"
            class="block w-full truncate border-0 p-0 pr-11 text-lg font-medium text-mine-shaft placeholder-gray-500 focus:ring-0 md:pr-0"
            :value="walletAddress"
            readonly
          />
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
              class="cursor-big-pointer inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400 hover:border-gray-400 hover:text-gray-600"
              @click="copyButton"
            >
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="-mr-[7px] ml-[7px] flex justify-center rounded-b-xl bg-white p-5 text-center"
    >
      <a
        href="https://twitter.com/PandaParis_"
        alt="Panda Paris - Twitter"
        target="_blank"
        rel="noopener noreferrer"
        class="cursor-big-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-gray-500 hover:fill-mine-shaft"
        >
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </svg>
      </a>
      <a
        href="https://github.com/8bithero/dtp-leftovers"
        alt="Trash Panda Leftovers - Github"
        target="_blank"
        rel="noopener noreferrer"
        class="cursor-big-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="ml-3 fill-gray-500 hover:fill-mine-shaft"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const walletAddress = ref('pariskwjWbeuvJjUdqJ1P5pKKRNo3YJLiyyivAuyft9');
const walletInputRef = ref(null);
const copied = ref(false);

const copyButton = async () => {
  walletInputRef.value.select();

  try {
    const toCopy = walletAddress.value;
    await navigator.clipboard.writeText(toCopy);

    copied.value = true;
    setTimeout(() => (copied.value = false), 1000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
</script>

<style scoped lang="scss">
.image-left-arrow {
  position: absolute;
  left: -7%;
  top: 40%;
  right: 0px;
  bottom: 0%;
  width: 80px;
}

.image-right-arrow {
  position: absolute;
  left: auto;
  top: 0%;
  right: -11%;
  bottom: auto;
  width: 140px;
}
</style>
