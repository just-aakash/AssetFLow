import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Package, ArrowLeftRight,
  CalendarDays, Wrench, ClipboardCheck, BarChart2, Bell, LogOut
} from 'lucide-react';
import { cn } from '@/components/common/Button';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Organization Setup', path: '/organization', icon: Building2 },
  { label: 'Assets', path: '/assets', icon: Package },
  { label: 'Allocation & Transfer', path: '/allocation', icon: ArrowLeftRight },
  { label: 'Resource Booking', path: '/bookings', icon: CalendarDays },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench },
  { label: 'Audit', path: '/audit', icon: ClipboardCheck },
  { label: 'Reports', path: '/reports', icon: BarChart2 },
  { label: 'Notifications', path: '/notifications', icon: Bell },
];

export default function AppLayout() {
  const { user, logout, unreadCount } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ─── Left Sidebar ─── */}
      <aside className="w-52 shrink-0 bg-[#10141a] border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-14 px-4 flex items-center gap-2 border-b border-border">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-black font-bold text-sm shadow-[0_0_10px_rgba(161,246,94,0.3)]">
            A
          </div>
          <span className="font-semibold text-sm tracking-wide">AssetFlow</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 relative',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted hover:text-foreground hover:bg-white/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r" />
                  )}
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                  {path === '/notifications' && unreadCount > 0 && (
                    <span className="ml-auto bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border p-3">
          {user && (
            <div 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 mb-2 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <img
                src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                alt={user.name}
                className="w-7 h-7 rounded-full border border-border object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium truncate group-hover:text-primary transition-colors">{user.name}</div>
                <div className="text-[10px] text-muted truncate">{user.role}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="flex-1 overflow-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}
