import React from 'react';
import { Eye, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer = ({ navigate }) => (
    <footer className="bg-[#0f172a] text-gray-400 py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6 text-white rounded-lg">
                    <img src="/assets/logo-white.jpeg" alt="Logo" className="w-[8rem] md:w-[12rem] h-[4rem] md:h-[4.2rem] object-cover object-[50%_45%] rounded-lg" />
                </div>
                <p className="max-w-sm text-sm leading-relaxed mb-8 text-gray-400">
                    OAVS is dedicated to bridging the gap between academic education and clinical practice. We build industry-ready vision science professionals.
                </p>
                {/* <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-colors cursor-pointer group"><ExternalLink size={18} className="group-hover:text-white" /></div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#F47B20] transition-colors cursor-pointer group"><Mail size={18} className="group-hover:text-white" /></div>
                </div> */}
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                    <li onClick={() => navigate('home')} className="hover:text-[#F47B20] cursor-pointer transition-colors">Home</li>
                    <li onClick={() => navigate('about')} className="hover:text-[#F47B20] cursor-pointer transition-colors">About Us</li>
                    <li onClick={() => navigate('admissions')} className="hover:text-[#F47B20] cursor-pointer transition-colors">Admissions</li>
                    <li onClick={() => navigate('contact')} className="hover:text-[#F47B20] cursor-pointer transition-colors">Contact</li>
                    <li onClick={() => navigate('privacy-policy')} className="hover:text-[#F47B20] cursor-pointer transition-colors">Privacy Policy</li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                        <Phone size={18} className="text-[#F47B20]" />
                        <span>+91 91769 44244</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Mail size={18} className="text-[#F47B20]" />
                        <span>academy@ophthall.in</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Privacy Policy Summary */}
        <div className="pt-8 border-t border-gray-800 mb-8">
            <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto text-center">
                <span className="font-semibold text-gray-400">Privacy Policy Summary:</span> OAVS – Ophthall Academy of Vision Sciences collects personal information such as name, phone number, email, and enquiry/admission details when users contact the academy or submit forms through the website. This information is used to respond to enquiries, support admissions-related communication, improve services, and maintain website security. For privacy concerns, contact{' '}
                <a href="mailto:academy@ophthall.in" className="text-[#F47B20] hover:underline">academy@ophthall.in</a> or{' '}
                <a href="tel:+919176944244" className="text-[#F47B20] hover:underline">+91 91769 44244</a>.{' '}
                <span onClick={() => navigate('privacy-policy')} className="text-[#F47B20] hover:underline cursor-pointer font-medium">Read full Privacy Policy →</span>
            </p>
        </div>

        <div className="text-center pt-6 border-t border-gray-800 text-xs text-gray-600 font-medium tracking-wide">
            © 2026 OPH-THALL ACADEMY OF VISION SCIENCES. ALL RIGHTS RESERVED.
        </div>
    </footer>
);

export default Footer;
