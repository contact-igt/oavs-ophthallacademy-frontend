import React from 'react';
import { BookOpen, Clock, Calendar, MapPin, Download, Award } from 'lucide-react';
import Button from '../components/common/Button';
import CheckItem from '../components/common/CheckItem';

const CourseDispensing = ({ navigate }) => (
    <div className="pt-24 min-h-screen bg-white">
        {/* Header */}
        <div className="relative bg-[#163A5F] text-white py-24 px-4 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="./assets/optical_dispensing.png"
                    className="w-full h-full object-cover opacity-20"
                    alt="Optical Frames"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#163A5F] to-transparent"></div>
            </div>
            <div className="max-w-5xl mx-auto relative z-10">
                <span className="text-[#F47B20] font-bold tracking-wider uppercase text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">Certificate Course</span>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4">Optical Dispensing</h1>
                <p className="text-blue-100 max-w-2xl text-lg mb-8">Master the art and science of eyewear fitting, sales, and store management.</p>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => navigate('admissions')} variant="primary" className="gap-2">
                        <Download size={20} /> Download Brochure
                    </Button>
                </div>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-12">
            {/* Main Content */}
            <div className="md:col-span-3 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6 flex items-center gap-2">
                        <BookOpen className="text-[#F47B20]" /> What You Will Learn
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <CheckItem text="Prescription reading & transposition" />
                        <CheckItem text="Progressive additional lenses (PAL)" />
                        <CheckItem text="Frame adjustments & Face fit" />
                        <CheckItem text="Lensometry (SV, PAL, Prism)" />
                        <CheckItem text="Optical retail workflow" />
                        <CheckItem text="Customer handling & troubleshooting" />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6">Who Should Apply?</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['Opticians', 'Optical store staff', 'Diploma Holders', 'Fresh Graduates'].map(i => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-blue-50 transition-colors cursor-default border border-gray-100">
                                {i}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2">
                <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#F47B20]">
                    <h3 className="text-xl font-bold text-[#163A5F] mb-6">Course Details</h3>

                    <div className="space-y-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Duration</p>
                                <p className="font-semibold">6 Months</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Start Date</p>
                                <p className="font-semibold">April 1, 2026</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Mode of Delivery</p>
                                <p className="font-semibold">Hybrid learning</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-[#163A5F]">
                                <Award size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Certification</p>
                                <p className="font-semibold">Provided to all successful candidates</p>
                            </div>
                        </div>
                    </div>

                    <Button onClick={() => navigate('admissions')} className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    </div>
);

export default CourseDispensing;
