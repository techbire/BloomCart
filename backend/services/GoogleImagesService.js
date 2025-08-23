const axios = require('axios');

class GoogleImagesService {
  constructor() {
    this.API_KEY = process.env.GOOGLE_API_KEY;
    this.SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
    this.BASE_URL = 'https://www.googleapis.com/customsearch/v1';
    
    // Blocked domains that cause CORS issues
    this.blockedDomains = [
      'shutterstock.com',
      'shutterstock',
      'getty',
      'alamy.com',
      'istockphoto.com',
      'adobe.com',
      'dreamstime.com',
      '123rf.com',
      'depositphotos.com',
      'stock.adobe.com',
      'bigstockphoto.com',
      'gardenia.net', // Hosts shutterstock images
      'stockphoto',
      'stockimage',
      'stockvault'
    ];
  }

  async searchPlantImage(plantName) {
    try {
      const query = `${plantName} plant houseplant indoor`;
      const response = await axios.get(this.BASE_URL, {
        params: {
          key: this.API_KEY,
          cx: this.SEARCH_ENGINE_ID,
          q: query,
          searchType: 'image',
          num: 10, // Get more results to filter from
          safe: 'active',
          imgSize: 'medium',
          imgType: 'photo',
          fileType: 'jpg,png'
        }
      });

      if (response.data && response.data.items && response.data.items.length > 0) {
        // Filter out blocked domains and find a suitable image
        const validImages = response.data.items.filter(item => {
          const imageUrl = item.link;
          return !this.blockedDomains.some(domain => 
            imageUrl.toLowerCase().includes(domain.toLowerCase())
          );
        });

        if (validImages.length > 0) {
          console.log(`Found ${validImages.length} valid images for ${plantName}, using: ${validImages[0].link}`);
          return validImages[0].link;
        } else {
          console.log(`All images for ${plantName} were from blocked domains, trying alternative search`);
          return await this.searchAlternativeImage(plantName);
        }
      } else {
        console.log(`No image found for plant: ${plantName}`);
        return await this.searchAlternativeImage(plantName);
      }
    } catch (error) {
      console.error(`Error fetching image for ${plantName}:`, error.message);
      return await this.searchAlternativeImage(plantName);
    }
  }

  async searchAlternativeImage(plantName) {
    try {
      // Try alternative search with different query
      const altQuery = `${plantName} care guide plant photo`;
      const response = await axios.get(this.BASE_URL, {
        params: {
          key: this.API_KEY,
          cx: this.SEARCH_ENGINE_ID,
          q: altQuery,
          searchType: 'image',
          num: 10,
          safe: 'active',
          imgSize: 'large',
          imgType: 'photo',
          fileType: 'jpg,png,webp'
        }
      });

      if (response.data && response.data.items && response.data.items.length > 0) {
        const validImages = response.data.items.filter(item => {
          const imageUrl = item.link;
          return !this.blockedDomains.some(domain => 
            imageUrl.toLowerCase().includes(domain.toLowerCase())
          );
        });

        if (validImages.length > 0) {
          console.log(`Alternative search found image for ${plantName}: ${validImages[0].link}`);
          return validImages[0].link;
        }
      }
      
      console.log(`No valid alternative image found for ${plantName}`);
      return null;
    } catch (error) {
      console.error(`Alternative search failed for ${plantName}:`, error.message);
      return null;
    }
  }

  async searchMultiplePlantImages(plantNames) {
    const results = {};
    
    for (const plantName of plantNames) {
      try {
        const imageUrl = await this.searchPlantImage(plantName);
        results[plantName] = imageUrl;
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to fetch image for ${plantName}:`, error.message);
        results[plantName] = null;
      }
    }
    
    return results;
  }
}

module.exports = GoogleImagesService;
