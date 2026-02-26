import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import BrandDashboard from './pages/BrandDashboard';
import InfluencerDashboard from './pages/InfluencerDashboard';

import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, token, loading } = useAuth();

  if (loading) return null; // Or a subtle spinner

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Root router that decides where to send you based on Role
const RootRouter = () => {
  const { user, token, loading } = useAuth();
  
  if (loading) return null;
  
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === 'brand') {
    return <BrandDashboard />;
  } else {
    return <InfluencerDashboard />;
  }
}

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.99 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ width: '100%', height: '100%', display: 'flex', flexGrow: 1 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        
        {/* Semi-Protected Onboarding */}
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />

        {/* Protected Dashboards */}
        <Route 
          path="/dashboard" 
          element={<PageTransition><RootRouter /></PageTransition>} 
        />
        <Route 
          path="/brand" 
          element={
            <ProtectedRoute allowedRole="brand">
              <PageTransition><BrandDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/influencer" 
          element={
            <ProtectedRoute allowedRole="influencer">
              <PageTransition><InfluencerDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
