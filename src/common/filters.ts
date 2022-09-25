import { reactive } from "vue";
import { ITraits2, furTraits, headTraits, bodyTraits, glassesTraits, mouthTraits, rarityTraits } from "./types";

type IFilter = { id: string; name: string, options: ITraits2[] };

export const filters: IFilter[] = reactive([
  {
    id: 'fur',
    name: 'Fur',
    options: furTraits,
  },
  {
    id: 'head',
    name: 'Head',
    options: headTraits,
  },
  {
    id: 'body',
    name: 'Body',
    options: bodyTraits,
  },
  {
    id: 'glasses',
    name: 'Glasses',
    options: glassesTraits,
  },
  {
    id: 'mouth',
    name: 'Mouth',
    options: mouthTraits,
  },
  {
    id: 'rarity',
    name: 'Rarity',
    options: rarityTraits,
  },
])
