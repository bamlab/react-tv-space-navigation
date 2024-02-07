import { ImageSourcePropType } from 'react-native';

export type VariableSizeProgramInfo = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description: string;
  type: 'portrait' | 'square';
};
