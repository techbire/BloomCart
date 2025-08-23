const express = require('express');
const GoogleImagesService = require('../services/GoogleImagesService');
const router = express.Router();

const googleImagesService = new GoogleImagesService();

// Get image for a specific plant name
router.get('/plant/:plantName', async (req, res) => {
  try {
    const { plantName } = req.params;
    
    if (!plantName) {
      return res.status(400).json({
        success: false,
        error: 'Plant name is required'
      });
    }

    const imageUrl = await googleImagesService.searchPlantImage(plantName);
    
    if (imageUrl) {
      res.json({
        success: true,
        data: {
          plantName,
          imageUrl
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'No image found for this plant'
      });
    }
  } catch (error) {
    console.error('Error fetching plant image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch plant image'
    });
  }
});

// Get images for multiple plants
router.post('/plants/batch', async (req, res) => {
  try {
    const { plantNames } = req.body;
    
    if (!plantNames || !Array.isArray(plantNames)) {
      return res.status(400).json({
        success: false,
        error: 'plantNames array is required'
      });
    }

    if (plantNames.length > 10) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 10 plant names allowed per request'
      });
    }

    const results = await googleImagesService.searchMultiplePlantImages(plantNames);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error fetching plant images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch plant images'
    });
  }
});

module.exports = router;
