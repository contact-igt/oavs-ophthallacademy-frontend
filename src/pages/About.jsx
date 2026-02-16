import React from 'react';
import CheckItem from '../components/common/CheckItem';

const About = () => (
    <div className="pt-24 min-h-screen bg-[#F5F7FA]">
        <div className="bg-[#163A5F] text-white py-20 px-4 mb-12 relative overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                alt="Institution Building"
            />
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About OAVS</h1>
                <p className="text-blue-100 text-lg">Leading Optometry Training Institute in India</p>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-20">
            {/* Legacy Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="bg-white rounded-3xl p-10 shadow-lg h-full">
                    <h2 className="text-2xl font-bold text-[#163A5F] mb-6">Our Legacy</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Ophthall Academy of Vision Sciences (OAVS) is a dedicated optometry training institute in India committed to transforming clinical education. Founded by Dr. Tamilarasan Senthil, OAVS was built to address the growing demand for skilled optometrists across hospitals and optical retail chains. This is a part of Ophthall Practice Development and is run by Ophthalmologists and senior-level leaders in Optometry.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#F47B20]">
                        <h3 className="font-bold text-[#163A5F] mb-2">Our Mission</h3>
                        <p className="text-gray-700 italic">"To build India's most practical and trusted optometry education ecosystem."</p>
                    </div>
                </div>
                <div className="h-full rounded-3xl overflow-hidden shadow-xl">
                    <img
                        src="/assets/about.png"
                        alt="Medical Team"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Gap/Solution Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#163A5F]">
                    <h3 className="text-xl font-bold text-[#163A5F] mb-4">The Industry Gap</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">India's optometry industry is valued between ₹8,000–20,000 crore. However, the lack of structured clinical training creates a huge gap between academic qualification and job readiness.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#F47B20]">
                    <h3 className="text-xl font-bold text-[#163A5F] mb-4">The OAVS Solution</h3>
                    <div className="space-y-3">
                        <CheckItem text="Real clinical exposure" />
                        <CheckItem text="Case-based discussions" />
                        <CheckItem text="Structured evaluation" />
                        <CheckItem text="Supervised mentoring" />
                    </div>
                </div>
            </div>

            {/* Faculty Section */}
            <section className="mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-4">Faculty & Academic Leadership</h2>
                    <div className="w-20 h-1 bg-[#F47B20] mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Dr. Tamilarasan Senthil */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#163A5F] mb-1">Dr. Tamilarasan Senthil</h3>
                            <p className="text-[#F47B20] font-bold text-sm uppercase tracking-wider mb-4">Founder & Chief Mentor</p>
                            <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-4">
                                Ophthalmologist, healthcare entrepreneur, and practice development expert. Dr. Senthil brings deep experience in clinical care and healthcare leadership with a strong focus on building skill-based training ecosystems.
                            </p>
                        </div>
                    </div>

                    {/* Dr. Viswanathan S. */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#163A5F] mb-1">Dr. Viswanathan S.</h3>
                            <p className="text-[#F47B20] font-bold text-sm uppercase tracking-wider mb-4">Senior Faculty & Clinical Mentor</p>
                            <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-4">
                                An experienced clinician and educator with strong involvement in optometric education and clinical training.
                            </p>
                        </div>
                    </div>

                    {/* Dr. Anuja R. Singh */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 lg:col-span-2 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-full -mr-24 -mt-24 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#163A5F] mb-1">Dr. Anuja R. Singh</h3>
                            <p className="text-[#F47B20] font-bold text-sm uppercase tracking-wider mb-4">Senior Academic Advisor & Faculty</p>
                            <div className="grid md:grid-cols-1 gap-6">
                                <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-4">
                                    Over 30 years of experience as a clinical optometrist, educator, trainer, academician, and administrator. An alumna of the Elite School of Optometry (1993), she served as Head of Department and Principal at The Sankara Nethralaya Academy (TSNA) for over a decade. She has played a key role in developing fellowships, certificate programs, and degree courses.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mr. Arun */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 lg:col-span-2 group relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-50 rounded-tl-full -mr-16 -mb-16 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#163A5F] mb-1">Mr. Arun</h3>
                            <p className="text-[#F47B20] font-bold text-sm uppercase tracking-wider mb-4">Faculty – Optical Dispensing & Practice Management</p>
                            <p className="text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-4">
                                Industry professional with extensive hands-on experience in optical dispensing, retail operations, and practical training.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
);

export default About;
