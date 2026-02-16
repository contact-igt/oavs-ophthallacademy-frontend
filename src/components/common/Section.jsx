import React from 'react';

const Section = ({ className = "", children, id }) => (
    <section id={id} className={`py-16 md:py-24 px-4 md:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </section>
);

export default Section;
