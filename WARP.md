# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AMU MRL Compliance Management System - A comprehensive web application for managing Antimicrobial Usage (AMU) and Maximum Residue Limits (MRL) compliance in agriculture and livestock management.

**Architecture**: Full-stack MERN application with separate client/server directories
**Live Demo**: https://uditpratap54.github.io/amu-mrl-compliance-app/

## Development Commands

### Frontend (React + Vite)
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### Backend (Node.js + Express)
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start development server (runs on http://localhost:5001)
npm run dev

# Start production server
npm start

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Seed database with sample data
npm run seed

# Linting
npm run lint
npm run lint:fix
```

### Full Application Setup
```bash
# 1. Clone and setup dependencies
git clone https://github.com/uditpratap54/amu-mrl-compliance-app.git
cd amu-mrl-compliance-app

# 2. Backend setup
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB connection

# 3. Frontend setup
cd ../client
npm install

# 4. Seed database (optional)
cd ../server
node seed/seedFarmers.js
node seed/seedMedicines.js
node seed/seedLivestock.js
node seed/seedAMUEvents.js
node seed/seedComplianceLogs.js

# 5. Start both servers
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend  
cd client && npm run dev
```

## Architecture Overview

### Frontend (`/client`)
- **Framework**: React 18 with Vite build tool
- **Routing**: React Router with HashRouter (configured for GitHub Pages)
- **State Management**: Context API (`UserContext`)
- **Internationalization**: i18next (English/Hindi support)
- **Form Handling**: Formik + Yup validation
- **API Client**: Axios with centralized service layer
- **Charts**: Recharts for data visualization

**Key Directories**:
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components  
- `src/services/` - API service layer and data sync
- `src/utils/` - Utilities and context providers
- `src/i18n/` - Internationalization configuration

### Backend (`/server`)
- **Framework**: Express.js with Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based (with middleware)
- **API Documentation**: Swagger/OpenAPI (`/api/docs`)
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Celebrate (Joi-based) middleware

**Key Directories**:
- `controllers/` - Request handlers for each resource
- `models/` - Mongoose schemas (Farmer, Livestock, Medicine, AMUEvent, ComplianceLog)
- `routes/` - Express route definitions
- `middleware/` - Authentication, error handling, validation
- `seed/` - Database seeding scripts

### Core Features
1. **Role-based Access Control**: Admin, Veterinarian, Farmer, Auditor roles
2. **Multi-language Support**: English and Hindi localization
3. **Compliance Tracking**: AMU events, medicine logging, regulatory reports
4. **Data Visualization**: Charts for compliance metrics and trends
5. **AI Chatbot**: Regulatory query assistance
6. **Gamification**: User engagement features

## Deployment

### GitHub Pages (Frontend)
- **Automated**: GitHub Actions workflow (`.github/workflows/deploy.yml`)
- **Manual**: Run `npm run deploy` from client directory
- **SPA Routing**: Uses HashRouter and 404.html for client-side routing

### Backend Deployment Options
- **Railway**: Configured with `railway.json`
- **Vercel**: Configured with `vercel.json`
- **Local/VPS**: Standard Node.js deployment

## Important Implementation Details

### React Router Configuration
- Uses `HashRouter` instead of `BrowserRouter` for GitHub Pages compatibility
- Protected routes with role-based guards (`UserRoleGuard`)
- Context-based authentication state management

### API Proxy Configuration
- Development proxy configured in `vite.config.js` (`/api` → `http://localhost:5001`)
- Production API calls should target deployed backend URL

### Database Seeding
- Separate seed files for each collection in `/server/seed/`
- Run seeds individually or use `npm run seed` for all

### Environment Variables
- Frontend: Vite environment variables (prefixed with `VITE_`)
- Backend: Standard Node.js environment variables
- Sample: `.env.example` provided in server directory

## Testing

### Backend Tests
```bash
cd server
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Current Test Setup
- Framework: Jest with Supertest for API testing
- Location: Test files should be in `__tests__` or `*.test.js` pattern

## Common Development Tasks

### Adding New API Endpoints
1. Create controller in `server/controllers/`
2. Define route in `server/routes/`
3. Add validation middleware if needed
4. Update OpenAPI spec in `server/openapi.yaml`
5. Add client service method in `client/src/services/api.js`

### Adding New React Components
1. Create component in appropriate directory (`components/` or `pages/`)
2. Add to routing in `App.jsx` if it's a page
3. Add translations if using i18n
4. Follow existing patterns for error handling and loading states

### Database Schema Changes
1. Update Mongoose model in `server/models/`
2. Create/update seed data if needed
3. Consider migration scripts for existing data

## Troubleshooting

### Common Issues
- **GitHub Pages showing only navbar**: Ensure HashRouter is used and build is properly configured
- **API calls failing in production**: Check CORS settings and API base URLs
- **MongoDB connection issues**: Verify connection string and network access
- **Build warnings about chunk size**: Consider code splitting for large bundles
