import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-950 via-teal-950 to-green-950 shadow-md border-b-2 border-emerald-800/40 z-10 w-full relative">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none"></div>
      
      {/* Left: Logo and App Name */}
      <div className="flex items-center relative z-10 cursor-pointer">
        <img src="/logo/knownlogo.png" alt="Known Logo" className="h-14 w-auto object-contain " />
      </div>

      {/* Right: User Info and Logout */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex flex-col text-right">
          <span className="text-sm font-bold text-white tracking-wide">{user?.userName || 'My Account'}</span>
          <span className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase">{user?.email || 'Active User'}</span>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.3)] ring-2 ring-white/10 flex items-center justify-center font-bold text-base cursor-pointer transform transition-transform hover:scale-105 active:scale-95">
          {user?.userName?.charAt(0) || 'U'}
        </div>
        <div className="h-8 w-px bg-emerald-700/50 mx-1"></div>
        <button 
          onClick={logout}
          className="px-5 py-2 text-sm font-semibold text-rose-300 border border-rose-300/30 rounded-xl hover:bg-rose-500/10 hover:border-rose-400 hover:text-rose-200 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;