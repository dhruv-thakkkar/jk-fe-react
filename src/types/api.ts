export type PackageStatus = 'draft' | 'published' | 'archived';

export interface CompanyPublicInfo {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  country: string | null;
  currency: string;
}

export interface Banner {
  id: string;
  companyId: string;
  imageUrl: string;
  title: string | null;
  linkUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  companyId: string;
  name: string;
  imageUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  stateRegion: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PackageImage {
  id: string;
  packageId: string;
  imageUrl: string;
  altText: string | null;
  isCover: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface PackageItineraryDay {
  id: string;
  packageId: string;
  dayNumber: number;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PackageInclusion {
  id: string;
  packageId: string;
  itemText: string;
  displayOrder: number;
  createdAt: string;
}

export interface PackageExclusion {
  id: string;
  packageId: string;
  itemText: string;
  displayOrder: number;
  createdAt: string;
}

export interface PackageDestinationLink {
  id: string;
  packageId: string;
  destinationId: string;
  displayOrder: number;
  destination: Destination;
}

interface PackageCore {
  id: string;
  companyId: string;
  categoryId: string | null;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  durationDays: number;
  durationNights: number;
  priceAdult: string;
  priceChild: string | null;
  priceInfant: string | null;
  discountPriceAdult: string | null;
  discountPriceChild: string | null;
  discountPriceInfant: string | null;
  status: PackageStatus;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category | null;
}

export interface PackageListItem extends PackageCore {
  images: PackageImage[];
}

export interface PackageDetail extends PackageCore {
  images: PackageImage[];
  itinerary: PackageItineraryDay[];
  inclusions: PackageInclusion[];
  exclusions: PackageExclusion[];
  destinations: PackageDestinationLink[];
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PublicPackagesQuery {
  categoryId?: string;
  destinationId?: string;
  isFeatured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateEnquiryInput {
  fullName: string;
  phone: string;
  email?: string;
  packageId?: string;
  travelDate?: string;
  numAdults?: number;
  numChildren?: number;
  numInfants?: number;
  message?: string;
}

export interface EnquiryConfirmation {
  id: string;
  status: string;
  createdAt: string;
}
