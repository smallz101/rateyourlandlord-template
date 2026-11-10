import type { IApiService, ReviewUpdate } from './interfaces';
import type { Landlord, Review } from '../types';

// The demo directory matches the approved MSU seed list; no sample reviews are invented.
const MOCK_LANDLORDS: Landlord[] = [
  {
    id: 1,
    name: 'DTN Management Co',
    addresses: ['1000 Village Dr (Cedar Village Apartments)'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 2,
    name: 'Campus Community Management (CCM)',
    addresses: ['617 Elm St'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 3,
    name: 'Cron Management',
    addresses: ['211 Ann St (The Residences)'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 4,
    name: 'Hudgins Realty',
    addresses: ['225 Division Street (225 Division Street Apartments)'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 5,
    name: 'Prime Housing Group',
    addresses: ['1390 E Grand River Ave (Cedarview East Apartments)'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 6,
    name: 'MC Properties',
    addresses: ['1224 Frye Street'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
  {
    id: 7,
    name: 'Hagan Realty, Inc.',
    addresses: ['910 Abbot Road (Abbot Manor)'],
    city: 'East Lansing',
    status: 'approved',
    is_deleted: false,
    created_at: '2026-11-10T00:00:00Z',
  },
];

const MOCK_REVIEWS: Record<number, Review[]> = {};

let nextId = 1000;

export class MockApiService implements IApiService {
  async getLandlords(): Promise<Landlord[]> {
    return MOCK_LANDLORDS.filter((landlord) => !landlord.is_deleted);
  }

  async getLandlordById(id: number): Promise<Landlord | undefined> {
    return MOCK_LANDLORDS.find((l) => l.id === id && !l.is_deleted);
  }

  async deleteLandlord(landlordId: number): Promise<boolean> {
    const landlord = MOCK_LANDLORDS.find((l) => l.id === landlordId && !l.is_deleted);
    if (!landlord) throw new Error('Landlord not found.');
    landlord.is_deleted = true;
    return true;
  }

  async getReviewsByLandlordId(landlordId: number, includeDeleted = false): Promise<Review[]> {
    const reviews = MOCK_REVIEWS[landlordId] ?? [];
    return includeDeleted ? [...reviews] : reviews.filter(review => !review.is_deleted);
  }

  async getReviewById(reviewId: number): Promise<Review | undefined> {
    for (const reviews of Object.values(MOCK_REVIEWS)) {
      const found = reviews.find((r) => r.id === reviewId);
      if (found) return { ...found };
    }
    return undefined;
  }

  async getLatestReviewForLandlordByUser(
    _landlordId: number,
    _userId: string
  ): Promise<Review | undefined> {
    return undefined;
  }

  async uploadVerificationFile(_file: File, _userId: string, _reviewId: number): Promise<string> {
    return 'demo/mock-verification-file.pdf';
  }

  async deleteVerificationFile(_filePath: string): Promise<void> {}

  async getVerificationFileUrl(_filePath: string): Promise<string> {
    return '#';
  }

  async addLandlord(
    landlordData: Omit<Landlord, 'id' | 'is_deleted' | 'created_at' | 'status'>
  ): Promise<Landlord> {
    return {
      ...landlordData,
      id: ++nextId,
      status: 'pending',
      is_deleted: false,
      created_at: new Date().toISOString(),
    };
  }

  async addReview(
    reviewData: Omit<Review, 'id' | 'is_deleted' | 'created_at' | 'updated_at' | 'verification_file_url'>
  ): Promise<Review> {
    return {
      ...reviewData,
      id: ++nextId,
      is_deleted: false,
      verification_file_url: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  async updateReview(_reviewId: number, _data: ReviewUpdate): Promise<void> {}

  async deleteReview(reviewId: number): Promise<boolean> {
    const review = Object.values(MOCK_REVIEWS).flat().find(r => r.id === reviewId);
    if (!review) throw new Error('Review not found.');
    review.is_deleted = true;
    return true;
  }

  async restoreReview(reviewId: number): Promise<boolean> {
    const review = Object.values(MOCK_REVIEWS).flat().find(r => r.id === reviewId);
    if (!review) throw new Error('Review not found.');
    review.is_deleted = false;
    return true;
  }

  async getPendingLandlords(): Promise<Landlord[]> {
    return [];
  }

  async getPendingReviews(): Promise<Review[]> {
    return [];
  }

  async updateLandlordStatus(
    _landlordId: number,
    _status: 'pending' | 'approved' | 'rejected'
  ): Promise<boolean> {
    return true;
  }

  async updateReviewVerificationStatus(
    _reviewId: number,
    _verificationStatus: 'unverified' | 'pending' | 'verified'
  ): Promise<boolean> {
    return true;
  }

  async updateLandlordAddresses(_landlordId: number, _addresses: string[]): Promise<boolean> {
    return true;
  }

  async getAdminStats(): Promise<{ landlordCount: number; reviewCount: number; addressCount: number; userCount: number }> {
    const activeLandlords = MOCK_LANDLORDS.filter((landlord) => !landlord.is_deleted);
    return {
      landlordCount: activeLandlords.filter((landlord) => landlord.status === 'approved').length,
      reviewCount: Object.values(MOCK_REVIEWS).flat().filter((review) => !review.is_deleted).length,
      addressCount: activeLandlords.reduce((count, landlord) => count + (landlord.addresses?.length ?? 0), 0),
      userCount: 0,
    };
  }
}
