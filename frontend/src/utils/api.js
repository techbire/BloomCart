import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized access');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

// Plants API endpoints
export const plantsAPI = {
  // Get all plants with optional filters and pagination
  getAllPlants: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    return api.get(`/plants?${queryParams.toString()}`);
  },

  // Get single plant by ID
  getPlantById: (id) => {
    return api.get(`/plants/${id}`);
  },

  // Add new plant
  addPlant: (plantData) => {
    return api.post('/plants', plantData);
  },

  // Update plant
  updatePlant: (id, plantData) => {
    return api.put(`/plants/${id}`, plantData);
  },

  // Delete plant
  deletePlant: (id) => {
    return api.delete(`/plants/${id}`);
  },

  // Get all categories
  getCategories: () => {
    return api.get('/plants/meta/categories');
  },

  // Search plants
  searchPlants: (query, filters = {}) => {
    const params = {
      search: query,
      ...filters
    };
    return plantsAPI.getAllPlants(params);
  },

  // Filter plants by category
  getPlantsByCategory: (category, additionalParams = {}) => {
    const params = {
      category,
      ...additionalParams
    };
    return plantsAPI.getAllPlants(params);
  },

  // Get available/unavailable plants
  getPlantsByAvailability: (availability, additionalParams = {}) => {
    const params = {
      availability,
      ...additionalParams
    };
    return plantsAPI.getAllPlants(params);
  }
};

// Health check
export const healthAPI = {
  check: () => {
    return api.get('/health');
  }
};

export default api;
