import type { Destination, PackageListItem } from '@/types/api';

export interface NavVariantProps {
  companyName: string;
  packages: PackageListItem[];
  destinations: Destination[];
  currency: string;
}
