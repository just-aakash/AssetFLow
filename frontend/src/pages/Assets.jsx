import React, { useState, useMemo } from 'react';
import { Plus, Search, QrCode, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Available: 'text-primary bg-primary/10 border-primary/20',
  Allocated: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Under Maintenance': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Reserved: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Retired: 'text-red-400 bg-red-500/10 border-red-500/20',
  Lost: 'text-red-400 bg-red-500/10 border-red-500/20',
};

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#181d24] border border-border rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-[#181d24]">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs text-muted mb-1">{label}</label>
      <input
        className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-all"
        {...props}
      />
    </div>
  );
}

export default function Assets() {
  const { assets, addAsset, categories, departments } = useAppContext();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form, setForm] = useState({
    name: '', category: '', serialNo: '', acquisitionDate: '', cost: '',
    condition: 'Good', location: '', isBookable: false,
  });

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const q = search.toLowerCase();
      const matchSearch = !search || a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'All' || a.status === filterStatus;
      const matchCat = filterCategory === 'All' || a.category === filterCategory;
      return matchSearch && matchStatus && matchCat;
    });
  }, [assets, search, filterStatus, filterCategory]);

  const handleAdd = () => {
    if (!form.name.trim() || !form.category) return toast.error('Name and category required');
    addAsset({
      ...form, cost: Number(form.cost), status: 'Available',
      assignee: null, dept: null,
    });
    toast.success('Asset registered!');
    setShowModal(false);
    setForm({ name: '', category: '', serialNo: '', acquisitionDate: '', cost: '', condition: 'Good', location: '', isBookable: false });
  };

  const statuses = ['All', 'Available', 'Allocated', 'Under Maintenance', 'Retired'];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Asset Directory</h1>
          <p className="text-xs text-muted mt-0.5">{assets.length} total assets</p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-lg text-xs text-muted hover:text-foreground"
          >
            <QrCode className="w-3.5 h-3.5" /> Scan QR
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium hover:bg-primary-hover shadow-[0_0_10px_rgba(161,246,94,0.2)]"
          >
            <Plus className="w-4 h-4" /> Register Asset
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by tag, serial, or name..."
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
        >
          <option value="All">Category: All</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <div className="flex gap-1">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === s ? 'bg-primary text-black' : 'bg-card border border-border text-muted hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="text-left py-3 px-4">Tag</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map(asset => (
              <tr
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="hover:bg-card-hover transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 font-mono text-xs text-muted">{asset.id}</td>
                <td className="py-3 px-4 font-medium">{asset.name}</td>
                <td className="py-3 px-4 text-muted">{asset.category}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[asset.status] || 'text-muted bg-card border-border'}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted text-xs">{asset.location}</td>
                <td className="py-3 px-4 text-muted text-xs">{asset.assignee || '—'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted py-12 text-sm">No assets found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Asset Detail Drawer */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedAsset(null)} />
          <div className="relative z-10 w-80 bg-[#181d24] border-l border-border h-full overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{selectedAsset.name}</h3>
              <button onClick={() => setSelectedAsset(null)} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[
                ['Tag', selectedAsset.id],
                ['Category', selectedAsset.category],
                ['Serial No.', selectedAsset.serialNo],
                ['Status', selectedAsset.status],
                ['Condition', selectedAsset.condition],
                ['Location', selectedAsset.location],
                ['Assignee', selectedAsset.assignee || '—'],
                ['Department', selectedAsset.dept || '—'],
                ['Cost', `$${selectedAsset.cost?.toLocaleString()}`],
                ['Acquired', selectedAsset.acquisitionDate],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showModal && (
        <Modal title="Register Asset" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <InputField label="Asset Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dell Laptop Pro" />
            <div>
              <label className="block text-xs text-muted mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Select category...</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <InputField label="Serial Number" value={form.serialNo} onChange={e => setForm({ ...form, serialNo: e.target.value })} placeholder="SN-00000" />
            <InputField label="Acquisition Date" type="date" value={form.acquisitionDate} onChange={e => setForm({ ...form, acquisitionDate: e.target.value })} />
            <InputField label="Cost ($)" type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} placeholder="1200" />
            <div>
              <label className="block text-xs text-muted mb-1">Condition</label>
              <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
                className="w-full bg-[#10141a] border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                {['Excellent', 'Good', 'Fair', 'Needs Repair'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <InputField label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="HQ Floor 2" />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isBookable} onChange={e => setForm({ ...form, isBookable: e.target.checked })} className="accent-primary" />
              <span className="text-muted">Mark as Shared Bookable Resource</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-border rounded-lg text-sm text-muted">Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2 bg-primary text-black rounded-lg text-sm font-medium">Register</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
