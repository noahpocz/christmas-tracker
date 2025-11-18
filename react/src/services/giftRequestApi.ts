const HOSTNAMES = {
  DEVELOPMENT: 'localhost',
  PRODUCTION: '34.228.58.72'
}

const getApiBaseUrl = () => {
  const { hostname } = window.location;

  if (hostname === HOSTNAMES.DEVELOPMENT) {
    return `http://${HOSTNAMES.DEVELOPMENT}:8080/gift-requests`;
  }

  return `http://${HOSTNAMES.PRODUCTION}/api/gift-requests`;
}

const API_BASE_URL = getApiBaseUrl();

export interface GiftRequest {
  id: number;
  personName: string;
  itemDescription: string;
  shoppingLink: string;
  purchased: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGiftRequest {
  personName: string;
  itemDescription: string;
  shoppingLink: string;
}

class GiftRequestApi {
  async getAllRequests(): Promise<GiftRequest[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch gift requests');
    }
    return response.json();
  }

  async getRequestById(id: number): Promise<GiftRequest> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch gift request with id ${id}`);
    }
    return response.json();
  }

  async createRequest(data: CreateGiftRequest): Promise<GiftRequest> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create gift request');
    }
    return response.json();
  }

  async updateRequest(id: number, data: CreateGiftRequest): Promise<GiftRequest> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update gift request');
    }
    return response.json();
  }

  async deleteRequest(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete gift request');
    }
  }

  async togglePurchased(id: number): Promise<GiftRequest> {
    const response = await fetch(`${API_BASE_URL}/${id}/purchased`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle purchased status');
    }
    return response.json();
  }
}

export const giftRequestApi = new GiftRequestApi();
