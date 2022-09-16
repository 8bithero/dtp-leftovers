// enum AttributeType {
//   mouth = 'MOUTH',
//   fur = 'FUR',
//   body = 'BODY',
//   glasses = 'GLASSES',
//   background = 'BACKGROUND',
//   head = 'HEAD',
// }

// type TraitType = 'MOUTH' | 'FUR' | 'BODY' | 'GLASSES' | 'BACKGROUND' | 'HEAD';


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