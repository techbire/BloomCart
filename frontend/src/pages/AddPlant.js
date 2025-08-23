import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaTimes, FaLeaf, FaImage } from 'react-icons/fa';
import { plantsAPI } from '../utils/api';
import { imageAPI } from '../utils/imageAPI';
import LoadingSpinner from '../components/LoadingSpinner';
import './AddPlant.css';

const AddPlant = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: [],
    description: '',
    image: '',
    care_instructions: '',
    stock_quantity: ''
  });

  const [loading, setLoading] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [fetchingImage, setFetchingImage] = useState(false);

  const availableCategories = [
    'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 
    'Home Decor', 'Low Light', 'Pet Friendly', 'Flowering', 
    'Medicinal', 'Hanging', 'Large', 'Small', 'Favorites'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCategory = (category) => {
    if (category && !formData.categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const fetchPlantImage = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a plant name first');
      return;
    }

    setFetchingImage(true);
    try {
      const imageUrl = await imageAPI.getPlantImage(formData.name);
      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
        toast.success('Image fetched successfully!');
      } else {
        toast.error('No image found for this plant');
      }
    } catch (error) {
      console.error('Error fetching plant image:', error);
      toast.error('Failed to fetch plant image');
    } finally {
      setFetchingImage(false);
    }
  };

  const handleCategoryInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (categoryInput.trim()) {
        addCategory(categoryInput.trim());
      }
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('Plant name is required');
    }

    if (!formData.price || formData.price <= 0) {
      errors.push('Valid price is required');
    }

    if (formData.categories.length === 0) {
      errors.push('At least one category is required');
    }

    if (formData.stock_quantity && formData.stock_quantity < 0) {
      errors.push('Stock quantity cannot be negative');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : 0
      };

      const response = await plantsAPI.addPlant(submitData);

      if (response.data.success) {
        toast.success('Plant added successfully!');
        // Reset form
        setFormData({
          name: '',
          price: '',
          categories: [],
          description: '',
          image: '',
          care_instructions: '',
          stock_quantity: ''
        });
      } else {
        toast.error(response.data.message || 'Failed to add plant');
      }
    } catch (error) {
      console.error('Error adding plant:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          'Failed to add plant. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Adding your beautiful plant..." />;
  }

  return (
    <div className="add-plant-page">
      <div className="container">
        <div className="add-plant-header">
          <div className="header-icon">
            <FaLeaf />
          </div>
          <h1 className="page-title">Add New Plant</h1>
          <p className="page-description">
            Share a beautiful plant with our community
          </p>
        </div>

        <div className="add-plant-form-container">
          <form onSubmit={handleSubmit} className="add-plant-form">
            <div className="form-grid">
              {/* Plant Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Plant Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Money Plant, Snake Plant"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="299"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Stock Quantity */}
              <div className="form-group">
                <label htmlFor="stock_quantity" className="form-label">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="10"
                  min="0"
                />
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <div className="image-input-group">
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/plant-image.jpg or auto-fetch from Google"
                  />
                  <button
                    type="button"
                    onClick={fetchPlantImage}
                    disabled={fetchingImage || !formData.name.trim()}
                    className="fetch-image-btn"
                  >
                    <FaImage />
                    {fetchingImage ? 'Fetching...' : 'Auto-Fetch'}
                  </button>
                </div>
                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Plant preview" />
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="form-group">
              <label className="form-label">
                Categories * (Select from suggestions or add custom)
              </label>
              
              <div className="categories-input-container">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={handleCategoryInputKeyPress}
                  className="form-input"
                  placeholder="Type and press Enter to add category"
                />
                <button
                  type="button"
                  onClick={() => addCategory(categoryInput.trim())}
                  className="add-category-btn"
                  disabled={!categoryInput.trim()}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="category-suggestions">
                {availableCategories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => addCategory(category)}
                    className={`suggestion-btn ${formData.categories.includes(category) ? 'selected' : ''}`}
                    disabled={formData.categories.includes(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="selected-categories">
                {formData.categories.map(category => (
                  <span key={category} className="selected-category">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="remove-category-btn"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Describe the plant, its features, and benefits..."
                rows="4"
                maxLength="500"
              />
              <div className="character-count">
                {formData.description.length}/500
              </div>
            </div>

            {/* Care Instructions */}
            <div className="form-group">
              <label htmlFor="care_instructions" className="form-label">
                Care Instructions
              </label>
              <textarea
                id="care_instructions"
                name="care_instructions"
                value={formData.care_instructions}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Light requirements, watering schedule, special care tips..."
                rows="3"
                maxLength="300"
              />
              <div className="character-count">
                {formData.care_instructions.length}/300
              </div>
            </div>

            {/* Preview */}
            {(formData.name || formData.image) && (
              <div className="form-group">
                <label className="form-label">Preview</label>
                <div className="plant-preview">
                  {formData.image && (
                    <div className="preview-image-container">
                      <img 
                        src={formData.image} 
                        alt="Preview"
                        className="preview-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="preview-info">
                    <h3 className="preview-name">
                      {formData.name || 'Plant Name'}
                    </h3>
                    {formData.price && (
                      <div className="preview-price">₹{formData.price}</div>
                    )}
                    {formData.categories.length > 0 && (
                      <div className="preview-categories">
                        {formData.categories.map(cat => (
                          <span key={cat} className="preview-category">{cat}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Adding Plant...
                  </>
                ) : (
                  <>
                    <FaLeaf className="btn-icon" />
                    Add Plant to Store
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
