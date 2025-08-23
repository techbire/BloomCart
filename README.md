# BloomCart

A premium full-stack e-commerce web application for browsing, purchasing, and managing plants, built with React, Node.js, Express, and MongoDB. Created by [TechBire](https://www.linkedin.com/in/techbire/).

## 🌱 Features

### Frontend Features
- **Plant Catalog**: Browse through a beautiful grid of plants with images, names, prices, and categories
- **Search & Filter**: 
  - Search by plant name, category, or description (case-insensitive)
  - Filter by category (Indoor, Outdoor, Succulent, Air Purifying, Favorites, etc.)
  - Filter by availability (In Stock/Out of Stock)
  - Sort by date, name, or price
- **Shopping Cart**: Add plants to cart, manage quantities, and proceed to checkout
- **Favorites Collection**: Save your favorite plants for easy access
- **Plant Details**: Detailed view with pricing, descriptions, and care instructions
- **Add Plant (Admin)**: Add new plants with comprehensive validation
- **Responsive Design**: Glass morphism UI that works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Beautiful loading animations and error handling
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support

### Backend Features
- **RESTful API**: Clean, scalable API with proper error handling
- **Database Integration**: MongoDB with Mongoose ODM
- **Data Validation**: Server-side validation with Joi
- **Security**: CORS, Helmet, and rate limiting
- **Search**: Advanced text search with indexing
- **Payment Integration**: Razorpay payment gateway integration
- **Image Management**: Google Images API integration for plant photos
- **Seeding**: Pre-populated with 50+ plant records

## 🚀 Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for beautiful icons
- **React Toastify** for notifications
- **CSS3** with modern styling and animations

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **Joi** for data validation
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Express Rate Limit** for API protection

## 📁 Project Structure

```
BloomCart/
├── backend/                 # Node.js Express API
│   ├── models/
│   │   └── Plant.js              # Plant data model
│   ├── routes/
│   │   ├── plants.js            # Plant API routes
│   │   ├── payments.js          # Payment processing
│   │   ├── images.js            # Image management
│   │   └── scraper.js           # Web scraping utilities
│   ├── validators/
│   │   └── plantValidator.js    # Input validation
│   ├── scripts/
│   │   └── seedData.js          # Database seeding
│   ├── services/
│   │   └── GoogleImagesService.js # Image API integration
│   ├── server.js                # Express server setup
│   ├── package.json
│   └── .env                     # Environment variables
├── frontend/
│   ├── public/                  # Static assets, favicon, manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   ├── Footer.js        # Site footer
│   │   │   ├── PlantCard.js     # Individual plant display
│   │   │   ├── SearchAndFilter.js # Search and filter UI
│   │   │   ├── LoadingSpinner.js # Loading component
│   │   │   ├── ErrorMessage.js  # Error display
│   │   │   └── Cart.js          # Shopping cart
│   │   ├── pages/
│   │   │   ├── Home.js          # Main catalog page
│   │   │   ├── AddPlant.js      # Add plant form
│   │   │   ├── PlantDetail.js   # Plant details view
│   │   │   ├── Checkout.js      # Checkout process
│   │   │   └── OrderSuccess.js  # Order confirmation
│   │   ├── context/
│   │   │   └── CartContext.jsx  # Shopping cart state
│   │   ├── utils/
│   │   │   ├── api.js           # API integration
│   │   │   └── imageAPI.js      # Image utilities
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
│   └── package.json
├── .github/                     # GitHub configurations
├── README.md                    # Project documentation
├── start.ps1                    # Quick start script
├── DEPLOYMENT_GUIDE.md          # Comprehensive deployment guide
└── DEPLOYMENT_CHECKLIST.md     # Quick deployment checklist
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/plantstore
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration (Optional):**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## 🌐 API Endpoints

### Plants
- `GET /api/plants` - Get all plants with optional filters
- `GET /api/plants/:id` - Get single plant by ID
- `POST /api/plants` - Add new plant
- `PUT /api/plants/:id` - Update plant
- `DELETE /api/plants/:id` - Delete plant
- `GET /api/plants/meta/categories` - Get all categories

### Query Parameters for GET /api/plants
- `search` - Search by name, category, or description
- `category` - Filter by category
- `availability` - Filter by availability (true/false)
- `page` - Page number for pagination
- `limit` - Items per page
- `sortBy` - Sort field (createdAt, name, price)
- `sortOrder` - Sort order (asc, desc)

## 💾 Database Schema

### Plant Model
```javascript
{
  name: String (required, 2-100 characters),
  price: Number (required, >= 0),
  categories: [String] (required, enum values),
  availability: Boolean (default: true),
  description: String (max 500 characters),
  image: String (URL),
  care_instructions: String (max 300 characters),
  stock_quantity: Number (>= 0, default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Available Categories
- Indoor
- Outdoor
- Succulent
- Air Purifying
- Home Decor
- Low Light
- Pet Friendly
- Flowering
- Medicinal
- Hanging
- Large
- Small

## 🎨 Features Showcase

### Plant Catalog
- Grid layout with responsive design
- Beautiful plant cards with hover effects
- Category tags and availability badges
- Price display with Indian Rupee symbol

### Search & Filter
- Real-time search with debouncing
- Category dropdown with all available categories
- Availability filter
- Sorting options (date, name, price)
- Clear filters functionality

### Add Plant Form
- Comprehensive form with validation
- Category suggestions and custom category input
- Image preview functionality
- Character count for text fields
- Success/error notifications

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Flexible grid layouts

## � Deployment

This project is ready for production deployment! Choose from multiple deployment options:

### Quick Deployment (Recommended)
- **Frontend:** Vercel (Free tier)
- **Backend:** Railway (Free tier)
- **Database:** MongoDB Atlas (Free tier)

### Deployment Files
- 📋 **`DEPLOYMENT_CHECKLIST.md`** - Quick checklist for immediate deployment
- 📖 **`DEPLOYMENT_GUIDE.md`** - Comprehensive step-by-step deployment guide

### Environment Variables Required
```env
# Frontend
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_RAZORPAY_KEY=rzp_test_your_key

# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomcart
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://your-frontend-url.com
```

## �🔒 Security Features

- CORS protection
- Helmet for security headers
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- Error handling without exposing sensitive data

## 🚀 Performance Optimizations

- Database indexing for faster searches
- Pagination to limit data transfer
- Debounced search to reduce API calls
- Optimized images with fallback
- Lazy loading components

## 🧪 Testing

The application includes:
- Form validation
- Error boundary handling
- API error handling
- Responsive design testing

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🌟 Future Enhancements

- User authentication and authorization
- User profiles and order history
- Plant care reminders and notifications
- Reviews and ratings system
- Advanced filtering (price range, plant size, difficulty level)
- Plant care guides and tutorials
- Community features (plant sharing, forums)
- Real-time inventory management
- Multi-language support
- Mobile app development

## 👥 Contributing

This project was built as a comprehensive plant e-commerce solution. Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

**Developer:** TechBire  
**Email:** anshhtechnical@gmail.com  
**LinkedIn:** [https://www.linkedin.com/in/techbire/](https://www.linkedin.com/in/techbire/)

For any queries, suggestions, or collaboration opportunities, feel free to reach out!

## 🌟 Acknowledgments

- Thanks to all plant lovers who inspired this project
- Special thanks to the open-source community for amazing libraries and tools

---

**Built with ❤️ for plant lovers everywhere** 🌱  
*Transform your space with nature's beauty* 🏡
