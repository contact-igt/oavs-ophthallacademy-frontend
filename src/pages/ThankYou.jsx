import React from 'react';
import { CheckCircle, Home, BookOpen, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Section from '../components/common/Section';

const ThankYou = ({ navigate }) => {
    return (
        <div className="pt-24 min-h-screen bg-[#F5F7FA]">
            <Section>
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full text-green-600 animate-bounce">
                            <CheckCircle size={64} />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#163A5F] mb-6 tracking-tight">
                        Thank You!
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        Your application has been successfully submitted. We're excited to have you join the
                        <span className="text-[#F47B20] font-semibold"> Ophthall Academy of Vision Sciences</span>.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12 text-left">
                        <h3 className="text-xl font-bold text-[#163A5F] mb-4 flex items-center gap-2">
                            What's Next?
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full">
                                    <ArrowRight size={14} />
                                </div>
                                <span>Check your email for a confirmation of your submission.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full">
                                    <ArrowRight size={14} />
                                </div>
                                <span>Our admissions team will review your details within 2-3 working days.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full">
                                    <ArrowRight size={14} />
                                </div>
                                <span>Keep your academic documents ready for the next stage of the application.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            className="flex items-center justify-center gap-2"
                            onClick={() => navigate('home')}
                        >
                            <Home size={18} />
                            Back to Home
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                            onClick={() => navigate('dispensing')}
                        >
                            <BookOpen size={18} />
                            Explore Courses
                        </Button>
                    </div>
                </div>
            </Section>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-[#163A5F] via-[#F47B20] to-[#163A5F]"></div>
        </div>
    );
};

export default ThankYou;
