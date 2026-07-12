import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Bookings() {
  const { assets, bookings, addBooking, user } = useAppContext();
  const [selectedAsset, setSelectedAsset] = useState('');
  
  // Only show bookable resources
  const bookableAssets = assets.filter(a => a.isBookable);
  
  const handleBook = () => {
    if (!selectedAsset) return toast.error('Select a resource first');
    addBooking({
      assetId: selectedAsset,
      assetName: assets.find(a => a.id === selectedAsset)?.name,
      bookedBy: user?.name || 'Current User',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      purpose: 'Meeting'
    });
    toast.success('Resource booked successfully!');
  };

  return (
    <div className="p-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-semibold">Resource booking</h1>
        <p className="text-xs text-muted mt-0.5">Book shared resources like conference rooms and vehicles</p>
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-6">
        
        {/* Resource Selector */}
        <div className="mb-8">
          <label className="block text-xs text-muted mb-1.5">Resource</label>
          <select 
            value={selectedAsset}
            onChange={e => setSelectedAsset(e.target.value)}
            className="w-full md:w-1/2 bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Select Resource...</option>
            {bookableAssets.map(a => <option key={a.id} value={a.id}>{a.name} - {a.location}</option>)}
          </select>
        </div>

        {/* Timeline Visualization */}
        <div className="border border-border rounded-lg p-6 bg-[#10141a]/30 relative overflow-hidden">
          {/* Times */}
          <div className="absolute left-4 top-6 bottom-6 flex flex-col justify-between text-xs text-muted font-mono h-[300px]">
            <span>09:00</span>
            <span>10:00</span>
            <span>11:00</span>
            <span>12:00</span>
            <span>13:00</span>
            <span>14:00</span>
            <span>15:00</span>
          </div>

          {/* Grid lines */}
          <div className="ml-16 h-[300px] flex flex-col justify-between relative border-l border-border/50">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-full border-t border-border/30 border-dashed" />
            ))}
            
            {/* Blocks */}
            <div className="absolute top-0 left-4 right-4 h-full pt-[2px]">
              {/* Existing block */}
              <div className="bg-blue-500/20 border border-blue-500/40 rounded-md p-2 w-full h-[15%] text-xs text-blue-200">
                Booked - Procurement Team - 9 to 10
              </div>
              
              {/* Blocked block */}
              <div className="bg-red-500/10 border border-red-500/30 border-dashed rounded-md p-2 w-full h-[15%] mt-[15%] text-xs text-red-300 flex items-center">
                Requested MRB to 11:00 - conflict - slot is unavailble
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={handleBook}
            className="px-6 py-2 bg-primary text-black rounded-lg text-sm font-medium shadow-[0_0_10px_rgba(161,246,94,0.2)] hover:bg-primary-hover transition-all"
          >
            Book a slot
          </button>
        </div>
      </div>
    </div>
  );
}
