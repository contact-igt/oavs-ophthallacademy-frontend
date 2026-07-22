import React, { useMemo } from 'react';
import { CheckCircle, Home, BookOpen, ArrowRight, CalendarDays } from 'lucide-react';
import Button from '../components/common/Button';
import Section from '../components/common/Section';

const ThankYou = ({ navigate }) => {
    const submittedForm = useMemo(() => sessionStorage.getItem('lastSubmittedForm') || 'registration', []);
    const isSkillConnect = submittedForm === 'skillconnect';

    const pageContent = isSkillConnect
        ? {
            title: 'SkillConnect Registration Received',
            description: (
                <>
                    Thank you for registering for
                    <span className="text-[#F47B20] font-semibold"> Ophthall Academy SkillConnect 2026</span>.
                    Your workshop selection and payment details have been submitted successfully.
                </>
            ),
            cardTitle: 'What Happens Next?',
            steps: [
                'Our team will verify your payment screenshot and registration details.',
                'You will receive confirmation and workshop instructions on your registered email or WhatsApp.',
                'Please keep your transaction ID handy for any registration support queries.',
            ],
            primaryLabel: 'Back to Home',
            primaryPage: 'home',
            secondaryLabel: 'View SkillConnect',
            secondaryPage: 'skillconnect',
            SecondaryIcon: CalendarDays,
        }
        : {
            title: 'Thank You!',
            description: (
                <>
                    Your application has been successfully submitted. We're excited to have you join the
                    <span className="text-[#F47B20] font-semibold"> Ophthall Academy of Vision Sciences</span>.
                </>
            ),
            cardTitle: "What's Next?",
            steps: [
                'Check your email for a confirmation of your submission.',
                'Our admissions team will review your details within 2-3 working days.',
                'Keep your academic documents ready for the next stage of the application.',
            ],
            primaryLabel: 'Back to Home',
            primaryPage: 'home',
            secondaryLabel: 'Explore Courses',
            secondaryPage: 'dispensing',
            SecondaryIcon: BookOpen,
        };

    const SecondaryIcon = pageContent.SecondaryIcon;

    return (
        <div className="pt-20 min-h-screen bg-[#F5F7FA]">
            <Section>
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full text-green-600 animate-bounce">
                            <CheckCircle size={64} />
                        </div>
                    </div>

                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#163A5F] mb-6 tracking-tight">
                        {pageContent.title}
                    </h1>

                    <p className="font-heading text-xl text-gray-600 mb-10 leading-relaxed">
                        {pageContent.description}
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12 text-left">
                        <h3 className="font-heading text-xl font-bold text-[#163A5F] mb-4 flex items-center gap-2">
                            {pageContent.cardTitle}
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            {pageContent.steps.map((step) => (
                                <li key={step} className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full">
                                        <ArrowRight size={14} />
                                    </div>
                                    <span className="font-heading">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            className="flex items-center justify-center gap-2"
                            onClick={() => navigate(pageContent.primaryPage)}
                        >
                            <Home size={18} />
                            {pageContent.primaryLabel}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                            onClick={() => navigate(pageContent.secondaryPage)}
                        >
                            <SecondaryIcon size={18} />
                            {pageContent.secondaryLabel}
                        </Button>
                    </div>
                </div>
            </Section>

            <div className="h-2 bg-gradient-to-r from-[#163A5F] via-[#F47B20] to-[#163A5F]"></div>
        </div>
    );
};

export default ThankYou;
