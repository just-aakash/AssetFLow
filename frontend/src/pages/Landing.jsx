import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Database, Cloud, Code2, BarChart2, ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  // If already logged in, go straight to dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#060a06] text-white overflow-hidden flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/mossy_forest_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.7,
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

      {/* ─── Navbar ─── */}
      <nav className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(161,246,94,0.5)]">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-white tracking-wide">ASSETFLOW</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm rounded-full border border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2 text-sm rounded-full bg-primary text-black font-semibold hover:bg-primary-hover transition-all shadow-[0_0_15px_rgba(161,246,94,0.4)] flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-sm text-white/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            New &nbsp;<span className="text-white font-medium">Now with Real-Time Asset Tracking</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/50" />
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>
            Manage Every Asset.{' '}
            <em className="not-italic text-primary" style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>Empower</em>{' '}
            Every Team.
          </h1>

          <p className="text-md text-white/60 max-w-xl mx-auto mb-10">
            AssetFlow centralizes asset tracking, resource booking, maintenance workflows,<br />
            audits, and analytics into one powerful enterprise platform.
          </p>

          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-lg hover:bg-primary-hover transition-all shadow-[0_0_30px_rgba(161,246,94,0.5)] mb-6"
          >
            Explore Platform <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Role-Based Access</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Real-Time Tracking</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Smart Analytics</span>
          </div>
        </motion.div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="relative z-10 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-white">Centralize Every Asset</span>
            </div>
            <p className="text-sm text-white/50 mb-6">
              Manage equipment, furniture, vehicles, and shared resources from one unified platform with complete lifecycle visibility.
            </p>
            {/* Data Source illustration */}
            <div className="mt-auto space-y-2.5">
              {[Database, Cloud, Code2, BarChart2].map((Icon, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <div className="flex-1 h-px border-t border-dashed border-white/10" />
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(161,246,94,0.3)]">
                    <Database className="w-4 h-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-white">Gain Operational Insights</span>
            </div>
            <p className="text-sm text-white/50 mb-6">
              Monitor asset utilization, overdue returns, maintenance status, and resource availability through real-time dashboards.
            </p>
            {/* Sparkline chart */}
            <div className="mt-auto relative h-28 flex items-end">
              <div className="absolute top-2 right-2 flex items-center gap-1 text-primary text-xs font-semibold">
                ↑ 32%
              </div>
              <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A1F65E" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A1F65E" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 C30,55 50,70 80,40 C110,10 140,50 170,30 L200,20 L200,80 L0,80 Z" fill="url(#chartGrad)" />
                <path d="M0,60 C30,55 50,70 80,40 C110,10 140,50 170,30 L200,20" fill="none" stroke="#A1F65E" strokeWidth="2" />
              </svg>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-white">Automate Enterprise Workflows</span>
            </div>
            <p className="text-sm text-white/50 mb-6">
              Streamline approvals, maintenance requests, transfers, audits, and notifications while reducing manual effort.
            </p>
            {/* Orbit illustration */}
            <div className="mt-auto flex items-center justify-center h-28">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center shadow-[0_0_25px_rgba(161,246,94,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_15px_rgba(161,246,94,0.3)]">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                </div>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/60"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${deg}deg) translateX(32px) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <div className="relative z-10 pb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-6">Trusted by innovative teams</p>
        <div className="flex flex-wrap items-center justify-center gap-10 text-white/30 font-semibold text-lg">
          {[].map(b => (
            <span key={b} className="hover:text-white/60 transition-colors cursor-default">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
