import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FeedItem {
  id: string;
  user_id: string;
  merchant_name: string;
  transaction_date: string;
  photo_url: string | null;
  place_name: string | null;
  place_address: string | null;
  latitude: number | null;
  longitude: number | null;
  amount: number | null;
  show_amount: boolean;
  is_visible: boolean;
  like_count: number;
  created_at: string;
}

export interface FeedResponse {
  items: FeedItem[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  photo_url: string | null;
}

export const feedApi = {
  /**
   * Get feed items
   * @param cursor Optional cursor for pagination
   * @param limit Number of items to fetch
   * @returns Promise with feed items
   */
  getFeed: async (cursor?: string, limit: number = 20): Promise<FeedResponse> => {
    try {
      const params: Record<string, string | number> = { limit };
      if (cursor) {
        params.cursor = cursor;
      }
      
      const response = await api.get('/api/feed', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw error;
    }
  },
  
  /**
   * Get feed item details
   * @param id Feed item ID
   * @returns Promise with feed item details
   */
  getFeedItem: async (id: string): Promise<FeedItem> => {
    try {
      const response = await api.get(`/api/feed/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feed item:', error);
      throw error;
    }
  },
  
  /**
   * Like a feed item
   * @param id Feed item ID
   * @returns Promise with updated feed item
   */
  likeFeedItem: async (id: string): Promise<FeedItem> => {
    try {
      const response = await api.post(`/api/feed/${id}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking feed item:', error);
      throw error;
    }
  },
  
  /**
   * Hide a feed item
   * @param id Feed item ID
   * @returns Promise with success status
   */
  hideFeedItem: async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await api.post(`/api/feed/${id}/hide`);
      return response.data;
    } catch (error) {
      console.error('Error hiding feed item:', error);
      throw error;
    }
  }
};

export const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    user_id: 'user1',
    merchant_name: 'Blue Bottle Coffee',
    transaction_date: '2025-05-08T10:30:00Z',
    photo_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    place_name: 'Blue Bottle Coffee',
    place_address: '123 Main St, San Francisco, CA 94105',
    latitude: 37.7749,
    longitude: -122.4194,
    amount: 5.75,
    show_amount: false,
    is_visible: true,
    like_count: 12,
    created_at: '2025-05-08T10:35:00Z'
  },
  {
    id: '2',
    user_id: 'user1',
    merchant_name: 'Shake Shack',
    transaction_date: '2025-05-07T18:45:00Z',
    photo_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    place_name: 'Shake Shack',
    place_address: '456 Market St, San Francisco, CA 94105',
    latitude: 37.7899,
    longitude: -122.4014,
    amount: 15.50,
    show_amount: false,
    is_visible: true,
    like_count: 8,
    created_at: '2025-05-07T18:50:00Z'
  },
  {
    id: '3',
    user_id: 'user1',
    merchant_name: 'Sweetgreen',
    transaction_date: '2025-05-06T12:15:00Z',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    place_name: 'Sweetgreen',
    place_address: '789 Howard St, San Francisco, CA 94105',
    latitude: 37.7859,
    longitude: -122.4074,
    amount: 12.95,
    show_amount: false,
    is_visible: true,
    like_count: 5,
    created_at: '2025-05-06T12:20:00Z'
  }
];

export default api;
