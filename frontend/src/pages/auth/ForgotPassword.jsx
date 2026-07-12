import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Reset link sent to your email!');
    }, 1200);
  };

  return (
    <div
      className="relative rounded-[2rem] overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(60,80,60,0.6) 0%, rgba(10,14,10,0.9) 40%, rgba(5,8,5,0.97) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 0 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(30px)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(100,220,100,0.4), rgba(80,180,255,0.3), transparent)',
        }}
      />

      <div className="p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reset password</h1>
          <p className="text-white/40 text-sm">
            {isSubmitted
              ? 'Check your inbox for the reset link.'
              : "Enter your email and we'll send you a link."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-white/40 mb-1 ml-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 pr-14 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(100,210,100,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #5de85d, #00c8c8)' }}
                >
                  {isLoading
                    ? <Loader2 className="w-4 h-4 text-black animate-spin" />
                    : <ArrowRight className="w-4 h-4 text-black" />
                  }
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white hover:bg-white/10 transition-all"
          >
            Resend link
          </button>
        )}

        <div className="text-center mt-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
