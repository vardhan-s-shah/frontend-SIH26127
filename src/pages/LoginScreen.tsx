import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('operator_admin');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between bg-cover bg-center select-none overflow-x-hidden font-sans"
      style={{
        backgroundImage: `url('/login-bg.jpg')`,
      }}
    >
      {/* Subtle edge & ambient overlays for maximum photo vibrance & legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-6 py-6 sm:px-12 flex items-center justify-between">
        {/* Top-Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/90 shadow-lg flex items-center justify-center text-white border border-white/20">
            <Shield size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[17px] font-bold text-white tracking-tight leading-none drop-shadow-sm">
              City ANPR
            </div>
            <div className="text-[11.5px] font-semibold text-blue-200 tracking-wider uppercase mt-0.5">
              AI Engine
            </div>
          </div>
        </div>

        {/* Top-Right: Nav Links */}
        <div className="hidden sm:flex items-center gap-4 text-[13px] font-medium text-white/90 drop-shadow">
          <span className="hover:text-white transition-colors cursor-default">
            Smarter Surveillance
          </span>
          <span className="text-white/40">|</span>
          <span className="hover:text-white transition-colors cursor-default">
            Safer Cities
          </span>
        </div>
      </header>

      {/* Main Content Area: Right-aligned Login Card */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center md:justify-end px-4 sm:px-10 md:pr-16 lg:pr-24 py-8">
        <div className="w-full max-w-[400px] sm:max-w-[420px] bg-white rounded-[16px] shadow-2xl p-7 sm:p-9 text-slate-800 animate-in fade-in zoom-in-95 duration-300">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 items-center justify-center text-[#2F6FED] mb-3 shadow-inner">
              <Shield size={26} className="stroke-[2.5]" />
            </div>
            <h1 className="text-[21px] sm:text-[23px] font-extrabold text-slate-900 tracking-tight leading-snug">
              City-Wide AI Engine
            </h1>
            <p className="text-[13px] font-medium text-slate-500 mt-0.5">
              for Multi-Camera ANPR
            </p>
            <div className="mt-2.5 inline-block px-3 py-1 bg-blue-50/80 rounded-full">
              <p className="text-[11.5px] font-semibold text-[#2F6FED] tracking-wide">
                Trajectory and Urban Traffic Analytics
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[10px] pl-10 pr-3.5 py-2.5 sm:py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/20 focus:border-[#2F6FED] focus:bg-white transition-all font-sans"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[10px] pl-10 pr-10 py-2.5 sm:py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/20 focus:border-[#2F6FED] focus:bg-white transition-all font-sans"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#2F6FED] hover:bg-[#2557c7] active:bg-[#1e47a8] text-white font-bold text-[14.5px] rounded-[10px] shadow-lg shadow-blue-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Forgot Password */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="text-[13px] font-semibold text-[#2F6FED] hover:text-[#1e47a8] hover:underline transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Footer Area */}
      <footer className="relative z-10 w-full px-6 py-6 sm:px-12">
        <p className="text-[13px] sm:text-[14px] font-medium text-white/90 drop-shadow-md">
          Real-time ANPR. Smarter Decisions. Safer Cities.
        </p>
      </footer>
    </div>
  );
};

