import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Calendar, Wrench, FileText, Bell, Search, Settings, LogOut } from 'lucide-react';
import { cn } from '@/components/common/Button';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function AppLayout() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Assets', path: '/assets', icon: Package },
    { label: 'Bookings', path: '/bookings', icon: Calendar },
    { label: 'Maintenance', path: '/maintenance', icon: Wrench },
    { label: 'Reports', path: '/reports', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-[1400px] h-[94vh] bg-[#10141a] rounded-[2.5rem] border border-border shadow-2xl flex flex-col overflow-hidden">

        {/* Top Nav */}
        <header className="h-18 px-8 py-4 flex items-center justify-between border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-bold text-lg shadow-[0_0_10px_rgba(161,246,94,0.4)]">
              A
            </div>
            <span className="text-lg font-semibold tracking-wide">AssetFlow</span>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5 bg-[#181d24] p-1.5 rounded-full border border-border/50">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    isActive
                      ? 'bg-primary text-black shadow-[0_0_12px_rgba(161,246,94,0.3)]'
                      : 'text-muted hover:text-foreground hover:bg-white/5'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
            </button>

            {user && (
              <div className="flex items-center gap-2 ml-1">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-green-300 p-0.5 cursor-pointer">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.email}`}
                    alt={user.name}
                    className="w-full h-full rounded-full border-2 border-[#10141a] object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="text-xs font-medium leading-tight">{user.name}</div>
                  <div className="text-[10px] text-muted">{user.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-red-400 transition-colors ml-1"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
