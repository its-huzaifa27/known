import React, { useState } from 'react';

function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen font-sans text-slate-800">
      {/* Left part: Auth Form */}
      <div className="w-full max-w-[480px] bg-white px-8 md:px-[60px] py-[40px] flex flex-col overflow-y-auto">
        <div className="text-2xl font-bold text-[#025035] mb-[60px] flex items-center gap-2">
          <div className="w-6 h-6 bg-[#025035] rounded relative after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:w-3 after:h-3 after:bg-white after:rounded-full"></div>
          known
        </div>

        <h1 className="text-[32px] font-semibold mb-3 text-slate-900 leading-tight">Log in to your account</h1>
        <p className="text-[15px] text-slate-600 mb-8">
          Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Sign Up</a>
        </p>

        <button className="flex items-center justify-center w-full p-3 mb-4 border border-slate-300 rounded-md bg-white text-[15px] font-medium text-slate-700 cursor-pointer transition-colors hover:bg-slate-50 hover:border-slate-400 gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <div className="flex items-center text-center my-6 text-slate-400 text-[13px] before:flex-1 before:border-b before:border-slate-200 before:mr-4 after:flex-1 after:border-b after:border-slate-200 after:ml-4">
          Or with email and password
        </div>

        <div className="mb-6">
          <label className="block text-[14px] font-semibold mb-2 text-slate-700" htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-3 border border-slate-300 rounded-md text-[15px] transition focus:outline-none focus:border-[#025035] focus:ring-[3px] focus:ring-[#025035]/10" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className={`w-full p-3 rounded-md text-[16px] font-medium mt-2 transition-colors ${email ? 'bg-[#025035] text-white cursor-pointer hover:bg-[#013a26]' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}>
          Next
        </button>

      </div>

      {/* Right part: Info Panel */}
      <div className="hidden lg:flex flex-1 bg-[#025035] text-white px-[80px] py-[60px] flex-col justify-center relative overflow-hidden">
        {/* Decorative background elements matching the tech aesthetic */}
        <div className="absolute opacity-10 pointer-events-none w-[300px] h-[300px] rounded-full border-[40px] border-white -top-[100px] -right-[100px]"></div>
        <div className="absolute opacity-10 pointer-events-none w-[200px] h-[200px] bg-gradient-to-br from-transparent to-white bottom-[10%] right-[15%] rounded-[10px] rotate-45"></div>

        <div className="max-w-[500px] z-10">
          <h2 className="text-[42px] font-bold leading-tight mb-6">
            Introducing the future of your workflow
          </h2>
          <p className="text-[18px] leading-relaxed opacity-90 mb-10">
            Welcome to known. Experience a beautifully designed platform structured perfectly for all your data management needs. Join thousands of developers who are already building faster.
          </p>
          <a href="#" className="inline-flex items-center text-white font-medium text-[16px] border-b border-white/40 pb-[2px] transition-colors hover:border-white">Learn more &rarr;</a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;