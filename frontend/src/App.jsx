import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { AppProvider } from './context/AppContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Router>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#181d24', color: '#fff', border: '1px solid #2a313c' },
          }}
        />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
