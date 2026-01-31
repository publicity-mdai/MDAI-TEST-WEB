
import React, { useState } from 'react';
import { Zone, MembershipForm as FormType } from '../types';

const INITIAL_STATE: FormType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  membershipNumber: '',
  address: {
    street: '',
    city: '',
    province: 'Manitoba',
    postalCode: ''
  },
  selectedZone: ''
};

const MembershipForm: React.FC = () => {
  const [formData, setFormData] = useState<FormType>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('addr_')) {
      const field = name.replace('addr_', '');
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-indigo-900/30 border border-indigo-500/20 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-400/10 rounded-full mb-6 border border-amber-400/20">
          <i className="fa-solid fa-check text-4xl text-amber-400"></i>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Registration Received!</h2>
        <p className="text-indigo-200 mb-8 max-w-md mx-auto">
          Thank you, {formData.firstName}. Your membership application for {formData.selectedZone} is being processed. 
          A confirmation email has been sent to {formData.email}.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFormData(INITIAL_STATE); }}
          className="px-8 py-3 bg-amber-400 text-indigo-950 font-black rounded-lg hover:bg-amber-300 transition-all hover:scale-105"
        >
          Register Another Member
        </button>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-2 bg-indigo-950/50 border border-indigo-800/50 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all text-white placeholder-indigo-700";
  const labelClasses = "block text-xs font-bold text-indigo-300 uppercase mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20">
      <div className="bg-indigo-950 p-8 border-b border-indigo-800/30">
        <h2 className="text-2xl font-bold text-white">Membership Registration</h2>
        <p className="text-indigo-400 text-sm mt-1">Join the Manitoba Darts elite community today.</p>
      </div>
      
      <div className="p-8 space-y-8">
        {/* Personal Details */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-user text-amber-400"></i>
            <h3 className="font-bold text-indigo-100 uppercase tracking-wide text-sm">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>First Name</label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Last Name</label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={inputClasses} />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-envelope text-amber-400"></i>
              <h3 className="font-bold text-indigo-100 uppercase tracking-wide text-sm">Contact Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(204) 555-0123" className={inputClasses} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-id-card text-amber-400"></i>
              <h3 className="font-bold text-indigo-100 uppercase tracking-wide text-sm">Membership Details</h3>
            </div>
            <div>
              <label className={labelClasses}>Membership ID (Optional)</label>
              <input type="text" name="membershipNumber" value={formData.membershipNumber} onChange={handleChange} placeholder="Leave blank if new member" className={inputClasses} />
              <p className="text-[10px] text-indigo-400 mt-2">New members will be assigned an ID upon approval.</p>
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-location-dot text-amber-400"></i>
            <h3 className="font-bold text-indigo-100 uppercase tracking-wide text-sm">Canadian Address</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClasses}>Street Address</label>
              <input required type="text" name="addr_street" value={formData.address.street} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className={labelClasses}>City</label>
                <input required type="text" name="addr_city" value={formData.address.city} onChange={handleChange} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Province</label>
                <select name="addr_province" value={formData.address.province} onChange={handleChange} className={inputClasses}>
                  <option value="Manitoba">Manitoba</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland">Newfoundland</option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Ontario">Ontario</option>
                  <option value="PEI">PEI</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Postal Code</label>
                <input required type="text" name="addr_postalCode" value={formData.address.postalCode} onChange={handleChange} placeholder="R3B 2L1" className={inputClasses} />
              </div>
            </div>
          </div>
        </section>

        {/* Zone Choice */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-map text-amber-400"></i>
            <h3 className="font-bold text-indigo-100 uppercase tracking-wide text-sm">Zone Selection</h3>
          </div>
          <div>
            <label className={labelClasses}>Select Your Zone (1 - 4)</label>
            <select required name="selectedZone" value={formData.selectedZone} onChange={handleChange} className={`${inputClasses} font-medium`}>
              <option value="">-- Select Your Region --</option>
              {Object.values(Zone).map(z => (
                <option key={z} value={z} className="bg-indigo-950">{z}</option>
              ))}
            </select>
          </div>
        </section>

        <div className="pt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-amber-400 text-indigo-950 font-black rounded-xl hover:bg-amber-300 active:transform active:scale-[0.98] transition-all shadow-xl shadow-amber-400/10 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <><i className="fa-solid fa-circle-notch animate-spin"></i> Processing...</>
            ) : (
              <><i className="fa-solid fa-paper-plane"></i> Complete Registration</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MembershipForm;
