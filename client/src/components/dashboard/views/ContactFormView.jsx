import React from 'react';

const ContactFormView = ({ 
  title, 
  subtitle, 
  formType, // 'formData' or 'editFormData'
  formData, 
  onSubmit, 
  onCancel, 
  submitLoading, 
  submitError, 
  dispatch,
  theme = 'light'
}) => {
  return (
    <div className="h-full relative z-10 flex items-start justify-center pt-10">
        <div className={`p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-xl relative overflow-hidden border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <h2 className={`text-3xl font-extrabold mb-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{title}</h2>
            <p className="text-slate-500 mb-8">{subtitle}</p>
            
            {submitError && (
              <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 mb-6 text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {submitError}
              </div>
            )}
            
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        required 
                        placeholder="e.g. Jane Doe"
                        value={formData.name}
                         onChange={e => dispatch({ type: 'UPDATE_FORM', form: formType, payload: { name: e.target.value } })}
                        className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm font-medium placeholder:font-normal ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="jane@example.com"
                        value={formData.email}
                         onChange={e => dispatch({ type: 'UPDATE_FORM', form: formType, payload: { email: e.target.value } })}
                        className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm font-medium placeholder:font-normal ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Phone Number</label>
                    <input 
                        type="tel" 
                        required 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                         onChange={e => dispatch({ type: 'UPDATE_FORM', form: formType, payload: { phone: e.target.value } })}
                        className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm font-medium placeholder:font-normal ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Birthday</label>
                        <input 
                            type="date" 
                            value={formData.birthday}
                            onChange={e => dispatch({ type: 'UPDATE_FORM', form: formType, payload: { birthday: e.target.value } })}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm font-medium ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Additional Notes</label>
                    <textarea 
                        placeholder="Add some details about this contact..."
                        rows="3"
                        value={formData.notes}
                        onChange={e => dispatch({ type: 'UPDATE_FORM', form: formType, payload: { notes: e.target.value } })}
                        className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm font-medium placeholder:font-normal resize-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    ></textarea>
                </div>
                
                <div className="pt-6 flex gap-4">
                    <button 
                        type="button" 
                        onClick={onCancel}
                        disabled={submitLoading}
                        className={`flex-1 py-3.5 px-4 border-2 font-bold rounded-xl transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200'}`}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={submitLoading}
                        className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-600 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.4)] transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                    >
                        {submitLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            formType === 'editFormData' ? "Update Contact" : "Save Contact"
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ContactFormView;
