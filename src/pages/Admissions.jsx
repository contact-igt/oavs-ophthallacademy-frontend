import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button';

const Admissions = ({ navigate }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleGoogleSheetForm = async (formData) => {
        try {
            const res = await fetch("https://script.google.com/macros/s/AKfycbxgH70HZ6IGqfvZnAT4XmEuSMhQDxFftEvjiKT8YarfVcytAJbIrB2yakBZo_Z6x3Hl/exec", {
                method: "POST",
                mode: "no-cors",
                body: formData
            });
            console.log(res);
            return true;
        } catch (err) {
            console.error("Sheet Error:", err);
            return false;
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            let ip = "Not captured";
            try {
                const ipResponse = await fetch("https://api64.ipify.org?format=json");
                if (ipResponse.ok) {
                    const ipData = await ipResponse.json();
                    ip = ipData.ip;
                } else {
                    throw new Error("Ipify failed");
                }
            } catch (error) {
                console.warn("Primary IP fetch failed, trying fallback...", error);
                try {
                    const fallbackRes = await fetch("https://ipapi.co/json/");
                    if (fallbackRes.ok) {
                        const fallbackData = await fallbackRes.json();
                        ip = fallbackData.ip;
                    }
                } catch (fallbackError) {
                    console.error("All IP fetch attempts failed:", fallbackError);
                }
            }

            const formData = {
                // Spread data but ensure we map keys correctly for the sheet
                first_name: data.firstName?.trim(),
                last_name: data.lastName?.trim(),
                email_address: data.email?.trim(),
                phone: data.phone?.trim(),
                program: data.program?.trim(),
                ip: ip,
                utm_source: localStorage.getItem("utm_source") || "direct",
                timestamp: new Date().toISOString()
            };

            console.log("Submitting Form Data:", formData);

            const params = new URLSearchParams();
            Object.keys(formData).forEach((key) => {
                const value = formData[key];
                params.append(key, value !== undefined && value !== null ? String(value) : "");
            });

            console.log("Final Payload:", params.toString());

            const success = await handleGoogleSheetForm(params);

            if (success) {
                reset();
                navigate('thank-you');
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-[#F5F7FA]">
            <div className="bg-[#163A5F] text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Admissions Open</h1>
                    <p className="text-xl text-[#F47B20] font-semibold tracking-wide">April 2026 Intake</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-20 pb-20">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Information Column */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#163A5F]">
                            <h2 className="text-2xl font-bold text-[#163A5F] mb-6">Eligibility</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 rounded-full bg-[#F47B20] mt-1.5 shadow-sm"></div>
                                    <p className="text-gray-700"><span className="font-bold text-[#163A5F]">UG Degree in Optometry:</span> Required for Fellowship programs.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 rounded-full bg-[#F47B20] mt-1.5 shadow-sm"></div>
                                    <p className="text-gray-700"><span className="font-bold text-[#163A5F]">Diploma/Degree Holders:</span> Eligible for Optical Dispensing.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 rounded-full bg-[#F47B20] mt-1.5 shadow-sm"></div>
                                    <p className="text-gray-700">Open to both <span className="font-semibold">Fresh Graduates</span> and <span className="font-semibold">Working Professionals</span>.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold text-[#163A5F] mb-6">Application Process</h2>
                            <div className="space-y-8 relative pl-2">
                                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>
                                {[
                                    { step: "1", title: "Fill Online Application", desc: "Complete the form on this page." },
                                    { step: "2", title: "Upload Documents", desc: "Attach your academic credentials." },
                                    { step: "3", title: "Admission Review", desc: "Our team will review your profile." },
                                    { step: "4", title: "Fee Confirmation", desc: "Secure your seat for April 2026." }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-6 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-[#163A5F] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                                            {s.step}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-800">{s.title}</h4>
                                            <p className="text-gray-500 mt-1">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl h-fit border-t-8 border-[#F47B20]">
                        <h2 className="text-2xl font-bold text-[#163A5F] mb-2">Start Application</h2>
                        <p className="text-gray-500 mb-8 text-sm">Fields marked with * are mandatory.</p>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        {...register("firstName", { required: "First name is required" })}
                                        className={`w-full bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-lg p-3.5 focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all font-medium`}
                                        placeholder="John"
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        {...register("lastName", { required: "Last name is required" })}
                                        className={`w-full bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-lg p-3.5 focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all font-medium`}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg p-3.5 focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all font-medium`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                                        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
                                    })}
                                    className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg p-3.5 focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all font-medium`}
                                    placeholder="98765 43210"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Interested Program *</label>
                                <select
                                    {...register("program", { required: "Please select a program" })}
                                    className={`w-full bg-gray-50 border ${errors.program ? 'border-red-500' : 'border-gray-200'} rounded-lg p-3.5 focus:ring-2 focus:ring-[#F47B20] focus:border-transparent outline-none transition-all font-medium`}
                                >
                                    <option value="">Select a program</option>
                                    <option value="Clinical Optometry">Fellowship in Clinical Optometry</option>
                                    <option value="Contact Lenses">Fellowship in Contact Lenses</option>
                                    <option value="Orthoptics">Fellowship in Orthoptics & Vision Therapy</option>
                                    <option value="Low Vision">Fellowship in Low Vision Care</option>
                                    <option value="Optical Dispensing">Optical Dispensing Certificate</option>
                                </select>
                                {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>}
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full text-lg shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-orange-500/40'}`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-4">By clicking submit, you agree to be contacted by OAVS.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
