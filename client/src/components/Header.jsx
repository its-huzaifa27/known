import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-green-950 border-b-4 border-white shadow-sm z-10 w-full">
      {/* Left: Logo and App Name */}
      <div className="flex items-center gap-2 text-2xl font-bold text-[#025035]">
        <div className="w-6 h-6 bg-[#025035] rounded relative after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:w-3 after:h-3 after:bg-white after:rounded-full"></div>
        known
      </div>

      {/* Right: User Info and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-slate-700">John Doe</span>
          <span className="text-xs text-slate-500">User</span>
        </div>
        <div className="w-10 h-10 bg-[#025035] text-white rounded-full flex items-center justify-center font-bold">
          JD
        </div>
        <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors ml-2">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;