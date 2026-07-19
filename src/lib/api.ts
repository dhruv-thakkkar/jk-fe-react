import { API_BASE_URL, COMPANY_SLUG } from './config';
import type {
  CompanyPublicInfo,
  Category,
  CreateEnquiryInput,
  Destination,
  EnquiryConfirmation,
  PackageDetail,
  PaginatedResponse,
  PackageListItem,
  PublicPackagesQuery,
} from '@/types/api';

/** Revalidate the storefront's catalog data every minute (ISR) — packages/destinations don't change second-to-second. */
const REVALIDATE_SECONDS = 60;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function publicGet<T>(path: string, searchParams?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}/public/${COMPANY_SLUG}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

  if (!res.ok) {
    throw new ApiError(`GET ${url.pathname} failed with ${res.status}`, res.status);
  }

  return res.json() as Promise<T>;
}

export function getCompanyInfo(): Promise<CompanyPublicInfo> {
  return publicGet<CompanyPublicInfo>('');
}

export function listCategories(query: { isFeatured?: boolean } = {}): Promise<Category[]> {
  const params: Record<string, string> = {};
  if (query.isFeatured !== undefined) params.isFeatured = String(query.isFeatured);
  return publicGet<Category[]>('/categories', params);
}

export function listDestinations(): Promise<Destination[]> {
  return publicGet<Destination[]>('/destinations');
}

export function listPackages(
  query: PublicPackagesQuery = {},
): Promise<PaginatedResponse<PackageListItem>> {
  const params: Record<string, string> = {};
  if (query.categoryId) params.categoryId = query.categoryId;
  if (query.destinationId) params.destinationId = query.destinationId;
  if (query.isFeatured !== undefined) params.isFeatured = String(query.isFeatured);
  if (query.search) params.search = query.search;
  if (query.page) params.page = String(query.page);
  if (query.pageSize) params.pageSize = String(query.pageSize);

  return publicGet<PaginatedResponse<PackageListItem>>('/packages', params);
}

export async function getPackage(packageSlug: string): Promise<PackageDetail | null> {
  try {
    return await publicGet<PackageDetail>(`/packages/${packageSlug}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * There's no single-destination public endpoint (the full list is small —
 * a few dozen at most — and already cached/revalidated), so this just
 * filters the list rather than adding a redundant backend route.
 */
export async function getDestinationBySlug(destinationSlug: string): Promise<Destination | null> {
  const destinations = await listDestinations();
  return destinations.find((destination) => destination.slug === destinationSlug) ?? null;
}

/** Called from the client (Contact page form) — a mutation, so no ISR caching here. */
export async function submitEnquiry(input: CreateEnquiryInput): Promise<EnquiryConfirmation> {
  const res = await fetch(`${API_BASE_URL}/public/${COMPANY_SLUG}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(body?.message ?? `Request failed with ${res.status}`, res.status);
  }

  return res.json() as Promise<EnquiryConfirmation>;
}
