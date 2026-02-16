import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';

const FloatingActionButtons = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-8 right-6 md:right-8 flex flex-col gap-4 z-40">
            {/* Call Button */}
            <a
                href="tel:+919176944244"
                className="w-12 md:w-14 h-12 md:h-14 bg-green-500 rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center text-white hover:bg-green-600 transition-all hover:-translate-y-1 transform group"
                title="Call Us"
            >
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
            </a>

            {/* Scroll to Top Button */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="w-10 md:w-12 h-10 md:h-12 bg-[#F47B20] rounded-full shadow-xl shadow-orange-500/30 flex items-center justify-center text-white hover:bg-[#d66a15] transition-all hover:-translate-y-1 transform"
                    title="Scroll to Top"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    );
};

export default FloatingActionButtons;
