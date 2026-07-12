import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const UTILIZATION_DATA = [
  { name: 'Eng', value: 85 },
  { name: 'Design', value: 65 },
  { name: 'Mktg', value: 45 },
  { name: 'Ops', value: 92 },
  { name: 'HR', value: 30 },
];

const MAINTENANCE_DATA = [
  { month: 'Jan', issues: 4 },
  { month: 'Feb', issues: 7 },
  { month: 'Mar', issues: 5 },
  { month: 'Apr', issues: 12 },
  { month: 'May', issues: 8 },
  { month: 'Jun', issues: 15 },
];

export default function Reports() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div>
        <h1 className="text-xl font-semibold">Reports & Analytics</h1>
        <p className="text-xs text-muted mt-0.5">(utilization, maintenance frequency, most-used/idle, booking heatmap)</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Utilization Chart */}
        <div className="bg-[#10141a] border border-border rounded-xl p-4">
          <h3 className="text-sm font-medium mb-4">Utilization by department</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILIZATION_DATA}>
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#181d24', border: '1px solid #2a313c' }} />
                <Bar dataKey="value" fill="#A1F65E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Chart */}
        <div className="bg-[#10141a] border border-border rounded-xl p-4">
          <h3 className="text-sm font-medium mb-4">Maintenance Frequency</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MAINTENANCE_DATA}>
                <XAxis dataKey="month" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#181d24', border: '1px solid #2a313c' }} />
                <Line type="monotone" dataKey="issues" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Used vs Idle */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-medium mb-2">Most used assets</h3>
          <div className="text-xs text-muted space-y-1 mb-4">
            <div>MacBook Pro M3 - 24 bookings this month</div>
            <div>Van AF-340 - 27 trips this month</div>
            <div>Projector AF-22X - 18 uses</div>
          </div>

          <h3 className="text-sm font-medium mb-2">Idle assets</h3>
          <div className="text-xs text-muted space-y-1">
            <div>Camera AF-5021 - unused 124 days</div>
            <div>Chair AF-3410 - unused 95 days</div>
          </div>
        </div>

        {/* Upcoming Retirements */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-medium mb-2">Assets due for maintenance / nearing retirement</h3>
          <div className="text-xs text-muted space-y-1 mb-4">
            <div>Forklift AF-0099 - service due in 8 days</div>
            <div>Laptop AF-2200 - 4 years old - nearing retirement</div>
          </div>

          <button className="px-4 py-1.5 border border-border rounded text-xs text-muted hover:text-foreground">
            Export report
          </button>
        </div>

      </div>
    </div>
  );
}
