import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#060a06] flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Dark background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/mossy_forest_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/70" />

      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
