import React from 'react';
import {
    Eye, GraduationCap, BookOpen, Calendar,
    CheckCircle, Clock
} from 'lucide-react';
import Button from '../components/common/Button';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import CheckItem from '../components/common/CheckItem';

const Home = ({ navigate }) => (
    <>
        {/* Hero Section */}
        <div className="relative bg-[#163A5F] text-white pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Clinical Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#163A5F] via-[#163A5F]/90 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm">
                        Admissions Open: April 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                        Industry-Ready <br />
                        <span className="text-[#F47B20]">Optometry Courses</span> in India
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed font-light">
                        Bridging the gap between academic education and real-world clinical optometry practice through structured fellowships.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => navigate('admissions')}>Apply Now</Button>
                        <Button variant="secondary" onClick={() => navigate('admissions')}>Download Brochure</Button>
                    </div>
                </div>

                {/* Hero Image / Graphic */}
                <div className="hidden md:flex justify-end relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 w-full max-w-md hero-image-mask">
                        <img
                            src="./assets/optometry_banner.png"
                            alt="Optometry Student"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#163A5F] to-transparent p-6 pt-20">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-[#F47B20] p-2 rounded-lg">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Clinical Certified</p>
                                    <p className="text-xs text-blue-200">Join 500+ Alumni</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Transforming Clinical Optometry */}
        <Section className="bg-white">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                    <div className="absolute -inset-4 bg-[#F47B20]/10 rounded-3xl transform -rotate-3"></div>
                    <img
                        src="./assets/optometry.png"
                        alt="Clinical Training"
                        className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border-l-4 border-[#F47B20] max-w-xs">
                        <p className="text-sm text-gray-600 italic">
                            "OAVS bridges the gap between theory and practice."
                        </p>
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-6">Transforming Clinical Optometry Training</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        Ophthall Academy of Vision Sciences (OAVS), offers structured, hands-on optometry training programs designed to prepare you for the real world.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <CheckItem text="Practical clinical exposure in hospital settings" />
                        <CheckItem text="Supervised patient handling & diagnosis" />
                        <CheckItem text="Structured evaluations & mentorship" />
                        <CheckItem text="Industry-aligned curriculum" />
                    </div>
                </div>
            </div>
        </Section>

        {/* Programs Section */}
        <Section className="bg-[#F5F7FA]">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-4">Our Optometry Programs</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Focused, intensive, and industry-oriented courses designed for your career growth.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                    <Card
                        title="Optical Dispensing"
                        desc="A 6-month course for opticians and retail professionals to master lens fitting, sales, and store operations."
                        image="./assets/optical_dispensing.png"
                        onClick={() => navigate('dispensing')}
                    />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                    <Card
                        title="Fellowship in Clinical Optometry"
                        desc="An advanced 6-month fellowship requiring 200+ full patient workups under supervision."
                        image="./assets/clinic_optometry.png"
                        onClick={() => navigate('clinical')}
                    />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                    <Card
                        title="Fellowship in Contact Lenses"
                        desc="Level 1 specialization covering Soft, Toric, and RGP fittings with complication management."
                        image="/assets/contactlens.png"
                        onClick={() => navigate('contact-lens')}
                    />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                    <Card
                        title="Fellowship in Orthoptics & Vision Therapy"
                        desc="6-month advanced training in binocular vision disorders, squint evaluation, and structured vision therapy programs."
                        image="/assets/orthoptics.png"
                        onClick={() => navigate('orthoptics')}
                    />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                    <Card
                        title="Fellowship in Low Vision Care"
                        desc="Specialized 6-month clinical training in low vision assessment, rehabilitation, and assistive device prescription."
                        image="/assets/low_vision.png"
                        onClick={() => navigate('low-vision')}
                    />
                </div>
            </div>
        </Section>

        {/* Why Choose OAVS */}
        <Section className="bg-white">
            <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] text-center mb-16">Why Choose OAVS?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                    { icon: Clock, label: "6-Month Structured Training" },
                    { icon: GraduationCap, label: "Small Batch Size" },
                    { icon: BookOpen, label: "Industry-Ready Curriculum" },
                    { icon: Eye, label: "Supervised Clinical Posting" },
                    { icon: CheckCircle, label: "Certification Upon Completion" },
                    { icon: Calendar, label: "April 2026 Intake" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:border-[#F47B20] hover:shadow-lg transition-all group bg-white">
                        <div className="bg-[#163A5F] p-4 rounded-full text-white mb-4 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                            <item.icon size={24} />
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-[#163A5F]">{item.label}</h4>
                    </div>
                ))}
            </div>
        </Section>

        {/* CTA Section */}
        <section className="bg-[#0F2C4C] py-20 px-4 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Admissions Open – April 2026</h2>
                <p className="text-blue-200 mb-10 max-w-2xl mx-auto">Limited seats available for the upcoming batch. Secure your future in clinical optometry today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button onClick={() => navigate('admissions')}>Apply Now</Button>
                    <Button variant="secondary" onClick={() => navigate('admissions')}>Download Brochure</Button>
                </div>
            </div>
        </section>
    </>
);

export default Home;
