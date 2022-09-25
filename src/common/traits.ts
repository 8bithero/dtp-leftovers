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

  
// export type RarityType = 'common' | 'uncommon' | 'rare' | 'superRare' | 'mythic';
export type IFilterGroup = { id: STraitTypes; name: string, options: ITraits[] };
export type IActiveFilter = { value: string; label: string };
interface IAttributeData {
  trait_type: string;
  value: string;
}

export interface INFTData {
  id: number;
  name: string;
  image: string;
  attributes: IAttributeData[];
}

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
}

export interface ITraits {
  type?: STraitTypes;
  value: string;
  label: string;
  rarity?: SRarityType;
  checked: boolean;
}

export const filterTraits: ITraits[] = [
  { type: 'background', value: 'Black',  label: 'Black',  rarity: 'common', checked: false },
  { type: 'background', value: 'Blue',   label: 'Blue',   rarity: 'common', checked: false },
  { type: 'background', value: 'Green',  label: 'Green',  rarity: 'common', checked: false },
  { type: 'background', value: 'Purple', label: 'Purple', rarity: 'common', checked: false },
  { type: 'background', value: 'Red',    label: 'Red',    rarity: 'common', checked: false },
  { type: 'background', value: 'Yellow', label: 'Yellow', rarity: 'common', checked: false },

  { type: 'fur', value: 'Black',          label: 'Black',          rarity: 'common',    checked: false },
  { type: 'fur', value: 'Blue',           label: 'Blue',           rarity: 'common',    checked: false },
  { type: 'fur', value: 'Brown',          label: 'Brown',          rarity: 'common',    checked: false },
  { type: 'fur', value: 'Green',          label: 'Green',          rarity: 'common',    checked: false },
  { type: 'fur', value: 'Purple',         label: 'Purple',         rarity: 'common',    checked: false },
  { type: 'fur', value: 'Red',            label: 'Red',            rarity: 'common',    checked: false },
  { type: 'fur', value: 'Scarred Black',  label: 'Scarred Black',  rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Scarred Blue',   label: 'Scarred Blue',   rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Scarred Brown',  label: 'Scarred Brown',  rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Scarred Green',  label: 'Scarred Green',  rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Scarred Purple', label: 'Scarred Purple', rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Scarred Red',    label: 'Scarred Red',    rarity: 'uncommon',  checked: false },
  { type: 'fur', value: 'Antique',        label: 'Antique',        rarity: 'rare',      checked: false },
  { type: 'fur', value: 'Fox',            label: 'Fox',            rarity: 'rare',      checked: false },
  { type: 'fur', value: 'Gold',           label: 'Gold',           rarity: 'superRare', checked: false },
  { type: 'fur', value: 'Zombie',         label: 'Zombie',         rarity: 'superRare', checked: false },
  { type: 'fur', value: 'Acid Trip',      label: 'Acid Trip',      rarity: 'mythic',    checked: false },

  { type: 'head', value: 'Belt',              label: 'Belt',              rarity: 'common',    checked: false },
  { type: 'head', value: 'Cardboard Box',     label: 'Cardboard Box',     rarity: 'common',    checked: false },
  { type: 'head', value: 'Ice Cream',         label: 'Ice Cream',         rarity: 'common',    checked: false },
  { type: 'head', value: 'Lampshade',         label: 'Lampshade',         rarity: 'common',    checked: false },
  { type: 'head', value: 'Paint Can',         label: 'Paint Can',         rarity: 'common',    checked: false },
  { type: 'head', value: 'Pandos',            label: 'Pandos',            rarity: 'common',    checked: false },
  { type: 'head', value: 'Plunger',           label: 'Plunger',           rarity: 'common',    checked: false },
  { type: 'head', value: 'Pot',               label: 'Pot',               rarity: 'common',    checked: false },
  { type: 'head', value: 'Takeout',           label: 'Takeout',           rarity: 'common',    checked: false },
  { type: 'head', value: 'Tamberine',         label: 'Tamberine',         rarity: 'common',    checked: false },
  { type: 'head', value: 'Trash Lid',         label: 'Trash Lid',         rarity: 'common',    checked: false },
  { type: 'head', value: 'Beret',             label: 'Beret',             rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Boot',              label: 'Boot',              rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Colander',          label: 'Colander',          rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Headband',          label: 'Headband',          rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Paper Bag',         label: 'Paper Bag',         rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Pandas Pickles',    label: 'Pandas Pickles',    rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Pirate Hat',        label: 'Pirate Hat',        rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Road Cone',         label: 'Road Cone',         rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Trucker Cap',       label: 'Trucker Cap',       rarity: 'uncommon',  checked: false },
  { type: 'head', value: 'Beanie',            label: 'Beanie',            rarity: 'rare',      checked: false },
  { type: 'head', value: 'Degen Service Hat', label: 'Degen Service Hat', rarity: 'rare',      checked: false },
  { type: 'head', value: 'Flat Cap',          label: 'Flat Cap',          rarity: 'rare',      checked: false },
  { type: 'head', value: 'Sock',              label: 'Sock',              rarity: 'rare',      checked: false },
  { type: 'head', value: 'Sombrero',          label: 'Sombrero',          rarity: 'rare',      checked: false },
  { type: 'head', value: 'The Gambler',       label: 'The Gambler',       rarity: 'rare',      checked: false },
  { type: 'head', value: 'Tomato Soup',       label: 'Tomato Soup',       rarity: 'rare',      checked: false },
  { type: 'head', value: 'Crown',             label: 'Crown',             rarity: 'superRare', checked: false },
  { type: 'head', value: 'Steampunk Hat',     label: 'Steampunk Hat',     rarity: 'superRare', checked: false },
  { type: 'head', value: 'Unicorn Headband',  label: 'Unicorn Headband',  rarity: 'superRare', checked: false },
  { type: 'head', value: 'Urn',               label: 'Urn',               rarity: 'superRare', checked: false },
  { type: 'head', value: 'Space Helmet',      label: 'Space Helmet',      rarity: 'mythic',    checked: false },

  { type: 'body', value: 'Bandana',                      label: 'Bandana',                      rarity: 'common',    checked: false },
  { type: 'body', value: 'Bumbag',                       label: 'Bumbag',                       rarity: 'common',    checked: false },
  { type: 'body', value: 'Denim Vest',                   label: 'Denim Vest',                   rarity: 'common',    checked: false },
  { type: 'body', value: 'Dress Shirt',                  label: 'Dress Shirt',                  rarity: 'common',    checked: false },
  { type: 'body', value: 'Fishing Vest',                 label: 'Fishing Vest',                 rarity: 'common',    checked: false },
  { type: 'body', value: 'Hockey Pads',                  label: 'Hockey Pads',                  rarity: 'common',    checked: false },
  { type: 'body', value: 'Hoodie',                       label: 'Hoodie',                       rarity: 'common',    checked: false },
  { type: 'body', value: 'Knitted Vest',                 label: 'Knitted Vest',                 rarity: 'common',    checked: false },
  { type: 'body', value: 'Open Shirt',                   label: 'Open Shirt',                   rarity: 'common',    checked: false },
  { type: 'body', value: 'Overalls',                     label: 'Overalls',                     rarity: 'common',    checked: false },
  { type: 'body', value: 'Singlet',                      label: 'Singlet',                      rarity: 'common',    checked: false },
  { type: 'body', value: 'T-Shirt',                      label: 'T-Shirt',                      rarity: 'common',    checked: false },
  { type: 'body', value: 'Turtle Neck',                  label: 'Turtle Neck',                  rarity: 'common',    checked: false },
  { type: 'body', value: 'Chain',                        label: 'Chain',                        rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Engineer',                     label: 'Engineer',                     rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Fairy Wings',                  label: 'Fairy Wings',                  rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Football Jersey - Blue/White', label: 'Football Jersey - Blue/White', rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Football Jersey - Red/Blue',   label: 'Football Jersey - Red/Blue',   rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Leather Jacket',               label: 'Leather Jacket',               rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Mummy',                        label: 'Mummy',                        rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Rain Jacket',                  label: 'Rain Jacket',                  rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Xmas Sweater',                 label: 'Xmas Sweater',                 rarity: 'uncommon',  checked: false },
  { type: 'body', value: 'Chav Jacket',                  label: 'Chav Jacket',                  rarity: 'rare',      checked: false },
  { type: 'body', value: 'Crayon Farmer',                label: 'Crayon Farmer',                rarity: 'rare',      checked: false },
  { type: 'body', value: 'Degen Service Polo',           label: 'Degen Service Polo',           rarity: 'rare',      checked: false },
  { type: 'body', value: 'Designer Jacket',              label: 'Designer Jacket',              rarity: 'rare',      checked: false },
  { type: 'body', value: 'Down Jacket',                  label: 'Down Jacket',                  rarity: 'rare',      checked: false },
  { type: 'body', value: 'Slav Jacket',                  label: 'Slav Jacket',                  rarity: 'rare',      checked: false },
  { type: 'body', value: 'Toga',                         label: 'Toga',                         rarity: 'rare',      checked: false },
  { type: 'body', value: 'Vampire Cape',                 label: 'Vampire Cape',                 rarity: 'rare',      checked: false },
  { type: 'body', value: 'Blouse',                       label: 'Blouse',                       rarity: 'superRare', checked: false },
  { type: 'body', value: 'Prom King',                    label: 'Prom King',                    rarity: 'superRare', checked: false },
  { type: 'body', value: 'Spacesuit',                    label: 'Spacesuit',                    rarity: 'superRare', checked: false },
  { type: 'body', value: 'Tweed Suit',                   label: 'Tweed Suit',                   rarity: 'superRare', checked: false },
  { type: 'body', value: 'Admiral',                      label: 'Admiral',                      rarity: 'mythic',    checked: false },

  { type: 'glasses', value: 'Designer Glasses', label: 'Designer Glasses', rarity: 'common', checked: false },
  { type: 'glasses', value: 'Reading Glasses', label: 'Reading Glasses', rarity: 'common', checked: false },
  { type: 'glasses', value: 'Swimming Goggles', label: 'Swimming Goggles', rarity: 'uncommon', checked: false },
  { type: 'glasses', value: 'Trash Vipers', label: 'Trash Vipers', rarity: 'uncommon', checked: false },
  { type: 'glasses', value: 'Snow Goggles', label: 'Snow Goggles', rarity: 'rare', checked: false },
  { type: 'glasses', value: 'Star Glasses', label: 'Star Glasses', rarity: 'rare', checked: false },
  { type: 'glasses', value: 'Monocle', label: 'Monocle', rarity: 'superRare', checked: false },

  { type: 'mouth', value: 'Bird Foot - Smirk', label: 'Bird Foot', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Bone - Grin', label: 'Bone', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Burnt Spoon - Smirk', label: 'Burnt Spoon', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Lollipop - Grin', label: 'Lollipop', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Match Stick - Smirk', label: 'Match Stick', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Rat Tail - Smirk', label: 'Rat Tail', rarity: 'common', checked: false },
  { type: 'mouth', value: 'Acid - Grin', label: 'Acid', rarity: 'uncommon', checked: false },
  { type: 'mouth', value: 'Cigarette - Smirk', label: 'Cigarette', rarity: 'uncommon', checked: false },
  { type: 'mouth', value: 'Crayon Shiv - Smirk', label: 'Crayon Shiv', rarity: 'uncommon', checked: false },
  { type: 'mouth', value: 'Dynamite - Grin', label: 'Dynamite', rarity: 'uncommon', checked: false },
  { type: 'mouth', value: 'Cigar - Grin', label: 'Cigar', rarity: 'rare', checked: false },
  { type: 'mouth', value: 'Smashed Bottle - Grin', label: 'Smashed Bottle', rarity: 'rare', checked: false },
  { type: 'mouth', value: 'War Medal - Smirk', label: 'War Medal', rarity: 'rare', checked: false },
  { type: 'mouth', value: 'Dirty Fiat - Grin', label: 'Dirty Fiat', rarity: 'superRare', checked: false },
  { type: 'mouth', value: 'Joint - Smirk', label: 'Joint', rarity: 'superRare', checked: false },

  { type: 'rarity', value: 'common',    label: 'Common',     checked: false },
  { type: 'rarity', value: 'uncommon',  label: 'Uncommon',   checked: false },
  { type: 'rarity', value: 'rare',      label: 'Rare',       checked: false },
  { type: 'rarity', value: 'superRare', label: 'Super Rare', checked: false },
  { type: 'rarity', value: 'mythic',    label: 'Mythic',     checked: false },
]