import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function Notifications() {
  const { notifications, markAllRead } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Alerts', 'Approvals', 'Bookings'];

  const filtered = notifications.filter(n => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Alerts') return n.type === 'Overdue' || n.type === 'Audit';
    if (activeTab === 'Approvals') return n.type === 'Allocation' || n.type === 'Maintenance' || n.type === 'Return';
    if (activeTab === 'Bookings') return n.type === 'Booking';
    return true;
  });

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Activity logs & Notifications</h1>
        </div>
        <button 
          onClick={markAllRead}
          className="text-xs text-primary hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-[#10141a] border border-border rounded-xl w-fit mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab ? 'bg-primary text-black' : 'text-muted hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filtered.map(notif => (
            <div key={notif.id} className="flex gap-4 p-2 hover:bg-card-hover rounded-lg transition-colors">
              <div className="mt-1.5 shrink-0">
                {notif.read ? (
                  <div className="w-2 h-2 rounded-full border border-muted bg-transparent" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(161,246,94,0.5)]" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">{notif.message}</div>
              </div>
              <div className="text-xs text-muted shrink-0 w-16 text-right">
                {notif.time}
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="text-center text-muted py-8 text-sm">
              No activities found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
