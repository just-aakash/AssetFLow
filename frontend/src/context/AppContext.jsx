import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const INITIAL_ASSETS = [
  { id: '427-012', name: 'MacBook Pro M3', assignee: 'Maria Jones', dept: 'Engineering', status: 'Available', cost: '$2,499.00', condition: 'Excellent', days: 5 },
  { id: '426-001', name: 'Herman Miller Chair', assignee: 'Alex Chen', dept: 'Design', status: 'Allocated', cost: '$1,250.00', condition: 'Good', days: 14 },
  { id: '404-002', name: 'Dell UltraSharp 32"', assignee: 'Sarah Smith', dept: 'Marketing', status: 'Maintenance', cost: '$899.00', condition: 'Needs Repair', days: 2 },
  { id: '424-112', name: 'Sony A7IV Camera', assignee: 'John Doe', dept: 'Media', status: 'Allocated', cost: '$3,100.00', condition: 'Excellent', days: 16 },
  { id: '417-020', name: 'Conference Table', assignee: 'Unassigned', dept: 'Facilities', status: 'Available', cost: '$1,500.00', condition: 'Good', days: 19 },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null means not logged in
  const [assets, setAssets] = useState(INITIAL_ASSETS);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateAssetStatus = (id, newStatus) => {
    setAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, status: newStatus } : asset
    ));
  };

  return (
    <AppContext.Provider value={{ user, login, logout, assets, updateAssetStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
