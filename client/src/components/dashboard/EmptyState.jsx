import React from 'react';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  iconBgColor = 'bg-emerald-50',
  iconColor = 'text-emerald-500',
  theme = 'light'
}) => {
  return (
    <div className={`rounded-2xl border border-emerald-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 text-center ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
       <div className={`w-24 h-24 ${iconBgColor} rounded-full flex items-center justify-center mb-6`}>
         {React.cloneElement(icon, { className: `w-12 h-12 ${iconColor}` })}
       </div>
       <p className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{title}</p>
       <p className="text-sm text-slate-500 mb-8 max-w-sm">{description}</p>
       {buttonText && (
         <button 
           onClick={onButtonClick} 
           className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform transition-all hover:scale-105"
         >
           {buttonText}
         </button>
       )}
    </div>
  );
};

export default EmptyState;
