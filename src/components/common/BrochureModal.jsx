import React, { useState } from 'react';
import { X, Download, User, Phone, Mail } from 'lucide-react';

const BROCHURE_PDF = '/ophthall_brochure.pdf';
const SHEET_URL =
    'https://script.google.com/macros/s/AKfycbxgH70HZ6IGqfvZnAT4XmEuSMhQDxFftEvjiKT8YarfVcytAJbIrB2yakBZo_Z6x3Hl/exec';

const PROGRAMME_LABELS = {
    home: 'General',
    dispensing: 'Optical Dispensing',
    clinical: 'Fellowship in Clinical Optometry',
    'contact-lens': 'Fellowship in Contact Lenses',
    orthoptics: 'Fellowship in Orthoptics & Vision Therapy',
    'low-vision': 'Fellowship in Low Vision Care',
    internship: 'Clinical Optometry Internship',
};

const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = BROCHURE_PDF;
    a.download = 'OAVS_Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const BrochureModal = ({ isOpen, onClose, program }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.phone.trim()) {
            e.phone = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(form.phone.replace(/\s+/g, ''))) {
            e.phone = 'Enter a valid 10–15 digit phone number';
        }
        if (!form.email.trim()) {
            e.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
            e.email = 'Enter a valid email address';
        }
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setSubmitting(true);
        try {
            const nameParts = form.name.trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            const params = new URLSearchParams({
                first_name: firstName,
                last_name: lastName,
                phone: form.phone.trim(),
                email: form.email.trim(),
                program: PROGRAMME_LABELS[program] + ' (Brochure Downloaded)' || 'General (Brochure Downloaded)',
                utm_source: localStorage.getItem('utm_source') || 'direct',
                timestamp: new Date().toISOString(),
            });

            await fetch(SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: params,
            });
        } catch (err) {
            console.error('Brochure form submit error:', err);
        } finally {
            sessionStorage.setItem('brochureFormSubmitted', 'true');
            triggerDownload();
            setSubmitting(false);
            setForm({ name: '', phone: '', email: '' });
            setErrors({});
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(15, 44, 76, 0.75)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-[#163A5F] to-[#F47B20]" />

                {/* Header */}
                <div className="px-8 pt-7 pb-4 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#163A5F]">Get the OAVS Brochure</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter your details below and we'll send you the brochure instantly.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 mt-1 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="px-8 pb-8 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Full Name *
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Phone Number *
                        </label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="98765 43210"
                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all`}
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Email Address *
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'} rounded-xl text-sm focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-[#F47B20] hover:bg-[#d66a15] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        {submitting ? 'Downloading…' : 'Download Brochure'}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                        Your information is safe with us. No spam, ever.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default BrochureModal;
