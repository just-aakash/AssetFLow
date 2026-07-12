import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertTriangle, Clock, CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context/AppContext';

function KpiCard({ label, value, sub, color = 'text-foreground' }) {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-black/40 transition-all">
      <div className="text-sm text-white/50 font-medium mb-1.5">{label}</div>
      <div className={`text-4xl font-semibold tracking-tight ${color}`}>{value}</div>
      {sub && <div className="text-xs text-white/40 mt-2">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, assets, allocations, maintenance, bookings, notifications } = useAppContext();

  const kpis = useMemo(() => ({
    available: assets.filter(a => a.status === 'Available').length,
    allocated: assets.filter(a => a.status === 'Allocated').length,
    underMaintenance: assets.filter(a => a.status === 'Under Maintenance').length,
    activeBookings: bookings.filter(b => b.status === 'Upcoming').length,
    pendingTransfers: allocations.filter(a => a.status === 'Overdue').length,
    upcomingReturns: allocations.filter(a => a.status === 'Active').length,
  }), [assets, allocations, bookings]);

  const overdueAllocations = allocations.filter(a => a.status === 'Overdue');
  const recentActivity = notifications.slice(0, 6);

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Today's Overview</h1>
          <p className="text-sm text-white/50 mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Available" value={kpis.available} color="text-primary" />
        <KpiCard label="Allocated" value={kpis.allocated} color="text-blue-400" />
        <KpiCard label="Maintenance" value={kpis.underMaintenance} color="text-yellow-400" />
        <KpiCard label="Active Bookings" value={kpis.activeBookings} color="text-purple-400" />
        <KpiCard label="Pending Transfers" value={kpis.pendingTransfers} color="text-orange-400" />
        <KpiCard label="Active Returns" value={kpis.upcomingReturns} color="text-foreground" />
      </div>

      {/* Overdue Banner */}
      {overdueAllocations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-red-950/40 backdrop-blur-md border border-red-500/30 rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(220,38,38,0.15)]"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-sm text-red-300">
              {overdueAllocations.length} asset{overdueAllocations.length > 1 ? 's' : ''} overdue for return —{' '}
              <span className="font-medium">{overdueAllocations.map(a => a.assetName).join(', ')}</span>. Flagged for follow-up.
            </span>
          </div>
          <button
            onClick={() => navigate('/allocation')}
            className="text-xs text-red-400 hover:text-red-300 underline shrink-0 ml-4"
          >
            View
          </button>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => navigate('/assets')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(161,246,94,0.3)]"
        >
          <Plus className="w-4 h-4" /> Register Asset
        </button>
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-2 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all shadow-lg"
        >
          <Package className="w-4 h-4" /> Book Resource
        </button>
        <button
          onClick={() => navigate('/maintenance')}
          className="flex items-center gap-2 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all shadow-lg"
        >
          <ArrowRight className="w-4 h-4" /> Raise Request
        </button>
      </div>

      {/* Bottom Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-medium">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border/50">
            {recentActivity.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 px-4 py-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.read ? 'bg-border' : 'bg-primary'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed">{notif.message}</p>
                </div>
                <span className="text-[10px] text-muted shrink-0">{notif.time}</span>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-border">
            <button onClick={() => navigate('/notifications')} className="text-xs text-primary hover:underline">
              View all activity →
            </button>
          </div>
        </div>

        {/* Asset Status Summary */}
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-medium">Asset Status Summary</h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: 'Available', count: kpis.available, color: 'bg-primary', pct: Math.round(kpis.available / assets.length * 100) },
              { label: 'Allocated', count: kpis.allocated, color: 'bg-blue-500', pct: Math.round(kpis.allocated / assets.length * 100) },
              { label: 'Under Maintenance', count: kpis.underMaintenance, color: 'bg-yellow-500', pct: Math.round(kpis.underMaintenance / assets.length * 100) },
              { label: 'Other', count: assets.length - kpis.available - kpis.allocated - kpis.underMaintenance, color: 'bg-border', pct: Math.round((assets.length - kpis.available - kpis.allocated - kpis.underMaintenance) / assets.length * 100) },
            ].map(({ label, count, color, pct }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{label}</span>
                  <span className="text-foreground font-medium">{count} ({pct}%)</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-border">
            <button onClick={() => navigate('/reports')} className="text-xs text-primary hover:underline">
              View full reports →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
