import React, { useState } from 'react';
import { Menu, X, Eye, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

const Navigation = ({ currentPage, navigate, isMenuOpen, setIsMenuOpen, scrolled }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navLinks = [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        {
            label: 'Programmes',
            value: 'programmes',
            children: [
                { label: 'Optical Dispensing', value: 'dispensing' },
                { label: 'Clinical Optometry', value: 'clinical' },
                { label: 'Contact Lens', value: 'contact-lens' },
                { label: 'Orthoptics & Vision Therapy', value: 'orthoptics' },
                { label: 'Low Vision Care', value: 'low-vision' },
            ]
        },
        { label: 'Admissions', value: 'admissions' },
    ];

    const handleDropdownEnter = (value) => {
        setActiveDropdown(value);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const toggleDropdown = (value) => {
        setActiveDropdown(activeDropdown === value ? null : value);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-lg py-2' : 'shadow-md py-4'}`}>
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
                    {/* <img src="/assets/logo.png" alt="Logo" className="w-auto h-14 object-cover scale-2" /> */}
                    <img src="/assets/logo.png" alt="Logo" className="w-[8rem] md:w-[10rem] h-14 object-cover" />
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.value}
                            className="relative group"
                            onMouseEnter={() => link.children && handleDropdownEnter(link.value)}
                            onMouseLeave={() => link.children && handleDropdownLeave()}
                        >
                            <button
                                onClick={() => !link.children && navigate(link.value)}
                                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${currentPage === link.value || (link.children && link.children.some(c => c.value === currentPage))
                                    ? 'text-[#F47B20]'
                                    : 'text-[#163A5F] hover:text-[#F47B20]'
                                    }`}
                            >
                                {link.label}
                                {link.children && <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === link.value ? 'rotate-180' : ''}`} />}
                            </button>

                            {/* Dropdown Menu */}
                            {link.children && (
                                <div
                                    className={`absolute top-full left-0 w-56 pt-4 transition-all duration-200 ${activeDropdown === link.value ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                                >
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                                        {link.children.map((child) => (
                                            <button
                                                key={child.value}
                                                onClick={() => {
                                                    navigate(child.value);
                                                    setActiveDropdown(null);
                                                }}
                                                className={`w-full text-left cursor-pointer px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group/item ${currentPage === child.value ? 'text-[#F47B20] bg-orange-50' : 'text-[#163A5F]'}`}
                                            >
                                                {child.label}
                                                {currentPage === child.value && <div className="w-1.5 h-1.5 rounded-full bg-[#F47B20]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Button
                        onClick={() => navigate('admissions')}
                        className="py-2 px-6 text-sm"
                    >
                        Apply Now
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-[#163A5F]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-4 flex flex-col gap-2 lg:hidden border-t max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link) => (
                        <div key={link.value} className="flex flex-col">
                            {link.children ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(link.value)}
                                        className="flex items-center justify-between text-left py-3 px-4 rounded-xl hover:bg-gray-50 font-bold text-[#163A5F] uppercase text-sm tracking-wide"
                                    >
                                        {link.label}
                                        <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === link.value ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === link.value ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-4 pr-2 pb-2 space-y-1 bg-gray-50/50 rounded-b-xl mb-2">
                                            {link.children.map((child) => (
                                                <button
                                                    key={child.value}
                                                    onClick={() => {
                                                        navigate(child.value);
                                                        setIsMenuOpen(false);
                                                    }}
                                                    className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${currentPage === child.value
                                                        ? 'text-[#F47B20] bg-white shadow-sm'
                                                        : 'text-gray-600 hover:text-[#163A5F] hover:bg-white/50'
                                                        }`}
                                                >
                                                    {child.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        navigate(link.value);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`text-left py-3 px-4 rounded-xl hover:bg-gray-50 font-bold uppercase text-sm tracking-wide ${currentPage === link.value ? 'text-[#F47B20] bg-orange-50' : 'text-[#163A5F]'}`}
                                >
                                    {link.label}
                                </button>
                            )}
                        </div>
                    ))}
                    <Button onClick={() => navigate('admissions')} className="mt-4 w-full">Apply Now</Button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
