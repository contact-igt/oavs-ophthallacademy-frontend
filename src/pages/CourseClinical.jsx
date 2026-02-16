import React from 'react';
import { Eye, Clock, Calendar, CheckCircle, Download } from 'lucide-react';
import Button from '../components/common/Button';
import CheckItem from '../components/common/CheckItem';

const CourseClinical = ({ navigate }) => (
    <div className="pt-24 min-h-screen bg-white">
        <div className="relative bg-[#163A5F] text-white py-24 px-4 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="./assets/clinic_optometry.png"
                    className="w-full h-full object-cover opacity-20"
                    alt="Slit Lamp Exam"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#163A5F] to-transparent"></div>
            </div>
            <div className="max-w-5xl mx-auto relative z-10">
                <span className="text-[#F47B20] font-bold tracking-wider uppercase text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">Fellowship Program</span>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4">Clinical Optometry</h1>
                <p className="text-blue-100 max-w-2xl text-lg mb-8">An advanced clinical optometry fellowship with 200+ mandatory full workups.</p>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => navigate('admissions')} variant="primary" className="gap-2">
                        <Download size={20} /> Download Brochure
                    </Button>
                </div>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6 flex items-center gap-2">
                        <Eye className="text-[#F47B20]" /> Comprehensive Clinical Training
                    </h2>
                    <p className="mb-6 text-gray-600 text-lg">This program is designed to develop independent OPD handling skills through rigorous practice.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <CheckItem text="Extensive history taking" />
                        <CheckItem text="Refraction & retinoscopy" />
                        <CheckItem text="Slit lamp examination" />
                        <CheckItem text="Tonometry & gonioscopy" />
                        <CheckItem text="Binocular vision assessment" />
                        <CheckItem text="Pupillary examination" />
                        <CheckItem text="Colour vision testing" />
                        <CheckItem text="Patient counselling" />
                    </div>
                </section>

                <div className="bg-[#F5F7FA] p-6 rounded-xl border border-blue-100 flex items-start gap-4 shadow-sm">
                    <div className="bg-[#F47B20] p-3 rounded-full text-white mt-1 shrink-0">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#163A5F] text-lg">Mandatory Requirement</h3>
                        <p className="text-gray-700 mt-1">Minimum <span className="font-bold">200 full workups</span> are required for certification, ensuring you are industry-ready.</p>
                    </div>
                </div>
            </div>

            <div className="md:col-span-1">
                <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#F47B20]">
                    <h3 className="text-xl font-bold text-[#163A5F] mb-6">Program Details</h3>
                    <div className="space-y-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]"><Clock size={20} /></div>
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Duration</p><p className="font-semibold">6 Months</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]"><Calendar size={20} /></div>
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Start Date</p><p className="font-semibold">April 2026</p></div>
                        </div>
                    </div>
                    <Button onClick={() => navigate('admissions')} className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    </div>
);

export default CourseClinical;
