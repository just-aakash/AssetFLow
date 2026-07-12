import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ArrowRight, Loader2 } from 'lucide-react';
import { signupSchema } from '@/schemas/auth';
import { useAppContext } from '@/context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      login({ name: data.name, email: data.email, role: 'Employee' });
      setIsLoading(false);
      toast.success('Account created! Welcome aboard!');
      navigate('/dashboard');
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
          <h1 className="text-4xl font-bold text-white mb-2">Create account</h1>
          <p className="text-white/40 text-sm">Join your organization on AssetFlow</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 mb-1 ml-1">Full Name</label>
            <input
              placeholder="John Doe"
              {...register('name')}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400 ml-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1 ml-1">Work Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 pr-14 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(100,210,100,0.4)]"
                style={{ background: 'linear-gradient(135deg, #5de85d, #00c8c8)' }}
              >
                {isLoading
                  ? <Loader2 className="w-4 h-4 text-black animate-spin" />
                  : <ArrowRight className="w-4 h-4 text-black" />
                }
              </button>
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-400 ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1 ml-1">Department</label>
            <select
              {...register('department')}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-all text-sm appearance-none"
            >
              <option value="" className="bg-[#0a0e0a]">Select department...</option>
              <option value="engineering" className="bg-[#0a0e0a]">Engineering</option>
              <option value="design" className="bg-[#0a0e0a]">Design</option>
              <option value="marketing" className="bg-[#0a0e0a]">Marketing</option>
              <option value="hr" className="bg-[#0a0e0a]">Human Resources</option>
              <option value="operations" className="bg-[#0a0e0a]">Operations</option>
            </select>
            {errors.department && <p className="mt-1 text-xs text-red-400 ml-1">{errors.department.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/40 mb-1 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
              />
              {errors.password && <p className="mt-1 text-xs text-red-400 ml-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1 ml-1">Confirm</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400 ml-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3">
              <span className="font-bold text-blue-400">G</span>
              Continue with Google
            </div>
            <ArrowRight className="w-4 h-4 text-white/30" />
          </button>
        </div>

        <div className="text-center mt-8 text-sm text-white/30">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
