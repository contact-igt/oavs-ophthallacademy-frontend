import React from 'react';
import {
    Clock, Calendar, Users, Award, MapPin,
    BookOpen, GraduationCap, Star, Phone, Mail,
    Globe, Building2, CheckCircle, Banknote
} from 'lucide-react';
import Button from '../components/common/Button';
import CheckItem from '../components/common/CheckItem';
import { Download } from 'lucide-react';

const Internship = ({ navigate, onBrochureDownload }) => (
    <div className="pt-20 min-h-screen bg-white">

        {/* Hero Banner */}
        <div className="relative bg-[#163A5F] text-white py-24 px-4 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/assets/internship.png"
                    className="w-full h-full object-cover object-[100%_10%] opacity-15"
                    alt="Clinical Internship"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#163A5F] via-[#163A5F]/90 to-transparent" />
            </div>
            <div className="max-w-5xl mx-auto relative z-10">
                <span className="text-[#F47B20] font-bold tracking-wider uppercase text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    UG Clinical Internship
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
                    Clinical Optometry<br />
                    <span className="text-[#F47B20]">Internship Programme</span>
                </h1>
                <p className="text-blue-100 max-w-2xl text-lg mb-8">
                    A structured one-year clinical internship for final-year UG optometry students — bridging theory with real-world hospital practice.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => navigate('admissions')} variant="primary">
                        Apply Now
                    </Button>
                    <Button variant="secondary" onClick={onBrochureDownload}>
                        <span className="flex items-center gap-2"><Download size={18} /> Download Brochure</span>
                    </Button>
                    {/* <Button
                        variant="secondary"
                        onClick={() => {
                            const el = document.getElementById('internship-contact');
                            if (el) {
                                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                                const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
                                window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}
                    >
                        Contact Us
                    </Button> */}
                </div>
            </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="bg-[#F47B20] text-white py-6 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                    { value: '1 Year', label: 'Duration' },
                    { value: '100 Seats', label: 'Total Intake' },
                    { value: '₹60,000', label: 'Course Fee (+ GST)' },
                    { value: 'July 2026', label: 'First Batch' },
                ].map((stat) => (
                    <div key={stat.label}>
                        <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                        <p className="text-sm text-orange-100 font-medium mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content + Sidebar */}
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-12">

            {/* Left — Main Content */}
            <div className="md:col-span-3 space-y-14">

                {/* Objective */}
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-4 flex items-center gap-2">
                        <BookOpen className="text-[#F47B20]" /> Programme Overview
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Ophthall Academy of Vision Sciences offers a <strong>one-year internship in Clinical Optometry</strong> for UG students during their fourth and final year of study.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                        The objective of the internship is to make students well-versed in clinical procedures &amp; diagnostics, and enable them to perform accurate preliminary examination for patients in an eye OPD.
                    </p>
                </section>

                {/* Salient Features */}
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6 flex items-center gap-2">
                        <Star className="text-[#F47B20]" /> Salient Features
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <CheckItem text="Weekly classes by expert faculty members" />
                        <CheckItem text="Postings in well-recognised & reputed eye hospitals across India" />
                        <CheckItem text="Stipend provided during internship" />
                        <CheckItem text="Regular mentor meetings" />
                        <CheckItem text="Absorption as staff optometrist on completion in reputed eye hospitals" />
                    </div>
                </section>

                {/* Batches */}
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6 flex items-center gap-2">
                        <Calendar className="text-[#F47B20]" /> Batch Dates
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            {
                                label: 'First Batch',
                                date: '1st July 2026',
                                note: 'Limited seats — apply early',
                            },
                            {
                                label: 'Second Batch',
                                date: '1st August 2026',
                                note: 'Final intake for 2026',
                            },
                        ].map((batch) => (
                            <div
                                key={batch.label}
                                className="bg-gradient-to-br from-[#163A5F] to-[#1e4d7a] text-white p-6 rounded-2xl shadow-lg"
                            >
                                <span className="text-xs font-bold uppercase tracking-widest text-[#F47B20] bg-white/10 px-2 py-0.5 rounded-full">
                                    {batch.label}
                                </span>
                                <p className="text-2xl font-black mt-3">{batch.date}</p>
                                <p className="text-blue-200 text-sm mt-1">{batch.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Eligibility */}
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-4 flex items-center gap-2">
                        <GraduationCap className="text-[#F47B20]" /> Eligibility Criteria
                    </h2>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                        <div className="bg-[#163A5F] p-3 rounded-full text-white shrink-0">
                            <CheckCircle size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-[#163A5F] text-lg">Academic Requirement</p>
                            <p className="text-gray-600 mt-1">
                                Candidate must have completed <strong>3 years of academic studies in Optometry</strong> (currently in their 4th / final year).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fees */}
                <section>
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-4 flex items-center gap-2">
                        <Banknote className="text-[#F47B20]" /> Fee Structure
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-[#163A5F] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold uppercase tracking-wide">Component</th>
                                    <th className="px-6 py-4 text-right font-bold uppercase tracking-wide">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="px-6 py-4 text-gray-700">Course Fee</td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-800">₹60,000</td>
                                </tr>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">GST (18%)</td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-800">₹10,800</td>
                                </tr>
                                <tr className="bg-orange-50">
                                    <td className="px-6 py-4 font-bold text-[#163A5F]">Total</td>
                                    <td className="px-6 py-4 text-right font-black text-[#F47B20] text-base">₹70,800</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Contact */}
                <section id="internship-contact">
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6 flex items-center gap-2">
                        <Phone className="text-[#F47B20]" /> Contact Details
                    </h2>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-[#163A5F] to-[#F47B20]" />
                        <div className="p-6 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#163A5F]">Ophthall Academy of Vision Sciences</p>
                                    <p className="text-gray-500 text-sm">A division of Welcare Health Systems Pvt Ltd</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <p className="text-gray-700">No 1252, Golden Colony, Mogappair, Chennai – 600050</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Course Incharge</p>
                                    <p className="font-bold text-[#163A5F]">Dr Anuja R Singh</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <Phone size={20} />
                                </div>
                                <a
                                    href="tel:+919176944244"
                                    className="text-[#163A5F] font-semibold hover:text-[#F47B20] transition-colors"
                                >
                                    +91 91769 44244
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <Mail size={20} />
                                </div>
                                <a
                                    href="mailto:academy@ophthall.in"
                                    className="text-[#163A5F] font-semibold hover:text-[#F47B20] transition-colors"
                                >
                                    academy@ophthall.in
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                    <Globe size={20} />
                                </div>
                                <a
                                    href="https://www.ophthall.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#163A5F] font-semibold hover:text-[#F47B20] transition-colors"
                                >
                                    www.ophthall.in
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Right — Sticky Sidebar */}
            <div className="md:col-span-2">
                <div className="sticky top-28 space-y-6">
                    {/* Details Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#F47B20]">
                        <h3 className="text-xl font-bold text-[#163A5F] mb-6">Programme Details</h3>
                        <div className="space-y-5">
                            {[
                                { Icon: Clock, label: 'Duration', value: '1 Year' },
                                { Icon: Calendar, label: 'Batches', value: 'Jul & Aug 2026' },
                                { Icon: Users, label: 'Total Intake', value: '100 Seats Only' },
                                { Icon: GraduationCap, label: 'Eligibility', value: '3 Years of Optometry' },
                                { Icon: Banknote, label: 'Course Fee', value: '₹60,000 + 18% GST' },
                                { Icon: Award, label: 'Stipend', value: 'Provided during internship' },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <div className="bg-blue-50 p-3 rounded-full text-[#163A5F] shrink-0">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">{label}</p>
                                        <p className="font-semibold text-gray-800">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => navigate('admissions')} className="w-full mt-8">
                            Apply Now
                        </Button>
                    </div>

                    {/* Highlight Pill */}
                    <div className="bg-gradient-to-br from-[#163A5F] to-[#0F2C4C] text-white p-6 rounded-2xl shadow-lg">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#F47B20] mb-2">Career Outcome</p>
                        <p className="font-bold text-lg leading-snug">
                            Absorption as Staff Optometrist in reputed eye hospitals on completion
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Internship;
