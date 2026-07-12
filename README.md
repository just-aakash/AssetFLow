# AssetFlow

## Enterprise Asset & Resource Management System

## Overall Vision
AssetFlow is a centralized ERP platform that helps organizations digitize the management of physical assets and shared resources.

It is designed for:
* Offices
* Schools
* Hospitals
* Factories
* Government agencies
* Any organization managing equipment, furniture, vehicles, or shared spaces.

The platform aims to:
* Eliminate spreadsheet/paper-based tracking
* Track complete asset lifecycles
* Manage shared resource bookings
* Provide real-time asset visibility
* Use clean ERP architecture with scalable modules
* Exclude purchasing, invoicing, and accounting functionality

---

# Project Structure

This repository is structured as a monorepo containing both the backend service and the frontend web application:

```
AssetFlow/
├── backend/      # Express API server with MongoDB/Mongoose
└── frontend/     # React frontend with Vite & TailwindCSS
```

---

# Setup & Integration Instructions

## Running the Backend Locally

The backend is built with Node.js, Express, and MongoDB.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally or a MongoDB Atlas connection string
- npm or yarn

### Steps to Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```
   Provide your MongoDB URI and desired Port:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/assetflow
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server (runs with nodemon):
   ```bash
   npm run dev
   ```

---

## Running the Frontend Locally

The frontend is built with React, Vite, TailwindCSS v4, and modern design practices.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps to Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the `frontend/` directory (see [Integrating with the Backend](#integrating-with-the-backend) below).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

## Integrating with the Backend

Currently, the frontend uses mock data to demonstrate the UI (e.g., in `Dashboard.jsx`). To integrate with the backend API:

### 1. Environment Variables
Create a `.env` file in the `frontend/` directory and define the backend API base URL:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 2. API Service Configuration
In `frontend/src/services/api.js`, configure Axios to use this base URL:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptors for Authentication tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3. Replacing Mock Data
Replace static data arrays with TanStack Query hooks fetching from the API:

```javascript
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await api.get('/api/assets');
      return response.data;
    }
  });
}
```
Then use `const { data: assets, isLoading } = useAssets();` in your components.

---

## Tech Stack

### Backend
| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Node.js & Express | API Framework              |
| MongoDB & Mongoose| Database & ODM             |
| JSON Web Token    | Authentication & Security  |
| bcryptjs          | Password Hashing           |
| Express Validator | Request Validation         |
| Helmet & CORS     | Security & Header Policies |
| Morgan            | HTTP Request Logging       |
| Nodemon           | Development Utility        |

### Frontend
| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| React.js (Vite)   | Frontend Framework      |
| Tailwind CSS v4   | UI Styling              |
| React Router DOM  | Routing                 |
| React Hook Form   | Form Handling           |
| Zod               | Form Validation         |
| Axios             | API Requests            |
| TanStack Query    | Server State Management |
| Framer Motion     | Animations              |
| Recharts          | Dashboard Analytics     |
| React Hot Toast   | Notifications           |
| Lucide React      | Icons                   |
