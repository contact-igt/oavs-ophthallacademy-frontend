import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CheckItem from '../components/common/CheckItem';
import { Award, BookOpen, Stethoscope, GraduationCap, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   MARCH 2026 ACTIVITY TIMELINE
═══════════════════════════════════════════════════════════════ */

const marchMilestones = [
    {
        date: "13 Mar 2026",
        title: "Glaucoma Week Celebrations — PPG Institute",
        description:
            "Dr. Anuja, Principal OAVS, was invited as Chief Guest during the Glaucoma Week celebrations at PPG Institute. She addressed the students of PPG on the occasion of World Glaucoma Week on 13th March 2026.",
        images: [
            "/assets/milestones/13th_mar_img1.png",
        ],
        tag: "Chief Guest",
    },
    {
        date: "14 Mar 2026",
        title: "Webinar: Beyond Refraction",
        description:
            "OAVS successfully conducted a webinar for Optometrists on the topic — 'Beyond Refraction: 12 Steps to Build a Profitable Optometry Career'.",
        images: ["/assets/milestones/webinar.png"],
        tag: "Webinar",
    },
    {
        date: "16 Mar 2026",
        title: "Academic Partnership — Adamas University",
        description:
            "Principal Dr. Anuja R. Singh visited Adamas University, Kolkata as part of the Academic Partner for Internship initiative on 16th March 2026.",
        images: ["/assets/milestones/16th_mar_img1.png"],
        tag: "Partnership",
    },
    {
        date: "17 Mar 2026",
        title: "Visit to Disha Eye Hospitals",
        description:
            "Dr. Anuja visited Disha Eye Hospitals on 17th March 2026 to discuss and explore academic programme collaborations.",
        images: ["/assets/milestones/17th_mar_img1.png"],
        tag: "Institution Visit",
    },
    {
        date: "17–18 Mar 2026",
        title: "Partner Institution Visits — Kolkata & Durgapur",
        description:
            "Dr. Anuja visited Brainware University, Kolkata (17th March) and Dr. B.C. Roy Academy of Professional Courses, Durgapur (18th March) as part of OAVS partner institution engagement.",
        images: [
            "/assets/milestones/17th_18th_mar_img1.png",
            "/assets/milestones/17th_18th_mar_img2.png",
        ],
        tag: "Partner Visits",
    },
    {
        date: "18 Mar 2026",
        title: "Address at NSHM Knowledge Campus, Durgapur",
        description:
            "Principal Dr. Anuja visited NSHM Knowledge Campus, Durgapur, WB to address faculty members and students on 18th March 2026.",
        images: ["/assets/milestones/18th_mar_img1.png"],
        tag: "Academic Address",
    },
    {
        date: "23 Mar 2026",
        title: "World Optometry Day — Centurion University, Bhubaneshwar",
        description:
            "Dr. Anuja was invited as Chief Guest during World Optometry Day celebrations at Centurion University, Bhubaneshwar, Orissa on 23rd March 2026.",
        images: [
            "/assets/milestones/23rd_mar_img1.png",
            "/assets/milestones/23rd_mar_img2.png",
           
        ],
        tag: "Chief Guest",
    },
    {
        date: "24 Mar 2026",
        title: "MOU Signing at Arka Jain University & Madurai Webinar",
        description:
            "Dr. Anuja visited Arka Jain University, Jamshedpur, Jharkhand and signed an MOU in the presence of the Pro VC, Registrar, HOD – Optometry and HOD – English. She also conducted a webinar for Madurai Optical Association members on 'Elevating Optical Sales to Optical Excellence' — well received by over 50 opticians from South Tamil Nadu.",
        images: [
            "/assets/milestones/24th_mar_img1.png",
            "/assets/milestones/24th_mar_img2.png",
             "/assets/milestones/24th_mar_img3.png",
            "/assets/milestones/24th_mar_img4.png",
        ],
        tag: "MOU & Webinar",
    },
    {
        date: "29 Mar 2026",
        title: "Formal Inauguration of OAVS",
        description:
            "The formal inauguration of Ophthall Academy of Vision Sciences was conducted on 29th March 2026 at Hotel Radha Regent, Koyambedu, Chennai — graced by Dr. Rajesh Ramachandran, Dr. Mohan Rajan, Dr. T. Senthil and the entire OAVS team. The event included MOU signings, ribbon cutting, and lamp lighting ceremonies, Audience group photo on stage",
        images: ["/assets/milestones/inauguration.png"],
        tag: "Inauguration",
    },
];

const skillPartners = [
    "JayaPriya Eye Hospital, Hubli, Dharwad",
    "Sukharam Eye Hospital, Surat, Gujarat",
    "Netra Eye Clinic Retina Laser Centre, Pune",
    "Yashwant Netra Rugnalaya, Parbhani, Maharashtra",
    "Keshave Netralaya Private Limited, Hassan",
    "Renuka Netralaya, Sanjeevani Hospital, Pune",
    "Axis Eye Clinic, Pune",
    "Ganesh Vinayak Eye Hospital, Raipur, Chattisgarh",
    "Amrit Eye Hospital, Chennai",
    "Amma Eye Hospital, Hassan",
    "Anil Eye Hospital, Madurai",
    "Isha Nethralaya, Mumbai & Pune",
    "Eyecare Hospital, Maldives",
    "Dr. Aloka's Eye Care, Hyderabad",
    "Eyeris Eye Care, Hyderabad",
    "Iris Eye Hospital, Hyderabad",
    "Urmil Eye Hospital, Vapi, Gujarat",
    "Eyedot Hospital, Chennai",
    "Shanti Eye Tech Hospital, Indore",
    "Yeshass Nethralaya Eye Hospital, Hyderabad",
    "Rajan Eye Care, Chennai",
];

/* ── Lightbox ── */
const Lightbox = ({ images, startIndex, title, onClose }) => {
    const [current, setCurrent] = useState(startIndex);
    const total = images.length;

    const prev = (e) => { e.stopPropagation(); setCurrent(i => (i - 1 + total) % total); };
    const next = (e) => { e.stopPropagation(); setCurrent(i => (i + 1) % total); };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')       onClose();
            if (e.key === 'ArrowRight')   setCurrent(i => (i + 1) % total);
            if (e.key === 'ArrowLeft')    setCurrent(i => (i - 1 + total) % total);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose, total]);

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            {/* Counter */}
            {total > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {current + 1} / {total}
                </div>
            )}

            {/* Image box */}
            <div
                className="relative mx-4 max-w-5xl w-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                <img
                    key={current}
                    src={images[current]}
                    alt={`${title} ${current + 1}`}
                    className="max-h-[85vh] max-w-full w-auto rounded-2xl shadow-2xl object-contain animate-[fadeIn_0.2s_ease]"
                    style={{ animation: 'fadeIn 0.2s ease' }}
                />

                {/* Prev */}
                {total > 1 && (
                    <button
                        onClick={prev}
                        className="absolute -left-2 md:-left-14 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-[#F47B20] text-white shadow-xl transition-all duration-200 hover:scale-110"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={22} />
                    </button>
                )}

                {/* Next */}
                {total > 1 && (
                    <button
                        onClick={next}
                        className="absolute -right-2 md:-right-14 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-[#F47B20] text-white shadow-xl transition-all duration-200 hover:scale-110"
                        aria-label="Next"
                    >
                        <ChevronRight size={22} />
                    </button>
                )}
            </div>

            {/* Dot indicators */}
            {total > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={e => { e.stopPropagation(); setCurrent(i); }}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                i === current ? 'bg-[#F47B20] w-5' : 'bg-white/50 hover:bg-white'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
};

/* ── Image grid: 1 big | 2 side-by-side | 3 (1+2) | 4 (2×2) ── */
const ImageGrid = ({ images, title }) => {
    if (!images || images.length === 0) return null;

    const [lightboxIndex, setLightboxIndex] = useState(null);

    /* img always fills its container box — height is enforced on the wrapper */
    const imgClass = "w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105";
    const wrapBase = "relative overflow-hidden shadow-md border border-gray-100 group cursor-zoom-in";
    const openAt  = (i) => setLightboxIndex(i);

    const renderThumb = (src, i, extraClass = '') => (
        <div
            key={i}
            className={`${wrapBase} ${extraClass}`}
            onClick={() => openAt(i)}
            title="Click to enlarge"
        >
            <img src={src} alt={`${title} ${i + 1}`} className={imgClass} />
            {/* Hover zoom hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#163A5F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    startIndex={lightboxIndex}
                    title={title}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            {images.length === 1 && (
                <div className="h-64 md:h-72 rounded-2xl">
                    {renderThumb(images[0], 0, 'h-full rounded-2xl shadow-lg')}
                </div>
            )}

            {images.length === 2 && (
                <div className="grid grid-cols-2 gap-2">
                    {images.map((src, i) => renderThumb(src, i, 'h-56 md:h-64 rounded-xl'))}
                </div>
            )}

            {images.length === 3 && (
                <div className="space-y-2">
                    {renderThumb(images[0], 0, 'h-52 md:h-60 rounded-xl')}
                    <div className="grid grid-cols-2 gap-2">
                        {images.slice(1).map((src, i) => renderThumb(src, i + 1, 'h-40 md:h-44 rounded-xl'))}
                    </div>
                </div>
            )}

            {images.length >= 4 && (
                <div className="grid grid-cols-2 gap-2">
                    {images.slice(0, 4).map((src, i) => renderThumb(src, i, 'h-44 md:h-52 rounded-xl'))}
                </div>
            )}
        </>
    );
};

/* ── Unified tag badge — solid orange, white text (all milestone tags) ── */
const TagBadge = ({ tag, className = '' }) => (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-[#F47B20] text-white px-3 py-1 rounded-full shadow-md ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
        {tag}
    </span>
);

/* ── Text content block (left-aligned or right-aligned) ── */
const MilestoneContent = ({ milestone, align }) => (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
        <div className={align === 'right' ? 'flex justify-end mb-3' : 'mb-3'}>
            <TagBadge tag={milestone.tag} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#163A5F] mb-3 leading-snug">
            {milestone.title}
        </h3>
        <div className={`w-10 h-[3px] bg-[#F47B20] rounded-full mb-3 ${align === 'right' ? 'ml-auto' : ''}`} />
        <p className="text-gray-500 text-sm leading-relaxed">{milestone.description}</p>
    </div>
);

/* ── Single timeline row ── */
const MilestoneItem = ({ milestone, index }) => {
    const isEven = index % 2 === 0; /* even → content LEFT, image RIGHT */

    return (
        <>
            {/* ════ DESKTOP (md+): alternating, absolute dot on central spine ════ */}
            <div className="hidden md:grid md:grid-cols-2 relative py-14">

                {/* Date chip + dot anchored at the vertical centre of this row */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
                    {/* Date badge */}
                    <span className="bg-[#163A5F] text-[#F47B20] text-[13px] font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg tracking-wide border border-[#F47B20]/30">
                        {milestone.date}
                    </span>
                    {/* Dot */}
                    <div className="w-6 h-6 rounded-full bg-[#F47B20] border-[4px] border-white shadow-xl ring-4 ring-[#163A5F]/40" />
                </div>

                {/* Left cell */}
                <div className={`pr-20 flex flex-col justify-center ${isEven ? 'items-end' : 'items-start'}`}>
                    {isEven
                        ? <MilestoneContent milestone={milestone} align="right" />
                        : <ImageGrid images={milestone.images} title={milestone.title} />}
                </div>

                {/* Right cell */}
                <div className="pl-20 flex flex-col justify-center">
                    {isEven
                        ? <ImageGrid images={milestone.images} title={milestone.title} />
                        : <MilestoneContent milestone={milestone} align="left" />}
                </div>
            </div>

            {/* ════ MOBILE: left-spine layout ════ */}
            <div className="md:hidden flex gap-0 pb-10">
                {/* Spine column */}
                <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '44px' }}>
                    <div className="mt-[4px] flex-shrink-0 w-10 h-10 rounded-full bg-[#163A5F] flex items-center justify-center shadow-lg z-10 ring-4 ring-[#163A5F]/20">
                        <div className="w-4 h-4 rounded-full bg-[#F47B20]" />
                    </div>
                    {/* Line below dot */}
                    <div className="flex-1 w-[3px] bg-[#163A5F]/50 mt-1 rounded-full" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pl-3">
                    <div className="flex flex-wrap gap-1.5 mb-2 mt-1.5">
                        <span className="text-[11px] font-black text-[#F47B20] bg-[#163A5F] px-3 py-0.5 rounded-full tracking-wide shadow-sm">
                            {milestone.date}
                        </span>
                        <TagBadge tag={milestone.tag} />
                    </div>
                    <h3 className="text-base font-bold text-[#163A5F] mb-1 leading-snug">{milestone.title}</h3>
                    <div className="w-8 h-[3px] bg-[#F47B20] rounded-full mb-3" />
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{milestone.description}</p>
                    <ImageGrid images={milestone.images} title={milestone.title} />
                </div>
            </div>
        </>
    );
};

/* ── Mission & Vision cards ── */
const MissionVisionSection = () => (
    <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">

        {/* Mission Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#163A5F]/15">
            {/* Top accent stripe */}
            <div className="h-2 w-full bg-gradient-to-r from-[#163A5F] to-[#1e4d7a]" />
            <div className="bg-[#163A5F] px-8 pt-6 pb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-[#F47B20] text-white px-3 py-1 rounded-full mb-3 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    Mission
                </span>
                <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F47B20] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /></svg>
                    Mission of OAVS
                </h3>
            </div>
            <div className="bg-white px-8 py-6 space-y-4">
                {[
                    "To create industry ready professionals who can survive in the competitive modern-day eyecare industry.",
                    "To improve the competency and increase the efficiency of optometrists.",
                    "To enhance the career growth of Optometry trainees and practitioners.",
                    "To upskill and reskill Optometrists by providing structured educational programs.",
                ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#163A5F] flex items-center justify-center shadow-md">
                            <span className="text-[#F47B20] text-[10px] font-black">{i + 1}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Vision Card — same navy header as Mission */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#163A5F]/15">
            {/* Top accent stripe — same as Mission */}
            <div className="h-2 w-full bg-gradient-to-r from-[#163A5F] to-[#1e4d7a]" />
            <div className="bg-[#163A5F] px-8 pt-6 pb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-[#F47B20] text-white px-3 py-1 rounded-full mb-3 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    Vision
                </span>
                <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F47B20] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    Vision of OAVS
                </h3>
            </div>
            <div className="bg-white px-8 py-6">
                {/* Decorative quote mark */}
                <div className="text-6xl leading-none text-[#F47B20]/20 font-serif mb-1 select-none">&ldquo;</div>
                <p className="text-gray-600 text-sm leading-relaxed -mt-4">
                    Create a cadre of eye care professionals with the highest standards of skills, knowledge and attitude
                    and to empower the trainees by providing a unique learning experience to develop them to their optimum
                    potential through regular teaching, training and development.
                </p>
                {/* Keyword pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {["Skills", "Knowledge", "Attitude", "Mentorship", "Development"].map((tag, i) => (
                        <span key={i} className="text-xs font-semibold text-[#163A5F] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

/* ── Skill Partners grid card ── */
const SkillPartnersCard = () => (
    <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-[#163A5F]/15">
        {/* Header */}
        <div className="bg-[#163A5F] px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F47B20] bg-[#F47B20]/20 px-3 py-1 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F47B20]" />
                    MOU Signed
                </span>
                <h3 className="text-white text-2xl font-bold">Our Skill Partners</h3>
                <p className="text-blue-200 text-sm mt-1">
                    Internship MOUs signed with leading hospitals across India &amp; abroad
                </p>
            </div>
            {/* Count badge */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#F47B20] rounded-2xl px-6 py-3 shadow-lg self-start sm:self-auto">
                <span className="text-white text-3xl font-black leading-none">{skillPartners.length}+</span>
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">Hospitals</span>
            </div>
        </div>

        {/* Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-[#F47B20] via-[#F47B20]/50 to-transparent" />

        {/* Partner list */}
        <div className="bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skillPartners.map((partner, i) => (
                    <div
                        key={i}
                        className="group flex items-center gap-3 bg-blue-50 hover:bg-[#163A5F] rounded-xl px-4 py-4 border border-blue-100 hover:border-[#163A5F] transition-all duration-200 hover:shadow-md cursor-default"
                    >
                        {/* Number badge */}
                        <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#163A5F] group-hover:bg-[#F47B20] flex items-center justify-center transition-colors duration-200 shadow-sm">
                            <span className="text-[9px] font-black text-white">{i + 1}</span>
                        </div>
                        <span className="text-[#163A5F] group-hover:text-white text-sm font-medium leading-snug transition-colors duration-200">{partner}</span>
                    </div>
                ))}
            </div>
            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                All partners have signed formal internship MOU agreements with OAVS.
            </p>
        </div>
    </div>
);

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
        image: "/assets/Dr. Arun.jpeg",
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
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#F47B20] bg-[#163A5F] px-4 py-1.5 rounded-full mb-3 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#F47B20] flex-shrink-0" />
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

                {/* ===== MARCH 2026 ACTIVITY TIMELINE ===== */}
                <section className="mt-28 pb-16">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#F47B20] bg-[#163A5F] px-4 py-1.5 rounded-full mb-3 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#F47B20] flex-shrink-0" />
                            Our Milestones
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-2">
                            Milestones
                        </h2>
                        <div className="w-16 h-1 bg-[#F47B20] mx-auto rounded-full mb-4" />
                        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                            From academic partnerships and expert webinars to national institution visits and the grand inaugural ceremony — a recap of OAVS in action during March 2026.
                        </p>
                    </div>

                    {/* Mission & Vision cards */}
                    <MissionVisionSection />

                    {/* Timeline container — holds the continuous spine + all rows */}
                    <div className="relative max-w-5xl mx-auto">

                        {/* ── Continuous spine: desktop (centred) ── */}
                        <div
                            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#163A5F]/10 via-[#163A5F]/60 to-[#163A5F]/10 pointer-events-none rounded-full"
                            aria-hidden="true"
                        />

                        {/* ── Continuous spine: mobile (left edge, aligns with dot centres) ── */}
                        <div
                            className="md:hidden absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#163A5F]/10 via-[#163A5F]/60 to-[#163A5F]/10 pointer-events-none rounded-full"
                            style={{ left: '19px' }}
                            aria-hidden="true"
                        />

                        {marchMilestones.map((milestone, index) => (
                            <MilestoneItem key={index} milestone={milestone} index={index} />
                        ))}
                    </div>

                    {/* Skill Partners */}
                    <div className="max-w-5xl mx-auto">
                        <SkillPartnersCard />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;