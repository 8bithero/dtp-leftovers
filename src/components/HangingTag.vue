<template>
  <div class="playlists">
    <a
      href="https://flp.degentrashpanda.com/"
      class="card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="card-inner mint-token cursor-big-pointer">
        <span class="card-pin"></span>
        <div class="card-image shadowy-mid rounded-[20px] bg-sky-900">
          <img class="p-10" src="~@/assets/images/LogoTransp.png" />
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span class="card-meta-number">
              <span class="items-baseline font-semibold">
                {{ props.nftCount.toLocaleString() }}
              </span>
              <span class="ml-1 text-xs text-gray-500"
                >/ {{ numberFormater(20000) }}</span
              >
            </span>
            <div class="text-right">
              <span class="inline-block text-xs font-semibold text-sky-900">
                {{ mintedPercentage }}%
              </span>
            </div>
          </div>
          <div class="px-1">
            <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                class="my-1 mb-2 rounded-full bg-radical-red p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                :style="'width: ' + mintedPercentage + '%'"
              />
            </div>
          </div>
          <h2 class="card-title text-left">Panda Leftovers</h2>
        </div>
      </div>
    </a>

    <a
      href="https://trade.dexlab.space/#/market/8asEGhUfV4gqazSw5EFqKzqaBRd7A27T3a9fADqB7Fvm"
      class="card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="card-inner buy-token cursor-big-pointer">
        <span class="card-pin"></span>
        <div class="card-image shadowy rounded-[20px] bg-radical-red">
          <img class="p-4 sepia" src="~@/assets/images/FairLaunchToken.gif" />
        </div>
        <div class="card-content cursor-big-pointer">
          <div class="card-meta">
            <span class="card-meta-number">
              <span class="items-baseline font-semibold">{{ tokenPrice }}</span>
              <span class="ml-1 text-xs text-gray-500">SOL</span>
            </span>
          </div>
          <h2 class="card-title text-left">Mint Token</h2>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from "vue";

const props = defineProps({
  nftCount: { type: Number, default: 0 },
});

onMounted(() => {
  fetchTokenPrice();
});

const tokenPrice = ref<number>(0);
const mintedPercentage = computed(() => Math.round((1 - props.nftCount / 20000) * 100));

const fetchTokenPrice = async () => {
  fetch(
    "https://open-api.dexlab.space/v1/orderbooks/8asEGhUfV4gqazSw5EFqKzqaBRd7A27T3a9fADqB7Fvm"
  )
    .then((response) => response.json())
    .then((responseJson) => (tokenPrice.value = responseJson?.data?.lastOrderPrice))
    .catch((error) => {
      console.log("error: ", error);
    });
};

const numberFormater = (number: number) =>
  number.toLocaleString(undefined, { maximumSignificantDigits: 2 });

const currencyFormater = (price: number) =>
  price.toLocaleString("en", { style: "currency", currency: "SOL" });
</script>

<style scoped lang="scss">
$c-gray-100: #fbf8f2;
$c-gray-500: #5f5f5f;
$c-gray-900: #1d1d1d;
$c-green-300: #bad5ca;
$c-green-500: #80b895;
$c-yellow-300: #f8e0b1;
$rotation: -3deg;

.playlists {
  // margin-top: 1.5rem;
  display: flex;
  padding: 2rem 0.5rem;
}

.currently-playing {
  padding: 1rem 0.5rem;
}

.card {
  width: 200px;
  transform: rotate($rotation);
  transition: 0.15s ease-out;

  &:nth-child(2) {
    $rotation: 5deg;
    margin-top: 1rem;
    // transform: rotate(5deg);
    transform: rotate($rotation);

    .card-inner:after {
      background-color: $c-green-300;
    }

    &:hover,
    &:focus-within {
      transform: translateY(4px) rotate($rotation);
    }

    .card-pin {
      top: 20px;
      left: 20px;
      transform: rotate(-5deg);
    }
  }

  & + & {
    margin-left: 2rem;
  }

  &:hover,
  &:focus-within {
    transform: translateY(4px) rotate($rotation);

    .card-inner {
      background-color: $c-gray-100;
    }

    .card-pin:after {
      height: 54px;
    }

    .card-pin:before {
      transform: translatey(-4px);
    }
  }

  &.horizontal {
    width: 100%;
    transform: rotate(3deg);

    .card-inner {
      flex-direction: row;
      align-items: center;
      padding: 1rem;

      &:after {
        background-color: $c-green-500;
      }
    }

    .card-image {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }

    .card-content {
      width: 100%;
      margin-top: 0;
      margin-left: 0.5rem;
    }

    .card-meta-artist {
      font-weight: 700;
    }

    .card-title {
      font-weight: 500;
      color: $c-gray-500;
      font-size: 1.125em;
      margin-top: 0.125em;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .card-time {
      font-weight: 600;
    }

    &:hover,
    &:focus-within {
      .card-pin.simple:before,
      .card-pin.simple:after {
        transform: none;
      }

      .card-pin.simple:after {
        height: 50px;
      }
    }
  }
}

.card-inner {
  display: flex;
  flex-direction: column;
  border: 2px solid $c-gray-900;
  border-radius: 20px;
  padding: 0.5rem;
  background-color: #fff;
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 95%;
    height: 100%;
    bottom: -9px;
    left: calc(50% - 47.5%);
    border-radius: 20px;
    border: 2px solid $c-gray-900;
    background-color: $c-yellow-300;
    transition: 300ms ease-in-out;

    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding-bottom: 8px;
    font-family: "Space Grotesk", sans-serif;
  }

  &:hover {
    &:after {
      bottom: -40px !important;
    }
  }
}

.card-pin {
  width: 12px;
  height: 12px;
  background-color: $c-gray-900;
  position: absolute;
  top: 20px;
  left: calc(50% - 6px);
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px $c-gray-900;
  transform: rotate(3deg);
  z-index: 1;

  &:before,
  &:after {
    content: "";
    display: block;
    border-radius: 50%;
    position: absolute;
    transition: 0.15s ease-out;
  }

  &:before {
    width: 12px;
    height: 12px;
    background-color: $c-gray-900;
    border-radius: 50%;
    left: calc(50% - 6px);
    top: -44px;
  }

  &:after {
    width: 6px;
    background-color: #fff;
    border: 1px solid;
    // border-radius: 99em;
    height: 50px;
    left: calc(50% - 3px);
    bottom: 3px;
  }

  &.simple {
    box-shadow: none;

    &:nth-of-type(odd) {
      left: 10px;
      top: 10px;
      transform: rotate(-45deg);
    }

    &:nth-of-type(even) {
      left: calc(100% - 20px);
      top: calc(100% - 20px);
      transform: rotate(120deg);
    }
  }
}

.card-image {
  // border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  position: relative;

  img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.card-meta,
.card-title {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.card-meta {
  padding-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-meta-number {
  color: $c-gray-500;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-title {
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
}

.shadowy-lite {
  box-shadow: 6px 2px 42px 0px rgba(236, 220, 220, 0.5) inset;
}
.shadowy-mid {
  box-shadow: 6px 2px 42px 0px rgb(155 155 156 / 50%) inset;
}

.shadowy {
  box-shadow: 6px 2px 42px 0px rgb(36 36 36 / 50%) inset;

  // background: radial-gradient(circle, rgb(120 32 71) 0%, rgb(255, 0, 89) 59%);

  // box-shadow: 10px 10px 45px 0px rgba(36, 36, 36, 0.75) inset;
  //   -webkit-box-shadow: 10px 10px 45px 0px rgba(36, 36, 36, 0.75) inset;
  //   -moz-box-shadow: 10px 10px 45px 0px rgba(36, 36, 36, 0.75) inset;
}

.card-inner.buy-token::after {
  content: "Click to buy";
}

.card-inner.mint-token::after {
  content: "Click to mint";
}
</style>
