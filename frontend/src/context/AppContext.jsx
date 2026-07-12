import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// ─── Mock Data ───────────────────────────────────────────────
const INITIAL_ASSETS = [
  { id: 'AF-1001', name: 'Dell Laptop', category: 'Electronics', status: 'Allocated', location: 'HQ Floor 2', condition: 'Good', cost: 1200, acquisitionDate: '2023-01-10', serialNo: 'DL-88291', assignee: 'Priya Shah', dept: 'Engineering' },
  { id: 'AF-1002', name: 'Herman Miller Chair', category: 'Furniture', status: 'Available', location: 'HQ Floor 1', condition: 'Excellent', cost: 950, acquisitionDate: '2023-03-05', serialNo: 'HM-22901', assignee: null, dept: null },
  { id: 'AF-1003', name: 'Projector BenQ W2700', category: 'Electronics', status: 'Available', location: 'Conference Room A', condition: 'Good', cost: 800, acquisitionDate: '2022-11-20', serialNo: 'BQ-55123', assignee: null, dept: null, isBookable: true },
  { id: 'AF-1004', name: 'Toyota HiAce Van', category: 'Vehicles', status: 'Under Maintenance', location: 'Parking Lot B', condition: 'Needs Repair', cost: 32000, acquisitionDate: '2021-06-15', serialNo: 'TY-VAN-001', assignee: null, dept: 'Operations' },
  { id: 'AF-1005', name: 'iPhone 15 Pro', category: 'Electronics', status: 'Allocated', location: 'HQ Floor 3', condition: 'Excellent', cost: 1100, acquisitionDate: '2024-01-01', serialNo: 'IP-15-009', assignee: 'Alex Chen', dept: 'Design' },
  { id: 'AF-1006', name: 'Standing Desk', category: 'Furniture', status: 'Available', location: 'HQ Floor 2', condition: 'Good', cost: 600, acquisitionDate: '2023-05-12', serialNo: 'SD-44321', assignee: null, dept: null },
  { id: 'AF-1007', name: 'MacBook Pro M3', category: 'Electronics', status: 'Allocated', location: 'Remote', condition: 'Excellent', cost: 2499, acquisitionDate: '2024-02-15', serialNo: 'MB-M3-007', assignee: 'Maria Jones', dept: 'Marketing' },
  { id: 'AF-1008', name: 'Conference Table', category: 'Furniture', status: 'Available', location: 'Board Room', condition: 'Good', cost: 1500, acquisitionDate: '2022-08-01', serialNo: 'CT-BR-001', assignee: null, dept: null, isBookable: true },
  { id: 'AF-1009', name: 'Canon EOS R5', category: 'Electronics', status: 'Retired', location: 'Storage', condition: 'Worn Out', cost: 3000, acquisitionDate: '2020-01-01', serialNo: 'CN-R5-021', assignee: null, dept: null },
  { id: 'AF-1010', name: 'Fire Extinguisher', category: 'Safety', status: 'Available', location: 'HQ Floor 1', condition: 'Good', cost: 80, acquisitionDate: '2023-12-01', serialNo: 'FE-HQ-001', assignee: null, dept: null },
];

const INITIAL_DEPARTMENTS = [
  { id: 'D1', name: 'Engineering', head: 'Ravi Kumar', status: 'Active', employeeCount: 24 },
  { id: 'D2', name: 'Design', head: 'Priya Shah', status: 'Active', employeeCount: 8 },
  { id: 'D3', name: 'Marketing', head: 'Sarah Smith', status: 'Active', employeeCount: 12 },
  { id: 'D4', name: 'Operations', head: 'James Lee', status: 'Active', employeeCount: 30 },
  { id: 'D5', name: 'Human Resources', head: 'Anna Brown', status: 'Active', employeeCount: 5 },
];

const INITIAL_CATEGORIES = [
  { id: 'C1', name: 'Electronics', description: 'Laptops, phones, projectors, cameras', assetCount: 5, warrantyYears: 2 },
  { id: 'C2', name: 'Furniture', description: 'Chairs, desks, tables', assetCount: 4, warrantyYears: 5 },
  { id: 'C3', name: 'Vehicles', description: 'Company cars and vans', assetCount: 1, warrantyYears: 3 },
  { id: 'C4', name: 'Safety', description: 'Safety equipment', assetCount: 1, warrantyYears: 1 },
];

const INITIAL_EMPLOYEES = [
  { id: 'E1', name: 'Priya Shah', email: 'priya@company.com', dept: 'Design', role: 'Department Head', status: 'Active' },
  { id: 'E2', name: 'Alex Chen', email: 'alex@company.com', dept: 'Design', role: 'Employee', status: 'Active' },
  { id: 'E3', name: 'Maria Jones', email: 'maria@company.com', dept: 'Marketing', role: 'Asset Manager', status: 'Active' },
  { id: 'E4', name: 'Ravi Kumar', email: 'ravi@company.com', dept: 'Engineering', role: 'Department Head', status: 'Active' },
  { id: 'E5', name: 'James Lee', email: 'james@company.com', dept: 'Operations', role: 'Employee', status: 'Active' },
  { id: 'E6', name: 'Anna Brown', email: 'anna@company.com', dept: 'Human Resources', role: 'Admin', status: 'Active' },
];

const INITIAL_ALLOCATIONS = [
  { id: 'AL-001', assetId: 'AF-1001', assetName: 'Dell Laptop', employee: 'Priya Shah', dept: 'Engineering', allocatedDate: '2024-03-01', expectedReturn: '2024-06-01', status: 'Active' },
  { id: 'AL-002', assetId: 'AF-1005', assetName: 'iPhone 15 Pro', employee: 'Alex Chen', dept: 'Design', allocatedDate: '2024-04-15', expectedReturn: '2024-10-15', status: 'Active' },
  { id: 'AL-003', assetId: 'AF-1007', assetName: 'MacBook Pro M3', employee: 'Maria Jones', dept: 'Marketing', allocatedDate: '2024-02-15', expectedReturn: '2024-05-15', status: 'Overdue' },
  { id: 'AL-004', assetId: 'AF-0009', assetName: 'HP Monitor', employee: 'James Lee', dept: 'Operations', allocatedDate: '2023-10-01', expectedReturn: '2024-01-01', status: 'Returned' },
];

const INITIAL_BOOKINGS = [
  { id: 'BK-001', assetId: 'AF-1003', assetName: 'Projector BenQ W2700', bookedBy: 'Priya Shah', date: '2024-07-15', startTime: '10:00', endTime: '12:00', purpose: 'Team Presentation', status: 'Upcoming' },
  { id: 'BK-002', assetId: 'AF-1008', assetName: 'Conference Table', bookedBy: 'Ravi Kumar', date: '2024-07-15', startTime: '14:00', endTime: '16:00', purpose: 'Strategy Meeting', status: 'Upcoming' },
  { id: 'BK-003', assetId: 'AF-1003', assetName: 'Projector BenQ W2700', bookedBy: 'Alex Chen', date: '2024-07-13', startTime: '09:00', endTime: '11:00', purpose: 'Design Review', status: 'Completed' },
];

const INITIAL_MAINTENANCE = [
  { id: 'MR-001', assetId: 'AF-1004', assetName: 'Toyota HiAce Van', issue: 'Engine overheating, oil leak detected', priority: 'High', raisedBy: 'James Lee', status: 'In Progress', technician: 'AutoCare Workshop', raisedDate: '2024-07-01', notes: '' },
  { id: 'MR-002', assetId: 'AF-1001', assetName: 'Dell Laptop', issue: 'Battery drains in 2 hours, needs replacement', priority: 'Medium', raisedBy: 'Priya Shah', status: 'Pending', technician: null, raisedDate: '2024-07-10', notes: '' },
  { id: 'MR-003', assetId: 'AF-1003', assetName: 'Projector BenQ W2700', issue: 'Lamp flickering intermittently', priority: 'Low', raisedBy: 'Ravi Kumar', status: 'Approved', technician: 'IT Support', raisedDate: '2024-07-08', notes: '' },
  { id: 'MR-004', assetId: 'AF-0020', assetName: 'Printer HP LaserJet', issue: 'Paper jam and print quality issue', priority: 'Medium', raisedBy: 'Anna Brown', status: 'Resolved', technician: 'IT Support', raisedDate: '2024-06-28', notes: 'Roller replaced, working fine' },
];

const INITIAL_AUDITS = [
  {
    id: 'AU-001', name: 'Q2 2024 Electronics Audit', category: 'Electronics', status: 'In Progress',
    createdDate: '2024-07-01', closingDate: '2024-07-31', createdBy: 'Anna Brown',
    auditors: ['Priya Shah', 'Alex Chen'],
    items: [
      { assetId: 'AF-1001', assetName: 'Dell Laptop', expectedLocation: 'HQ Floor 2', verificationStatus: 'Verified', notes: '' },
      { assetId: 'AF-1005', assetName: 'iPhone 15 Pro', expectedLocation: 'HQ Floor 3', verificationStatus: 'Verified', notes: '' },
      { assetId: 'AF-1007', assetName: 'MacBook Pro M3', expectedLocation: 'HQ Floor 2', verificationStatus: 'Missing', notes: 'Employee is remote' },
      { assetId: 'AF-1003', assetName: 'Projector BenQ W2700', expectedLocation: 'Conference Room A', verificationStatus: 'Pending', notes: '' },
      { assetId: 'AF-1009', assetName: 'Canon EOS R5', expectedLocation: 'Storage', verificationStatus: 'Damaged', notes: 'Lens cracked' },
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'N1', type: 'Allocation', message: 'Laptop AF-1001 allocated to Priya Shah – Engineering', time: '2 min ago', read: false },
  { id: 'N2', type: 'Maintenance', message: 'Maintenance MR-0003 approved for Projector BenQ W2700', time: '18 min ago', read: false },
  { id: 'N3', type: 'Booking', message: 'Booking confirmed – B10 booked 13:00 to 14:00 PM', time: '45 min ago', read: true },
  { id: 'N4', type: 'Overdue', message: 'Transfer approved – AF-0055 for facilities dept', time: '2 hrs ago', read: true },
  { id: 'N5', type: 'Return', message: 'Overdue return – AF-0021 due 5 days ago', time: '3 hrs ago', read: true },
  { id: 'N6', type: 'Audit', message: 'Audit discrepancy – AF-0055 damaged', time: '4d ago', read: true },
  { id: 'N7', type: 'Booking', message: 'Booking reminder – Conference Room in 30 mins', time: '5d ago', read: true },
];

// ─── Provider ────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [allocations, setAllocations] = useState(INITIAL_ALLOCATIONS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [maintenance, setMaintenance] = useState(INITIAL_MAINTENANCE);
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const updateProfile = (updates) => setUser(prev => ({ ...prev, ...updates }));

  // Asset actions
  const updateAssetStatus = (id, newStatus) =>
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));

  const addAsset = (asset) =>
    setAssets(prev => [...prev, { ...asset, id: `AF-${1000 + prev.length + 1}` }]);

  // Allocation actions
  const allocateAsset = (assetId, employee, dept, expectedReturn) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;
    const newAlloc = {
      id: `AL-${String(allocations.length + 1).padStart(3, '0')}`,
      assetId, assetName: asset.name, employee, dept,
      allocatedDate: new Date().toISOString().split('T')[0],
      expectedReturn, status: 'Active'
    };
    setAllocations(prev => [...prev, newAlloc]);
    updateAssetStatus(assetId, 'Allocated');
    addNotification('Allocation', `${asset.name} allocated to ${employee}`);
  };

  const returnAsset = (allocationId) => {
    const alloc = allocations.find(a => a.id === allocationId);
    if (!alloc) return;
    setAllocations(prev => prev.map(a => a.id === allocationId ? { ...a, status: 'Returned' } : a));
    updateAssetStatus(alloc.assetId, 'Available');
    addNotification('Return', `${alloc.assetName} returned by ${alloc.employee}`);
  };

  // Booking actions
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `BK-${String(bookings.length + 1).padStart(3, '0')}`,
      status: 'Upcoming'
    };
    setBookings(prev => [...prev, newBooking]);
    addNotification('Booking', `Booking confirmed for ${booking.assetName}`);
  };

  const cancelBooking = (id) =>
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));

  // Maintenance actions
  const addMaintenanceRequest = (req) => {
    const asset = assets.find(a => a.id === req.assetId);
    const newReq = {
      ...req,
      id: `MR-${String(maintenance.length + 1).padStart(3, '0')}`,
      status: 'Pending',
      raisedDate: new Date().toISOString().split('T')[0],
      assetName: asset?.name || req.assetId
    };
    setMaintenance(prev => [...prev, newReq]);
    updateAssetStatus(req.assetId, 'Under Maintenance');
    addNotification('Maintenance', `Maintenance raised for ${newReq.assetName}`);
  };

  const updateMaintenanceStatus = (id, status, technician) => {
    setMaintenance(prev => prev.map(m => m.id === id ? { ...m, status, ...(technician ? { technician } : {}) } : m));
    if (status === 'Resolved') {
      const req = maintenance.find(m => m.id === id);
      if (req) updateAssetStatus(req.assetId, 'Available');
      addNotification('Maintenance', `Maintenance ${id} resolved`);
    }
  };

  // Audit actions
  const updateAuditItem = (auditId, assetId, verificationStatus, notes) => {
    setAudits(prev => prev.map(a => {
      if (a.id !== auditId) return a;
      return {
        ...a,
        items: a.items.map(item =>
          item.assetId === assetId ? { ...item, verificationStatus, notes } : item
        )
      };
    }));
  };

  const closeAudit = (auditId) => {
    setAudits(prev => prev.map(a => a.id === auditId ? { ...a, status: 'Closed' } : a));
    addNotification('Audit', `Audit ${auditId} closed`);
  };

  // Notification actions
  const addNotification = (type, message) => {
    setNotifications(prev => [{
      id: `N${Date.now()}`, type, message, time: 'just now', read: false
    }, ...prev]);
  };

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // Departments
  const addDepartment = (dept) =>
    setDepartments(prev => [...prev, { ...dept, id: `D${prev.length + 1}`, employeeCount: 0 }]);

  // Categories
  const addCategory = (cat) =>
    setCategories(prev => [...prev, { ...cat, id: `C${prev.length + 1}`, assetCount: 0 }]);

  // Employees
  const addEmployee = (emp) =>
    setEmployees(prev => [...prev, { ...emp, id: `E${prev.length + 1}`, status: 'Active' }]);

  const updateEmployeeRole = (id, role) =>
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, role } : e));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user, login, logout, updateProfile,
      assets, addAsset, updateAssetStatus,
      departments, addDepartment,
      categories, addCategory,
      employees, addEmployee, updateEmployeeRole,
      allocations, allocateAsset, returnAsset,
      bookings, addBooking, cancelBooking,
      maintenance, addMaintenanceRequest, updateMaintenanceStatus,
      audits, updateAuditItem, closeAudit,
      notifications, addNotification, markAllRead, unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
