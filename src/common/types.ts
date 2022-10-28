export enum ETraitTypes {
  background = 'background',
  fur = 'fur',
  body = 'body',
  head = 'head',
  glasses = 'glasses',
  mouth = 'mouth',
  rarity = 'rarity',
}

export enum ERarityType {
  common = 'common',
  uncommon = 'uncommon',
  rare = 'rare',
  superRare = 'superRare',
  mythic = 'mythic',
}

export type STraitTypes = keyof typeof ETraitTypes;
export type SRarityType = keyof typeof ERarityType;
export interface ITraits {
  type: STraitTypes;
  value: string;
  label: string;
  rarity?: SRarityType;
  checked: boolean;
}

export type IFilter = {
  id: STraitTypes;
  name: string;
  options: ITraits[];
};

export type IActiveFilter = { [K in STraitTypes]: ITraits[] };
export interface INFTData2 {
  id: number;
  name: string;
  image: string;
  background: string;
  fur: string;
  body: string;
  head: string;
  glasses: string;
  mouth: string;
  mintAddress: string | null;
}
