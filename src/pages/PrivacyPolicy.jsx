import React from 'react';
import { Shield, Mail, Phone, Globe, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = ({ navigate }) => {
    const sections = [
        {
            number: '1',
            title: 'Information We Collect',
            content: (
                <>
                    <p className="mb-4 text-gray-600">We may collect the following categories of information:</p>

                    <h4 className="font-semibold text-[#163A5F] mb-2">a) Personal Information You Provide</h4>
                    <p className="mb-3 text-gray-600">When you fill out a contact form, admissions form, enquiry form, or otherwise communicate with us, we may collect:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-6 ml-2">
                        <li>Full name</li>
                        <li>Phone number</li>
                        <li>Email address</li>
                        <li>Educational details</li>
                        <li>Course or program interest</li>
                        <li>City, state, or address</li>
                        <li>Any message, enquiry, or document you voluntarily submit</li>
                    </ul>

                    <h4 className="font-semibold text-[#163A5F] mb-2">b) Automatically Collected Information</h4>
                    <p className="mb-3 text-gray-600">When you access our website, certain technical information may be collected automatically, such as:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-6 ml-2">
                        <li>IP address</li>
                        <li>Browser type</li>
                        <li>Device type</li>
                        <li>Operating system</li>
                        <li>Referring website</li>
                        <li>Pages visited</li>
                        <li>Date and time of visit</li>
                        <li>Basic usage and interaction data</li>
                    </ul>

                    <h4 className="font-semibold text-[#163A5F] mb-2">c) Cookies and Similar Technologies</h4>
                    <p className="text-gray-600">We may use cookies or similar technologies to improve website functionality, analyze traffic, remember preferences, and enhance user experience.</p>
                </>
            ),
        },
        {
            number: '2',
            title: 'How We Use Your Information',
            content: (
                <>
                    <p className="mb-3 text-gray-600">We may use your information for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 ml-2">
                        <li>To respond to your enquiries</li>
                        <li>To process admissions-related interest or requests</li>
                        <li>To provide information about courses, fellowships, training programs, events, and updates</li>
                        <li>To communicate with you regarding applications, counselling, or academic opportunities</li>
                        <li>To improve our website, services, and user experience</li>
                        <li>To maintain security and prevent misuse of the website</li>
                        <li>To comply with legal or regulatory obligations</li>
                    </ul>
                    <p className="mt-4 text-gray-600">The website publicly promotes admissions and describes OAVS as focused on developing industry-ready vision science professionals through structured optometry and clinical training pathways.</p>
                </>
            ),
        },
        {
            number: '3',
            title: 'Legal Basis for Processing',
            content: (
                <>
                    <p className="mb-3 text-gray-600">Where applicable, we process your information on one or more of the following grounds:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 ml-2">
                        <li>Your consent</li>
                        <li>Performance of a requested service or pre-admission communication</li>
                        <li>Compliance with legal obligations</li>
                        <li>Our legitimate interests in operating, securing, and improving our academic website and communication channels</li>
                    </ul>
                </>
            ),
        },
        {
            number: '4',
            title: 'Sharing of Information',
            content: (
                <>
                    <p className="mb-3 text-gray-600">We do not sell your personal information. We may share your information only in the following situations:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">
                        <li>With authorized internal staff or academic/admin teams</li>
                        <li>With service providers who help us operate the website, forms, hosting, analytics, or communications</li>
                        <li>With legal, regulatory, or government authorities if required by law</li>
                        <li>In connection with protection of our rights, safety, systems, or users</li>
                    </ul>
                    <p className="text-gray-600">Any third-party service providers engaged by us are expected to handle personal data appropriately and only for authorized purposes.</p>
                </>
            ),
        },
        {
            number: '5',
            title: 'Data Retention',
            content: (
                <>
                    <p className="mb-3 text-gray-600">We retain your personal information only for as long as necessary for:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">
                        <li>Responding to your enquiry</li>
                        <li>Managing admissions or academic communication</li>
                        <li>Complying with legal obligations</li>
                        <li>Resolving disputes</li>
                        <li>Maintaining legitimate business and administrative records</li>
                    </ul>
                    <p className="text-gray-600">Once the information is no longer required, we will delete, anonymize, or securely store it as appropriate.</p>
                </>
            ),
        },
        {
            number: '6',
            title: 'Data Security',
            content: (
                <p className="text-gray-600">We implement reasonable technical and organizational safeguards to protect your information from unauthorized access, misuse, alteration, disclosure, or loss. However, no online platform or transmission method is completely secure, and therefore we cannot guarantee absolute security.</p>
            ),
        },
        {
            number: '7',
            title: 'Your Rights',
            content: (
                <>
                    <p className="mb-3 text-gray-600">Depending on applicable law, you may have the right to:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">
                        <li>Request access to your personal data</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to or restrict certain processing</li>
                        <li>Withdraw consent where processing is based on consent</li>
                        <li>Request details about how your information is used</li>
                    </ul>
                    <p className="text-gray-600">To exercise any of these rights, please contact us using the details provided below.</p>
                </>
            ),
        },
        {
            number: '8',
            title: "Children's Privacy",
            content: (
                <p className="text-gray-600">Our website and academic offerings are intended for students, parents, professionals, and interested applicants. If personal information of a minor is submitted, it should be done with the involvement or consent of a parent or legal guardian wherever required under applicable law.</p>
            ),
        },
        {
            number: '9',
            title: 'Third-Party Links',
            content: (
                <p className="text-gray-600">Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, content, or security of those external websites. Users are encouraged to review the privacy policies of such third-party platforms before sharing information.</p>
            ),
        },
        {
            number: '10',
            title: 'International Access',
            content: (
                <p className="text-gray-600">If you access our website from outside India, please note that your information may be processed and stored in jurisdictions where our website infrastructure or service providers operate. By using the site, you understand and agree to such processing, subject to applicable law.</p>
            ),
        },
        {
            number: '11',
            title: 'Changes to This Privacy Policy',
            content: (
                <p className="text-gray-600">We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or website functionality. Any revised version will be posted on this page with an updated effective date.</p>
            ),
        },
        {
            number: '12',
            title: 'Contact Us',
            content: (
                <>
                    <p className="mb-4 text-gray-600">For any privacy-related questions, requests, or concerns, you may contact:</p>
                    <div className="bg-gradient-to-br from-[#163A5F] to-[#0F2C4C] rounded-2xl p-6 md:p-8 text-white">
                        <p className="font-bold text-lg mb-5 font-heading">OAVS – Ophthall Academy of Vision Sciences</p>
                        <div className="space-y-3">
                            <a href="https://oavs.ophthall.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#F47B20] transition-colors">
                                <Globe size={18} className="text-[#F47B20] flex-shrink-0" />
                                <span>https://oavs.ophthall.in/</span>
                            </a>
                            <a href="tel:+919176944244" className="flex items-center gap-3 text-gray-300 hover:text-[#F47B20] transition-colors">
                                <Phone size={18} className="text-[#F47B20] flex-shrink-0" />
                                <span>+91 91769 44244</span>
                            </a>
                            <a href="mailto:academy@ophthall.in" className="flex items-center gap-3 text-gray-300 hover:text-[#F47B20] transition-colors">
                                <Mail size={18} className="text-[#F47B20] flex-shrink-0" />
                                <span>academy@ophthall.in</span>
                            </a>
                        </div>
                    </div>
                </>
            ),
        },
        {
            number: '13',
            title: 'Consent',
            content: (
                <p className="text-gray-600">By using our website, submitting forms, or contacting us through the website, you consent to the collection and use of your information in accordance with this Privacy Policy.</p>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#163A5F] via-[#1e4a73] to-[#0F2C4C] pt-32 pb-20 px-4 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-64 h-64 bg-[#F47B20]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#F47B20]/5 rounded-full blur-xl" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                        <Shield size={36} className="text-[#F47B20]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-heading tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Your privacy matters to us. Learn how we collect, use, and protect your information.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300 border border-white/10">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Effective Date: April 13, 2026
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 py-16">
                {/* Back button */}
                <button
                    onClick={() => navigate('home')}
                    className="flex items-center gap-2 text-[#163A5F] hover:text-[#F47B20] transition-colors mb-10 group text-sm font-semibold"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                    <p className="text-gray-600 leading-relaxed">
                        OAVS – Ophthall Academy of Vision Sciences ("OAVS," "we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us through our website,{' '}
                        <a href="https://oavs.ophthall.in/" target="_blank" rel="noopener noreferrer" className="text-[#F47B20] hover:underline font-medium">
                            https://oavs.ophthall.in/
                        </a>. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with us for admissions, enquiries, or other academic-related services. The site publicly identifies the academy as Ophthall Academy of Vision Sciences and lists contact details including{' '}
                        <span className="font-medium text-[#163A5F]">+91 91769 44244</span> and{' '}
                        <a href="mailto:academy@ophthall.in" className="text-[#F47B20] hover:underline font-medium">academy@ophthall.in</a>.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section) => (
                        <div
                            key={section.number}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#F47B20] to-[#e06a10] rounded-xl flex items-center justify-center text-white font-bold text-sm font-heading shadow-sm">
                                    {section.number}
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold text-[#163A5F] font-heading pt-1">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="ml-0 md:ml-14 leading-relaxed">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-[#F47B20]/10 to-[#163A5F]/10 rounded-2xl p-8 border border-[#F47B20]/20">
                        <p className="text-gray-600 mb-4">Have questions about your privacy?</p>
                        <a
                            href="mailto:academy@ophthall.in"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F47B20] to-[#e06a10] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F47B20]/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Mail size={18} />
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
