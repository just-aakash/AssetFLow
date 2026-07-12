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

# Setup & Integration Instructions

This repository currently contains the **Frontend** application for AssetFlow, built with React, Vite, TailwindCSS v4, and modern design practices.

## Running the Frontend Locally

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
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

## Integrating with the Backend

The frontend is designed to be completely decoupled from the backend. Currently, it uses mock data to demonstrate the UI (e.g., in `Dashboard.jsx`). To integrate with the backend team's API:

### 1. Environment Variables
Create a `.env` file in the `frontend/` directory and define the backend API base URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. API Service Configuration
In `frontend/src/services/api.js` (to be created by the integration team), configure Axios to use this base URL:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
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
Replace the static `MOCK_ASSETS` arrays with TanStack Query hooks fetching from the API:

```javascript
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await api.get('/assets');
      return response.data;
    }
  });
}
```
Then use `const { data: assets, isLoading } = useAssets();` in your components.

---

## Tech Stack

### frontend: 
| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React.js (Vite)  | Frontend Framework      |
| Tailwind CSS v4  | UI Styling              |
| React Router DOM | Routing                 |
| React Hook Form  | Form Handling           |
| Zod              | Form Validation         |
| Axios            | API Requests            |
| TanStack Query   | Server State Management |
| Framer Motion    | Animations              |
| Recharts         | Dashboard Analytics     |
| React Hot Toast  | Notifications           |
| React Icons/Lucide| Icons                   |
