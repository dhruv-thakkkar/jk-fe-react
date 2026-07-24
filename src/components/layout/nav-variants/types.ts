import type { Destination, PackageListItem } from '@/types/api';

export interface NavVariantProps {
  companyName: string;
  logoUrl: string | null;
  packages: PackageListItem[];
  destinations: Destination[];
  currency: string;
}
