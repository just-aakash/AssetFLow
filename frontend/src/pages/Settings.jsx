import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Camera, Save, Trash2, Key, Bell, Shield, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, updateProfile, logout } = useAppContext();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`,
  });

  const handleSaveProfile = () => {
    updateProfile(profile);
    toast.success('Profile updated successfully!');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfile(prev => ({ ...prev, avatar: base64String }));
        updateProfile({ avatar: base64String });
        toast.success('Profile photo updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      toast.success('Account deleted.');
      logout();
      navigate('/');
    }
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-white/50 mt-1">Manage your profile and account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Edit */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <h2 className="text-lg font-semibold mb-6">Profile Details</h2>
            
            {/* Avatar Upload */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group cursor-pointer">
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-2 border-white/10 object-cover"
                />
                <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white mb-1" />
                  <span className="text-[10px] text-white">Change</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <div>
                <h3 className="font-medium text-white">{profile.name}</h3>
                <p className="text-sm text-white/50">{user?.role || 'Employee'}</p>
                <label className="inline-block mt-3 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium cursor-pointer transition-colors">
                  Upload new photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1 ml-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1 ml-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
              </div>
              <div className="pt-2">
                <button 
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(161,246,94,0.3)]"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Other Options */}
        <div className="space-y-4">
          
          <button 
            onClick={() => toast('Security settings coming soon!', { icon: '🛡️' })}
            className="w-full flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <div className="font-medium text-sm">Security</div>
                <div className="text-xs text-white/40">Password & 2FA</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </button>

          <button 
            onClick={() => toast('Notification preferences coming soon!', { icon: '🔔' })}
            className="w-full flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <div className="font-medium text-sm">Notifications</div>
                <div className="text-xs text-white/40">Email & push alerts</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </button>

          <button 
            onClick={() => toast('Integrations coming soon!', { icon: '🔌' })}
            className="w-full flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Key className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <div className="font-medium text-sm">Integrations</div>
                <div className="text-xs text-white/40">Connected apps</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </button>

          <button 
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-between p-4 bg-red-950/20 backdrop-blur-md border border-red-500/20 rounded-2xl hover:bg-red-950/40 transition-all text-left mt-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="font-medium text-sm text-red-400">Delete Account</div>
                <div className="text-xs text-red-400/60">Permanently remove data</div>
              </div>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
