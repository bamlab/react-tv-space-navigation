import { IconName, iconsCatalog } from './IconsCatalog';

export const Icon = ({ icon, size, color }: { icon: IconName; size: number; color: string }) => {
  const IconComponent = iconsCatalog[icon];

  return <IconComponent size={size} color={color} />;
};
