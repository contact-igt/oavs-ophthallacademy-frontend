import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2";
    const variants = {
        primary: `bg-[#F47B20] text-white hover:bg-[#d66a15] shadow-lg shadow-orange-500/30`,
        secondary: `bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#163A5F]`,
        outline: `bg-transparent border-2 border-[#163A5F] text-[#163A5F] hover:bg-[#163A5F] hover:text-white`,
        ghost: `bg-white text-[#163A5F] hover:bg-gray-100 shadow-md`
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
