import React, { useState, useMemo } from 'react';
import { Plus, Filter, Search, Calendar as CalendarIcon, MoreVertical, CheckCircle2, AlertCircle, Clock, Package, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { useAppContext } from '@/context/AppContext';

const STATUS_VARIANTS = {
  Available: 'success',
  Allocated: 'primary',
  Maintenance: 'warning',
  Reserved: 'warning',
  Lost: 'danger',
  Retired: 'danger',
};

export default function Dashboard() {
  const { assets, updateAssetStatus, user } = useAppContext();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All categories');

  // Ensure selected asset is always in sync with context state
  const currentSelected = useMemo(
    () => (selectedAsset ? assets.find(a => a.id === selectedAsset.id) || assets[0] : assets[0]),
    [assets, selectedAsset]
  );

  const filteredAssets = useMemo(() => {
    return assets.filter(a => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.assignee.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [assets, searchQuery, filterStatus]);

  const kpis = useMemo(() => {
    const available = assets.filter(a => a.status === 'Available').length;
    const allocated = assets.filter(a => a.status === 'Allocated').length;
    const maintenance = assets.filter(a => a.status === 'Maintenance').length;
    const totalValue = assets.reduce((sum, a) => sum + parseFloat(a.cost.replace(/[$,]/g, '')), 0);
    return { available, allocated, maintenance, totalValue };
  }, [assets]);

  const handleAction = () => {
    if (!currentSelected) return;
    if (currentSelected.status === 'Available') {
      updateAssetStatus(currentSelected.id, 'Allocated');
      toast.success(`Asset #${currentSelected.id} allocated successfully!`);
    } else if (currentSelected.status === 'Allocated') {
      updateAssetStatus(currentSelected.id, 'Available');
      toast.success(`Asset #${currentSelected.id} returned and now available.`);
    } else if (currentSelected.status === 'Maintenance') {
      updateAssetStatus(currentSelected.id, 'Available');
      toast.success(`Asset #${currentSelected.id} maintenance resolved!`);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-4xl font-light tracking-tight">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Welcome back, <span className="text-primary">{user?.name}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="rounded-full gap-2 shadow-[0_0_15px_rgba(161,246,94,0.2)]">
            <Plus className="w-4 h-4" />
            Register Asset
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <Card className="p-5 bg-gradient-to-br from-card to-[#10141a]">
          <div className="text-muted text-xs mb-1">Total Assets Value</div>
          <div className="text-2xl font-light text-primary">${kpis.totalValue.toLocaleString()}</div>
          <div className="flex items-end gap-1 mt-3">
            <div className="h-1 w-1/3 bg-primary rounded-full" />
            <div className="h-1 w-1/3 bg-primary rounded-full" />
            <div className="h-1 w-1/3 bg-border rounded-full" />
          </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-card to-[#10141a]">
          <div className="text-muted text-xs mb-1">Available</div>
          <div className="text-2xl font-light text-green-400">{kpis.available}</div>
          <div className="flex items-center gap-1 mt-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted">Ready to allocate</span>
          </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-card to-[#10141a]">
          <div className="text-muted text-xs mb-1">Allocated</div>
          <div className="text-2xl font-light">{kpis.allocated}</div>
          <div className="flex -space-x-2 mt-3">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-6 h-6 rounded-full border-2 border-card" alt="" />
            ))}
          </div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-[#182025] to-[#12161b] border-primary/20">
          <div className="text-muted text-xs mb-1">Under Maintenance</div>
          <div className="text-2xl font-light">{kpis.maintenance}</div>
          <div className="flex gap-1.5 mt-3">
            <div className="bg-card px-2 py-1 rounded text-xs text-muted border border-border">IT</div>
            <div className="bg-primary text-black px-2 py-1 rounded text-xs font-semibold">Furniture</div>
            <div className="bg-card px-2 py-1 rounded text-xs text-muted border border-border">Vehicles</div>
          </div>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-3 bg-card/50 p-2 rounded-2xl border border-border shrink-0 flex-wrap">
        <div className="flex items-center gap-2 px-3 border-r border-border">
          <AlertCircle className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        {/* Status Pill Filters */}
        <div className="flex gap-1.5">
          {['All', 'Available', 'Allocated', 'Maintenance'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filterStatus === s
                  ? 'bg-primary text-black shadow-[0_0_10px_rgba(161,246,94,0.3)]'
                  : 'bg-card text-muted hover:text-foreground border border-border'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="bg-[#10141a] border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors w-56"
            />
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-muted hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Split View */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* Asset List */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
            <h3 className="font-medium text-sm">
              Assets <span className="text-muted ml-1">({filteredAssets.length})</span>
            </h3>
          </div>
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="popLayout">
              {filteredAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted text-sm">
                  <Package className="w-10 h-10 mb-3 opacity-30" />
                  No assets found
                </div>
              ) : (
                filteredAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    layout
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedAsset(asset)}
                    className={`p-4 border-b border-border/40 flex items-center justify-between cursor-pointer transition-all ${
                      currentSelected?.id === asset.id
                        ? 'bg-[#10141a] border-l-2 border-l-primary pl-3'
                        : 'hover:bg-card-hover border-l-2 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={`https://i.pravatar.cc/150?u=${asset.id}`}
                          className="w-9 h-9 rounded-full object-cover border border-border"
                          alt={asset.assignee}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-card rounded-full p-0.5">
                          {asset.status === 'Available'
                            ? <CheckCircle2 className="w-2.5 h-2.5 text-primary" />
                            : <Clock className="w-2.5 h-2.5 text-yellow-500" />
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">#{asset.id}</div>
                        <div className="text-xs text-muted">{asset.name}</div>
                      </div>
                    </div>
                    <Badge variant={STATUS_VARIANTS[asset.status] || 'default'} className="text-xs">
                      {asset.status}
                    </Badge>
                    <div className="text-right hidden md:block">
                      <div className="text-sm font-medium">{asset.cost}</div>
                      <div className="text-xs text-muted">{asset.dept}</div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Asset Detail */}
        {currentSelected && (
          <motion.div
            key={currentSelected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-[1.3] min-w-0"
          >
            <Card className="h-full bg-[#1a2027] border-border flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border flex items-start justify-between shrink-0">
                <div>
                  <div className="text-muted text-xs mb-1 flex items-center gap-2">
                    Asset Details
                    <Badge variant="default" className="text-[10px] uppercase tracking-wider">
                      {currentSelected.condition}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-light text-white flex items-center gap-3">
                    #{currentSelected.id}
                    <Badge
                      variant={STATUS_VARIANTS[currentSelected.status] || 'default'}
                      className="text-sm px-3"
                    >
                      {currentSelected.status}
                    </Badge>
                  </h2>
                  <div className="text-muted text-sm mt-1">{currentSelected.name}</div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 flex-1 space-y-5">
                <div className="flex gap-8">
                  <div>
                    <div className="text-muted text-xs mb-1">Department</div>
                    <div className="font-medium flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-card border border-border flex items-center justify-center">
                        <Package className="w-3 h-3 text-primary" />
                      </div>
                      {currentSelected.dept}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted text-xs mb-1">Assignee</div>
                    <div className="font-medium flex items-center gap-2">
                      <img src={`https://i.pravatar.cc/150?u=${currentSelected.id}`} className="w-5 h-5 rounded-full" alt="" />
                      {currentSelected.assignee}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#10141a] p-4 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="text-lg font-medium group-hover:text-primary transition-colors">{currentSelected.cost}</div>
                    <div className="text-xs text-muted mt-1">Purchase Cost</div>
                  </div>
                  <div className="bg-[#10141a] p-4 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="text-lg font-medium group-hover:text-primary transition-colors">$150.00</div>
                    <div className="text-xs text-muted mt-1">Maintenance YTD</div>
                  </div>
                  <div className="bg-[#10141a] p-4 rounded-xl border border-dashed border-muted flex items-center justify-center hover:border-primary/40 transition-colors cursor-pointer text-muted hover:text-primary">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-5 bg-[#10141a] border-t border-border flex items-center justify-between shrink-0">
                <div className="flex gap-8 text-sm">
                  <div>
                    <div className="text-muted text-xs mb-0.5">Acquisition Date</div>
                    <div className="font-medium">Oct 12, 2023</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs mb-0.5">Expected Return</div>
                    <div className="font-medium">{currentSelected.status === 'Allocated' ? 'Dec 24, 2023' : '—'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-card border border-border text-muted hover:text-foreground">
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleAction}
                    className={`rounded-full px-6 text-sm ${
                      currentSelected.status === 'Available'
                        ? 'shadow-[0_0_15px_rgba(161,246,94,0.3)]'
                        : 'bg-yellow-500/80 hover:bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    }`}
                  >
                    {currentSelected.status === 'Available' && 'Allocate Now'}
                    {currentSelected.status === 'Allocated' && 'Process Return'}
                    {currentSelected.status === 'Maintenance' && 'Mark Resolved'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
