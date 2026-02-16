import React from 'react';
import { ArrowRight } from 'lucide-react';

const Card = ({ title, desc, link, onClick, image }) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border-t-4 border-[#F47B20] flex flex-col h-full cursor-pointer relative overflow-hidden" onClick={onClick}>
        {/* Card Image */}
        <div className="h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#163A5F]/20 group-hover:bg-transparent transition-colors z-10"></div>
            <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#163A5F] mb-3 group-hover:text-[#F47B20] transition-colors">{title}</h3>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{desc}</p>
            <div className="flex items-center text-[#F47B20] font-semibold group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight size={18} className="ml-2" />
            </div>
        </div>
    </div>
);

export default Card;
