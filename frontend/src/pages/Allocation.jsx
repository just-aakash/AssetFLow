import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Allocation() {
  const { assets, employees, allocations, allocateAsset } = useAppContext();
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [toEmployeeId, setToEmployeeId] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  
  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const isAlreadyAllocated = selectedAsset?.status === 'Allocated';
  
  const handleAllocate = () => {
    if (!selectedAssetId || !toEmployeeId) return toast.error('Please fill required fields');
    if (isAlreadyAllocated) return toast.error('Direct reallocation blocked');
    
    const emp = employees.find(e => e.id === toEmployeeId);
    allocateAsset(selectedAssetId, emp.name, emp.dept, expectedReturn || 'Indefinite');
    
    setSelectedAssetId('');
    setToEmployeeId('');
    setExpectedReturn('');
  };

  return (
    <div className="p-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold">Asset allocation & Transfer</h1>
        <p className="text-xs text-muted mt-0.5">Submit new allocations or transfer requests</p>
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-6">
        <div className="space-y-6">
          
          {/* Asset Selection */}
          <div>
            <label className="block text-xs text-muted mb-1.5">Asset</label>
            <select 
              value={selectedAssetId} 
              onChange={e => setSelectedAssetId(e.target.value)}
              className="w-full md:w-1/2 bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">Select Asset...</option>
              {assets.map(a => <option key={a.id} value={a.id}>{a.id} - {a.name}</option>)}
            </select>
          </div>

          {/* Double Allocation Warning */}
          {isAlreadyAllocated && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
              <div className="flex items-center gap-2 font-medium mb-1">
                <AlertTriangle className="w-4 h-4" />
                Already allocated to {selectedAsset.assignee} ({selectedAsset.dept})
              </div>
              <div className="text-xs opacity-80 ml-6">
                Direct reallocation is blocked - submit a transfer request below.
              </div>
            </div>
          )}

          {/* Transfer Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs text-muted mb-1.5">From</label>
              <input 
                type="text" 
                value={isAlreadyAllocated ? selectedAsset.assignee : 'Available / IT Storage'} 
                disabled 
                className="w-full bg-[#10141a]/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-muted cursor-not-allowed"
              />
            </div>
            
            <div className="relative">
              <label className="block text-xs text-muted mb-1.5">To</label>
              <select 
                value={toEmployeeId} 
                onChange={e => setToEmployeeId(e.target.value)}
                className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Select Employee...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.dept})</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1.5">Expected Return (Optional)</label>
            <input 
              type="date"
              value={expectedReturn}
              onChange={e => setExpectedReturn(e.target.value)}
              className="w-full md:w-1/2 bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-xs text-muted mb-1.5">Reason / Notes</label>
            <textarea 
              rows={2}
              placeholder="E.g., new joiner equipment, temporary loan..."
              className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="pt-2">
            <button 
              onClick={handleAllocate}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                isAlreadyAllocated 
                  ? 'bg-card border border-border hover:bg-card-hover text-foreground' 
                  : 'bg-primary text-black shadow-[0_0_10px_rgba(161,246,94,0.2)] hover:bg-primary-hover'
              }`}
            >
              {isAlreadyAllocated ? 'Submit Transfer Request' : 'Allocate Asset'}
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="mt-10 pt-6 border-t border-border">
          <h3 className="text-sm font-medium mb-4">Allocation history</h3>
          <div className="space-y-4">
            {allocations.slice(0, 5).map(alloc => (
              <div key={alloc.id} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5" />
                <div>
                  <div className="text-sm text-foreground">
                    {alloc.assetName} allocated to {alloc.employee} - {alloc.dept}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {alloc.allocatedDate} · Expected return: {alloc.expectedReturn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
