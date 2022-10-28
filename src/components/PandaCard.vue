<template>
  <div
    class="flipbox panel cursor-big-pointer"
    :class="{ flip: flip }"
    @click="toggleFlip"
  >
    <div class="front">
      <div
        class="min-h-80 image-wrap aspect-w-1 aspect-h-1 w-full overflow-hidden border-2 border-mine-shaft group-hover:opacity-75 lg:aspect-none lg:h-80"
        :class="bgColour"
      >
        <VLazyImage
          :src="nft.image"
          :alt="nft.name"
          class="image h-full w-full object-cover object-center p-1 lg:h-full lg:w-full lg:p-1.5"
        />
      </div>
    </div>
    <div class="back">
      <div
        class="min-h-80 image-wrap aspect-w-1 aspect-h-1 w-full overflow-hidden overflow-y-scroll border-2 border-mine-shaft bg-mine-shaft md:overflow-auto lg:aspect-none lg:h-80"
      >
        <div>
          <h3 class="truncate py-3 px-3 pb-6 font-bold text-sugar-milk sm:pb-2">
            {{ nft.name }}
          </h3>
          <dl class="text-left">
            <div
              v-for="([type, value], index) in Object.entries(attributes)"
              :key="index"
              class="grid grid-cols-2 bg-mine-shaft px-3 py-2 even:bg-[#2c2c2c] sm:gap-4 sm:px-3"
            >
              <dt
                class="truncate text-xs font-semibold capitalize text-sugar-milk"
              >
                {{ type }}
              </dt>
              <dd class="truncate text-sm text-sugar-milk">
                {{ value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VLazyImage from 'v-lazy-image';
import { IAttribute } from '@/common/types';

const bgColourSelect = () =>
  [
    'bg-vivid-sky-blue',
    'bg-ultramarine-blue',
    'bg-electric-violet',
    'bg-radical-red',
    'bg-dark-orange',
    'bg-bitter-lemon',
    'bg-sea-green-crayola',
  ][Math.floor(Math.random() * 7)];

const props = defineProps({
  nft: { type: Object, default: null },
});

const getAttributes = (): IAttribute => {
  const { id, name, image, mintAddress, ...rest } = props.nft;

  return rest as IAttribute;
};

const attributes = ref<IAttribute>(getAttributes());
const flip = ref(false);
const bgColour = ref(bgColourSelect());

const toggleFlip = () => (flip.value = !flip.value);
</script>

<style scoped lang="scss">
.image-wrap {
  position: relative;
  box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.5);
  transition: all 0.25s ease-out;

  &:hover {
    box-shadow: 14px 14px 0 0 rgba(0, 0, 0, 0.25);

    .image {
      filter: grayscale(0.5);
    }
  }
}

.image {
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transform: translateX(-50%) translateY(-50%);
  transition: filter 0.5s ease-out;
}

.panel {
  position: relative;
  perspective: 600px;
  width: 100%;
  height: 100%;

  .front,
  .back {
    z-index: 50;
    top: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: all 0.4s ease-in-out;
  }

  .back {
    position: absolute;
    transform: rotateY(-180deg);
  }

  &.flip {
    .front {
      transform: rotateY(180deg);
    }

    .back {
      transform: rotateX(0deg) rotateY(0deg);
    }
  }
}
</style>
