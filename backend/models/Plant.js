const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,
    minlength: [2, 'Plant name must be at least 2 characters long'],
    maxlength: [100, 'Plant name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  categories: [{
    type: String,
    required: true,
    trim: true,
    enum: {
      values: [
        'Indoor', 
        'Outdoor', 
        'Succulent', 
        'Air Purifying', 
        'Home Decor', 
        'Low Light', 
        'Pet Friendly', 
        'Flowering', 
        'Medicinal',
        'Hanging',
        'Large',
        'Small',
        'Favorites'
      ],
      message: 'Invalid category'
    }
  }],
  availability: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Plant'
  },
  care_instructions: {
    type: String,
    maxlength: [300, 'Care instructions cannot exceed 300 characters']
  },
  stock_quantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  }
}, {
  timestamps: true
});

// Index for better search performance
plantSchema.index({ name: 'text', categories: 'text' });
plantSchema.index({ categories: 1 });
plantSchema.index({ availability: 1 });

// Virtual for formatted price
plantSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`;
});

// Pre-save middleware to update availability based on stock
plantSchema.pre('save', function(next) {
  this.availability = this.stock_quantity > 0;
  next();
});

module.exports = mongoose.model('Plant', plantSchema);
