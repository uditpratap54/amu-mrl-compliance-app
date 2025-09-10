# AMU MRL Compliance Management System

A comprehensive web application for managing Antimicrobial Usage (AMU) and Maximum Residue Limits (MRL) compliance in agriculture and livestock management.

## 🌟 Features

- **Farmer Management**: Register and manage farmer profiles
- **Livestock Inventory**: Track animals with unique tags and detailed information
- **Medicine Logging**: Record veterinary medicines with regulatory compliance
- **AMU Event Tracking**: Log antimicrobial usage events with detailed records
- **Compliance Reports**: Generate regulatory compliance reports
- **AI Chatbot**: Get assistance with regulatory queries
- **Gamification**: Engagement features for better compliance
- **Multi-language Support**: English and Hindi language options

## 🚀 Live Demo

Visit the live website: [https://uditpratap54.github.io/amu-mrl-compliance-app/](https://uditpratap54.github.io/amu-mrl-compliance-app/)

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Charts and data visualization
- **i18next** - Internationalization
- **Formik + Yup** - Form handling and validation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🔧 Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/uditpratap54/amu-mrl-compliance-app.git
cd amu-mrl-compliance-app
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables:
```bash
# In server directory
cp .env.example .env
# Edit .env with your configuration
```

5. Start MongoDB and seed the database:
```bash
cd server
node seed/seedFarmers.js
node seed/seedMedicines.js
node seed/seedLivestock.js
node seed/seedAMUEvents.js
node seed/seedComplianceLogs.js
```

6. Start the development servers:

Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm run dev
```

7. Open your browser and visit:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`
- API Documentation: `http://localhost:5001/api/docs`

## 📦 Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch using GitHub Actions.

### Manual Deployment

To build for production:

```bash
cd client
npm run build
```

The built files will be in the `client/dist` directory.

## 🔐 Authentication

The application includes role-based authentication with the following roles:
- **Admin**: Full system access
- **Veterinarian**: Manage medical records and compliance
- **Farmer**: Manage livestock and view reports
- **Auditor**: View compliance reports and audit trails

## 📊 API Documentation

API documentation is available at `/api/docs` when the backend server is running.

### Main API Endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/farmer` - Get farmers list
- `POST /api/farmer` - Create new farmer
- `GET /api/livestock` - Get livestock inventory
- `POST /api/livestock` - Add new livestock
- `GET /api/medicine` - Get medicines list
- `POST /api/medicine` - Add new medicine
- `POST /api/amuLog` - Log AMU events
- `GET /api/reports` - Generate compliance reports

## 🌍 Internationalization

The application supports multiple languages:
- English (en)
- Hindi (hi) - हिन्दी

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

Run tests:
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Commit your changes
6. Push to your fork
7. Create a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for agricultural compliance management
- Focused on user experience and regulatory requirements
