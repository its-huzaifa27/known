import React from 'react';

const SettingsView = ({ 
  theme, 
  toggleTheme, 
  logout, 
  pwdMessage, 
  pwdLoading, 
  passwords, 
  dispatch, 
  onPasswordChange 
}) => {
  return (
    <div className="h-full relative z-10 flex items-start justify-center pt-10">
      <div className={`p-10 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 relative overflow-hidden border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        
        {/* Left side: General Settings */}
        <div>
          <h2 className={`text-3xl font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Settings</h2>
          <p className="text-slate-500 mb-10">Manage your account preferences and security.</p>
          
          <div className="space-y-8">
            {/* Theme Toggle */}
            <div className={`p-6 rounded-2xl border flex items-center justify-between group transition-colors ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div>
                <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Display Theme</p>
                <p className="text-sm text-slate-500">Switch between light and dark mode</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-emerald-500 overflow-hidden ${theme === 'dark' ? 'bg-emerald-900/50' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-6 bg-emerald-500' : ''}`}>
                  {theme === 'dark' ? (
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                  )}
                </div>
              </button>
            </div>

            {/* Logout Button */}
            <div className={`p-6 rounded-2xl border flex items-center justify-between transition-colors ${theme === 'dark' ? 'bg-rose-900/10 border-rose-900/20' : 'bg-rose-50/50 border-rose-100'}`}>
              <div>
                <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Session</p>
                <p className="text-sm text-slate-500">Sign out of your account securely</p>
              </div>
              <button 
                onClick={logout}
                className={`px-6 py-2.5 font-bold rounded-xl transition-all shadow-sm active:scale-95 ${theme === 'dark' ? 'bg-rose-900/40 text-rose-300 border border-rose-800 hover:bg-rose-800 hover:text-white' : 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-transparent'}`}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Security / Password Change */}
        <div className={`p-8 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Change Password
          </h3>
          
          {pwdMessage.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${pwdMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              {pwdMessage.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              {pwdMessage.text}
            </div>
          )}

          <form onSubmit={onPasswordChange} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-slate-400 mb-1.5 uppercase">Current Password</label>
              <input 
                type="password" 
                required 
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`} 
                value={passwords.currentPassword}
                onChange={e => dispatch({ type: 'UPDATE_FORM', form: 'passwords', payload: { currentPassword: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-slate-400 mb-1.5 uppercase">New Password</label>
              <input 
                type="password" 
                required 
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`} 
                value={passwords.newPassword}
                onChange={e => dispatch({ type: 'UPDATE_FORM', form: 'passwords', payload: { newPassword: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-slate-400 mb-1.5 uppercase">Confirm New Password</label>
              <input 
                type="password" 
                required 
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`} 
                value={passwords.confirmPassword}
                onChange={e => dispatch({ type: 'UPDATE_FORM', form: 'passwords', payload: { confirmPassword: e.target.value } })}
              />
            </div>
            <button 
              type="submit" 
              disabled={pwdLoading}
              className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              {pwdLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
