const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const imageAPI = {
  // Get image for a specific plant
  getPlantImage: async (plantName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/plant/${encodeURIComponent(plantName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plant image');
      }
      const data = await response.json();
      return data.success ? data.data.imageUrl : null;
    } catch (error) {
      console.error('Error fetching plant image:', error);
      return null;
    }
  },

  // Get images for multiple plants
  getBatchPlantImages: async (plantNames) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/plants/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantNames }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch plant images');
      }
      
      const data = await response.json();
      return data.success ? data.data : {};
    } catch (error) {
      console.error('Error fetching batch plant images:', error);
      return {};
    }
  }
};
