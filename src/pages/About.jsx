import React, { useState, useRef, useEffect } from 'react';
import CheckItem from '../components/common/CheckItem';
import { Award, BookOpen, Stethoscope, GraduationCap, Star } from 'lucide-react';

const facultyData = [
    {
        name: "Dr. Tamilarasan Senthil",
        role: "Founder & Chief Mentor",
        image: "/assets/Dr. T. Senthil.png",
        description: "Ophthalmologist, healthcare entrepreneur, and practice development expert. Dr. Senthil brings deep experience in clinical care and healthcare leadership with a strong focus on building skill-based training ecosystems.",
        accentColor: "from-[#163A5F] to-[#1e4d7a]",
        icon: Stethoscope,
        credentials: ["Founder, OAVS", "Healthcare Entrepreneur"],
    },
    {
        name: "Dr. Anuja R. Singh",
        role: "Senior Academic Advisor & Faculty",
        image: "/assets/Dr. Anuja R. Singh.jpeg",
        description: "Over 30 years of experience as a clinical optometrist, educator, trainer, academician, and administrator. An Alumna of Elite School of Optometry (1993), former Head of Department and Principal at The Sankara Nethralaya Academy (TSNA) for over a decade. She has played a key role in developing fellowships, certificate programs, and degree courses.",
        accentColor: "from-[#163A5F] to-[#0f2c4a]",
        icon: Award,
        credentials: ["Elite School of Optometry", "Ex-Principal, TSNA"],
    },
    {
        name: "Dr. Viswanathan Sivaraman",
        role: "Senior Faculty – Contact Lenses & Optometry Education",
        image: "/assets/Dr. Viswanathan.jpeg",
        description: "PhD, FBDO, B.Opt — Optometrist and academician with 30+ years of experience in optometry education, clinical training, optical dispensing, and specialty contact lenses. Former faculty at the Elite School of Optometry, specialising in scleral lenses, orthokeratology, keratoconus, and myopia management. Published 30+ peer-reviewed research papers.",
        accentColor: "from-[#1a4570] to-[#163A5F]",
        icon: BookOpen,
        credentials: ["PhD, FBDO, B.Opt", "30+ Research Papers", "Scleral & Ortho-K Specialist"],
    },
    {
        name: "Mr. Arun",
        role: "Faculty – Optical Dispensing & Practice Management",
        image: "/assets/placeholder.png",
        description: "Industry professional with extensive hands-on experience in optical dispensing, retail operations, and practical training.",
        accentColor: "from-[#F47B20] to-[#d96a15]",
        icon: Star,
        credentials: ["Optical Dispensing Expert", "Retail Ops Specialist"],
    },
    {
        name: "Dr. Devakani",
        role: "Faculty – Specialty Contact Lenses & Low Vision",
        image: "/assets/Dr. Devakani.jpeg",
        description: "Clinical Optometrist at Sheikh Khalifa Medical City, Abu Dhabi, with 20+ years in clinical and academic optometry. Specialises in specialty contact lenses, low vision rehabilitation, and vision care for People of Determination. Active speaker at national & international conferences, pursuing a PhD and Fellowship in Vision Therapy (ASCO, UK).",
        accentColor: "from-[#163A5F] to-[#1e4d7a]",
        icon: GraduationCap,
        credentials: ["Sheikh Khalifa Medical City", "Low Vision Specialist", "PhD Candidate, ASCO UK"],
    },
    {
        name: "Ms. Kalpana Krishna",
        role: "Senior Faculty – Contact Lenses, Low Vision & Vision Therapy",
        image: "/assets/Dr. Kalpana.jpeg",
        description: "Senior Optometrist with over 30 years of distinguished clinical experience. Alumna of the Elite School of Optometry, she has served at Narayana Nethralaya, Sankara Nethralaya, and other reputed eye hospitals in Bangalore, alongside successful independent practice. Her clinical interests span contact lens management, low vision rehabilitation, and vision therapy. As an educator, she has served as faculty for contact lens courses, delivered guest lectures on binocular vision, and chaired sessions on low vision aids at professional conferences. Her paper presentations have received wide acclaim.",
        accentColor: "from-[#1a4570] to-[#163A5F]",
        icon: BookOpen,
        credentials: ["Elite School Alumna", "Narayana & Sankara Nethralaya", "Vision Therapy"],
    },
    {
        name: "Ms. Revathy",
        role: "Senior Faculty – Optometry, Low Vision & Sports Vision",
        image: "/assets/Dr.Revathi.jpeg",
        description: "Senior Optometrist with over 12 years of experience as a clinical practitioner and educator. Alumna of the Elite School of Optometry, she has taught in diverse academic environments across ophthalmic institutions in Tamil Nadu. Her areas of interest include General Optometry, Low Vision management, contact lenses, Binocular Vision, and Sports Vision. She has guided undergraduate, fellowship, and postgraduate students in Optometry, and has initiated multiple training programs for skill development among practitioners.",
        accentColor: "from-[#163A5F] to-[#0f2c4a]",
        icon: Award,
        credentials: ["Elite School Alumna", "Low Vision & Sports Vision", "PG & UG Mentor"],
    },
    {
        name: "Dr. V.K. Rai",
        role: "Faculty – Orthoptics, Binocular Vision & Squint",
        image: "/assets/Dr.V.K.Rai.jpeg",
        description: "M.Optom, PhD, Orthoptist — Fellowship in Orthoptics (Aravind Eye Hospital, Madurai) and Certificate in Cornea Diagnostics (Sankara Nethralaya). PhD on Binocular Vision, Squint & Amblyopia; former Chief Orthoptist at Raj Eye Hospital, Gorakhpur. Director, Raj Eye Care & Vision Science Center. President, Optometrist Welfare Society, UP.",
        accentColor: "from-[#F47B20] to-[#d96a15]",
        icon: Stethoscope,
        credentials: ["M.Optom, PhD", "Orthoptics Fellow – Aravind Eye Hospital", "President, OWS UP"],
    },
    {
        name: "Harish Kumar Bhardwaj",
        role: "Faculty – Specialty Contact Lenses & Diagnostics",
        image: "/assets/Dr. Harishkumar.jpeg",
        description: "Senior optometrist with 15 years of experience in specialty contact lens practice and posterior segment diagnostics. Director & Chief Optometrist at Cortina Vision Centre, Shimla; President, HP Optometry Association. Fellowship from Sankara Nethralaya; PG Diploma in Advanced Contact Lens Practice & Binocular Vision (Spain).",
        accentColor: "from-[#163A5F] to-[#1e4d7a]",
        icon: BookOpen,
        credentials: ["Sankara Nethralaya Fellow", "PG Diploma, Spain", "President, HP Optometry Association"],
    },
    {
        name: "Ms. Jayanthi",
        role: "Faculty – Ophthalmic Dispensing",
        image: "/assets/Dr.Jayanthi.jpeg",
        description: "Holds a Bachelor's degree in Ophthalmic Dispensing and the prestigious Fellowship of British Dispensing Opticians (FBDO) from the Association of British Dispensing Opticians, UK. Over 6 years of experience as a Lens Consultant, Optometrist, and Educator in Dispensing Optics at The Sankara Nethralaya Academy.",
        accentColor: "from-[#1a4570] to-[#163A5F]",
        icon: GraduationCap,
        credentials: ["FBDO, UK", "Sankara Nethralaya Academy", "Dispensing Optics Educator"],
    },
];

const FacultyCard = ({ faculty }) => {
    const Icon = faculty.icon;
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const descRef = useRef(null);

    useEffect(() => {
        const el = descRef.current;
        if (!el) return;

        const checkOverflow = () => {
            setIsClamped(el.scrollHeight > el.clientHeight);
        };

        // Check immediately after DOM update
        checkOverflow();

        // Re-check after fonts fully load (font rendering changes line heights/wrapping)
        if (document.fonts?.ready) {
            document.fonts.ready.then(checkOverflow);
        }

        // Re-check whenever the card width changes (responsive layout)
        const observer = new ResizeObserver(checkOverflow);
        observer.observe(el);
        return () => observer.disconnect();
    }, [faculty.description]);

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
            {/* Top accent bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${faculty.accentColor}`} />

            {/* Profile image */}
            <div className="relative pt-8 px-6 flex justify-center">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg border-2 border-[#F47B20]/30 group-hover:border-[#F47B20] transition-colors duration-300">
                        <img
                            src={faculty.image}
                            alt={faculty.name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=163A5F&color=fff&size=200`;
                            }}
                        />
                    </div>
                    {/* Specialty icon badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#163A5F] p-1.5 rounded-full shadow-md group-hover:bg-[#F47B20] transition-colors duration-300">
                        <Icon size={14} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-5 flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-[#163A5F] text-center mb-1 leading-tight">{faculty.name}</h3>
                <p className="text-[#F47B20] font-semibold text-[11px] uppercase tracking-wider text-center mb-4 leading-snug">{faculty.role}</p>

                {/* Description with Read More toggle */}
                <div className="mb-3 flex-1">
                    <p
                        ref={descRef}
                        className="text-gray-500 text-sm leading-relaxed text-center transition-all duration-300"
                        style={!expanded ? {
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        } : {}}
                    >
                        {faculty.description}
                    </p>
                    {(isClamped || expanded) && (
                        <div className="flex justify-center mt-2">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-[#F47B20] text-xs font-semibold hover:text-[#163A5F] transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                            >
                                {expanded ? (
                                    <>
                                        <span>Read Less</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                                    </>
                                ) : (
                                    <>
                                        <span>Read More</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Credential badges */}
                <div className="flex flex-wrap gap-1.5 justify-center mt-auto pt-3 border-t border-gray-100">
                    {faculty.credentials.map((cred, i) => (
                        <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#163A5F] font-medium border border-blue-100"
                        >
                            {cred}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const About = () => {
    const allButLast = facultyData.slice(0, -1);
    const lastFaculty = facultyData[facultyData.length - 1];

    return (
        <div className="pt-20 min-h-screen bg-[#F5F7FA]">
            {/* Hero Banner */}
            <div className="bg-[#163A5F] text-white py-20 px-4 mb-12 relative overflow-hidden">
                <img
                    src="/assets/about_banner.png"
                    className="absolute inset-0 w-full h-full object-cover object-[100%_48%] opacity-20 mix-blend-overlay"
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

                {/* ===== FACULTY SECTION ===== */}
                <section className="mt-24">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F47B20] mb-3 bg-[#F47B20]/10 px-4 py-1.5 rounded-full">
                            Meet Our Experts
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-4">
                            Faculty &amp; Academic Leadership
                        </h2>
                        <div className="w-16 h-1 bg-[#F47B20] mx-auto rounded-full mb-4" />
                        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                            Our faculty brings together leading ophthalmologists, senior optometrists, and industry practitioners committed to shaping the next generation of clinical professionals.
                        </p>
                    </div>

                    {/* 3-column grid — first 9 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {allButLast.map((faculty, index) => (
                            <FacultyCard key={index} faculty={faculty} />
                        ))}
                    </div>

                    {/* 10th card — centered */}
                    <div className="flex justify-center">
                        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                            <FacultyCard faculty={lastFaculty} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;