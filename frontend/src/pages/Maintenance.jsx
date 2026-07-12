import React from 'react';
import { useAppContext } from '@/context/AppContext';

const COLUMNS = [
  { id: 'Pending', label: 'Pending' },
  { id: 'Approved', label: 'Approved' },
  { id: 'Technician Assigned', label: 'Technician assigned' },
  { id: 'In Progress', label: 'in progress' },
  { id: 'Resolved', label: 'Resolved' },
];

export default function Maintenance() {
  const { maintenance, updateMaintenanceStatus } = useAppContext();

  const handleMove = (item, newStatus) => {
    updateMaintenanceStatus(item.id, newStatus, item.technician);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div>
        <h1 className="text-xl font-semibold">Maintenance Management</h1>
        <p className="text-xs text-muted mt-0.5">(approval workflow as kanban board)</p>
      </div>

      <div className="mt-6 flex-1 flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const items = maintenance.filter(m => {
            if (col.id === 'Technician Assigned') return m.status === 'Approved' && m.technician;
            if (col.id === 'Approved') return m.status === 'Approved' && !m.technician;
            return m.status === col.id;
          });

          return (
            <div key={col.id} className="flex-shrink-0 w-64 flex flex-col bg-[#10141a]/50 rounded-xl border border-border">
              <div className="p-3 border-b border-border">
                <h3 className="text-sm font-medium capitalize">{col.label}</h3>
              </div>
              
              <div className="p-3 flex-1 space-y-3 overflow-y-auto">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-card border p-3 rounded-lg text-sm cursor-pointer hover:border-primary/50 transition-colors ${
                      item.status === 'Resolved' ? 'border-primary/50 bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => {
                      const currentIndex = COLUMNS.findIndex(c => c.id === col.id);
                      if (currentIndex < COLUMNS.length - 1) {
                        const nextCol = COLUMNS[currentIndex + 1];
                        let nextStatus = nextCol.id;
                        if (nextStatus === 'Technician Assigned') nextStatus = 'Approved'; // Just mock the workflow visually
                        handleMove(item, nextStatus);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs font-semibold">{item.assetId}</span>
                    </div>
                    <div className="font-medium mb-1 line-clamp-1">{item.assetName}</div>
                    <div className="text-xs text-muted line-clamp-2">{item.issue}</div>
                    
                    {item.status === 'Resolved' && (
                      <div className="mt-2 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                        resolved
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-muted text-center pt-2">
        Approving a card moves the asset to under maintenance, resolving returns it to available.
        (Click a card to move it forward)
      </div>
    </div>
  );
}
