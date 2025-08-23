# BloomCart - Complete Deployment Guide 🚀

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Node.js (v14 or higher)
- ✅ MongoDB Atlas account (for database)
- ✅ Git repository (GitHub/GitLab)
- ✅ Domain name (optional, for custom domain)

## 🏗️ Project Structure (Cleaned)

```
BloomCart/
├── backend/                 # Node.js Express API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── scripts/            # Database seeding
│   ├── services/           # External services
│   ├── validators/         # Input validation
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React.js application  
│   ├── build/              # Production build (auto-generated)
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   └── package.json        # Frontend dependencies
├── .github/                # GitHub configurations
├── README.md               # Project documentation
├── start.ps1               # Local development script
└── DEPLOYMENT_GUIDE.md     # This file
```

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

#### 🌐 Frontend Deployment (Vercel)

1. **Prepare Frontend Build**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Select the `frontend` folder as root directory
   - **Build Settings:**
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`

3. **Environment Variables (Vercel)**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   REACT_APP_RAZORPAY_KEY=your_razorpay_key
   ```

#### 🗄️ Backend Deployment (Railway)

1. **Deploy to Railway**
   - Visit [railway.app](https://railway.app)
   - Connect GitHub repository
   - Select `backend` folder
   - **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomcart
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=3000
   ```

2. **Configure Railway Settings**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

---

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### 🌐 Frontend Deployment (Netlify)

1. **Build and Deploy**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Netlify Configuration**
   - Drag & drop `build` folder to Netlify
   - Or connect GitHub repo with these settings:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/build`

3. **Environment Variables (Netlify)**
   ```
   REACT_APP_API_URL=https://your-app.herokuapp.com
   REACT_APP_RAZORPAY_KEY=your_razorpay_key
   ```

#### 🗄️ Backend Deployment (Heroku)

1. **Prepare for Heroku**
   ```bash
   cd backend
   # Create Procfile
   echo "web: node server.js" > Procfile
   ```

2. **Deploy to Heroku**
   ```bash
   # Install Heroku CLI first
   heroku create your-app-name
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="mongodb+srv://..."
   heroku config:set RAZORPAY_KEY_ID="your_key"
   heroku config:set RAZORPAY_KEY_SECRET="your_secret"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set FRONTEND_URL="https://your-netlify-app.netlify.app"
   
   git subtree push --prefix backend heroku main
   ```

---

### Option 3: Full-Stack Deployment (Single Platform)

#### 🔄 Render (Full-Stack)

1. **Backend Service**
   - Repository: Your GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Frontend Static Site**
   - Repository: Your GitHub repo  
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Database Configuration**
   ```javascript
   // Cluster Name: bloomcart-cluster
   // Database Name: bloomcart
   // Collections: plants, orders, users
   ```

3. **Seed Database**
   ```bash
   cd backend
   node scripts/seedData.js
   ```

4. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/bloomcart?retryWrites=true&w=majority
   ```

---

## 🔐 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_RAZORPAY_KEY=rzp_test_your_key_here
```

### Backend (.env)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomcart
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://your-frontend-url.com
PORT=3000
```

---

## 🧪 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All console.logs removed from production
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Input validation in place
- [ ] CORS configured properly

### ✅ Performance
- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Build size optimized
- [ ] Lazy loading implemented where needed

### ✅ Security
- [ ] Environment variables secured
- [ ] API keys not exposed in frontend
- [ ] Input sanitization implemented
- [ ] HTTPS enforced

### ✅ SEO & Accessibility
- [ ] Meta tags configured
- [ ] Favicon implemented
- [ ] Alt texts for images
- [ ] Semantic HTML structure

---

## 🔧 Custom Domain Setup

### Vercel Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

### Netlify Custom Domain  
1. Site Settings → Domain Management → Add Custom Domain
2. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

---

## 📱 PWA Configuration

Your app is already PWA-ready with:
- ✅ Web App Manifest (`manifest.json`)
- ✅ Service Worker (via Create React App)
- ✅ Offline functionality
- ✅ Install prompt support

---

## 🚨 Troubleshooting

### Common Issues

**1. Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**2. API Connection Issues**
- Check CORS configuration
- Verify environment variables
- Test API endpoints manually

**3. Database Connection**
- Whitelist IP addresses in MongoDB Atlas
- Verify connection string format
- Check network access settings

**4. Payment Gateway Issues**
- Verify Razorpay keys are correct
- Check webhook configurations
- Test in sandbox mode first

---

## 📊 Monitoring & Analytics

### Recommended Tools
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics 4
- **Performance:** Web Vitals
- **Uptime:** UptimeRobot

---

## 🎯 Post-Deployment Steps

1. **Test All Features**
   - [ ] Plant browsing and filtering
   - [ ] Add to cart functionality
   - [ ] Checkout process
   - [ ] Payment integration
   - [ ] Admin features
   - [ ] Responsive design

2. **SEO Optimization**
   - [ ] Submit sitemap to Google Search Console
   - [ ] Verify structured data
   - [ ] Check page load speeds
   - [ ] Optimize Core Web Vitals

3. **Security Hardening**
   - [ ] Enable HTTPS redirect
   - [ ] Configure CSP headers
   - [ ] Set up security monitoring
   - [ ] Regular dependency updates

---

## 🎉 Congratulations!

Your BloomCart application is now live! 🌱

**Quick Links:**
- Frontend: `https://your-frontend-url.com`
- Backend API: `https://your-backend-url.com`
- Database: MongoDB Atlas Dashboard

---

## 📞 Support & Maintenance

### Regular Tasks
- Monitor application performance
- Update dependencies monthly
- Backup database regularly  
- Review and rotate API keys
- Update plant inventory

### Contact Information
- **Developer:** Ansh Gupta (TechBire)
- **Email:** anshhtechnical@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/techbire/

---

*Happy Growing! 🌿*
