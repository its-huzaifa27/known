import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../constants';


function LandingPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isLogin 
      ? `${API_URL}/api/users/login` 
      : `${API_URL}/api/users/register`;

    const payload = isLogin 
      ? { email, password } 
      : { userName, email, password };

    try {
      const response = await axios.post(url, payload);
      const { accessToken, user } = response.data;
      login(accessToken, user);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-slate-800 bg-white">
      {/* Left part: Auth Form */}
      <div className="w-full max-w-[480px] bg-white px-8 md:px-[60px] py-[40px] flex flex-col justify-center overflow-y-auto">
        <div className="mb-[40px] flex items-center cursor-pointer">
          <img src="/logo/knownlogo.png" alt="Known Logo" className="h-10 w-auto object-contain" />
        </div>

        <h1 className="text-[32px] font-bold mb-2 text-slate-900 leading-tight">
          {isLogin ? 'Log in to your account' : 'Create your account'}
        </h1>
        <p className="text-[15px] text-slate-500 mb-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-emerald-700 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 mb-6 text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase" htmlFor="username">Full Name</label>
              <input 
                type="text" 
                id="username" 
                required
                placeholder="e.g. Jane Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent font-medium" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              required
              placeholder="jane@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent font-medium" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase" htmlFor="password">Password</label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent font-medium pr-12" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-900 text-white font-bold rounded-xl text-[16px] transform transition-all hover:bg-emerald-950 active:scale-[0.98] shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
           <p className="text-center text-[13px] text-slate-400">
             By continuing, you agree to our <span className="underline decoration-slate-200 hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span> and <span className="underline decoration-slate-200 hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>.
           </p>
        </div>
      </div>

      {/* Right part: Info Panel */}
      <div className="hidden lg:flex flex-1 bg-emerald-950 text-white px-[80px] py-[60px] flex-col justify-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute opacity-10 pointer-events-none w-[600px] h-[600px] rounded-full border-[80px] border-white -top-[300px] -right-[200px]"></div>
        <div className="absolute opacity-5 pointer-events-none w-[400px] h-[400px] bg-white bottom-[5%] left-[10%] rounded-full blur-3xl"></div>

        <div className="max-w-[500px] z-10">
          <div className="mb-12">
            <span className="px-4 py-2 bg-emerald-900/50 rounded-full text-xs font-bold tracking-widest uppercase text-emerald-300 border border-emerald-800">New Version 2.0</span>
          </div>
          <h2 className="text-[48px] font-extrabold leading-[1.1] mb-6 tracking-tight">
            The intelligent way to manage your network.
          </h2>
          <p className="text-[19px] leading-relaxed opacity-80 mb-10 font-medium">
            Join a platform to structure, secure, and grow your professional connections.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-3xl font-bold text-white mb-1">99.9%</p>
              <p className="text-sm text-emerald-400 font-bold uppercase tracking-wider">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">256-bit</p>
              <p className="text-sm text-emerald-400 font-bold uppercase tracking-wider">Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;