import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Badge } from '@/components/common/Badge';

export default function Audit() {
  const { audits, updateAuditItem, closeAudit } = useAppContext();
  
  // Just show the first active audit for demo
  const audit = audits[0];

  const handleVerify = (assetId, status) => {
    updateAuditItem(audit.id, assetId, status, '');
  };

  if (!audit) return <div className="p-6">No active audits.</div>;

  const discrepancies = audit.items.filter(i => i.verificationStatus !== 'Verified' && i.verificationStatus !== 'Pending').length;

  return (
    <div className="p-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold">Asset Audit</h1>
        <p className="text-xs text-muted mt-0.5">(audit cycle, checklist, auto-generated discrepancy report)</p>
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 bg-[#10141a] border border-border rounded-lg p-4">
          <div>
            <div className="font-medium">{audit.name}</div>
            <div className="text-xs text-muted">Auditors: {audit.auditors.join(', ')}</div>
          </div>
          <Badge variant="warning">{audit.status}</Badge>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="text-left py-2 px-3">Asset</th>
              <th className="text-left py-2 px-3">Expected Location</th>
              <th className="text-right py-2 px-3">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {audit.items.map(item => (
              <tr key={item.assetId} className="hover:bg-card-hover transition-colors">
                <td className="py-3 px-3">
                  <div className="font-medium text-xs">{item.assetId} {item.assetName}</div>
                </td>
                <td className="py-3 px-3 text-muted text-xs">{item.expectedLocation}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleVerify(item.assetId, 'Verified')}
                      className={`px-3 py-1 rounded text-xs border ${
                        item.verificationStatus === 'Verified' ? 'bg-primary/20 border-primary text-primary' : 'border-border text-muted hover:text-foreground'
                      }`}
                    >
                      Verified
                    </button>
                    <button 
                      onClick={() => handleVerify(item.assetId, 'Missing')}
                      className={`px-3 py-1 rounded text-xs border ${
                        item.verificationStatus === 'Missing' ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-border text-muted hover:text-foreground'
                      }`}
                    >
                      Missing
                    </button>
                    <button 
                      onClick={() => handleVerify(item.assetId, 'Damaged')}
                      className={`px-3 py-1 rounded text-xs border ${
                        item.verificationStatus === 'Damaged' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'border-border text-muted hover:text-foreground'
                      }`}
                    >
                      Damaged
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {discrepancies > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-500 mb-6 font-medium">
            {discrepancies} assets flagged - discrepancy report generated automatically
          </div>
        )}

        <button 
          onClick={() => closeAudit(audit.id)}
          className="px-6 py-2 bg-card border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-black transition-all"
        >
          Close audit cycle
        </button>
      </div>
    </div>
  );
}
