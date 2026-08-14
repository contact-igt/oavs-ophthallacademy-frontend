import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
    clearPaymentScreenshot,
    paymentScreenshotUploadFailed,
    paymentScreenshotUploadStarted,
    paymentScreenshotUploadSucceeded,
} from '../store/paymentScreenshotSlice';
import {
    Award,
    CalendarDays,
    Check,
    ArrowRight,
    ClipboardList,
    Eye,
    Mail,
    MapPin,
    Monitor,
    Network,
    Phone,
    ReceiptText,
    Sparkles,
    Stethoscope,
    Users,
    Wallet,
    X,
} from 'lucide-react';

const facultyWorkshopBio = 'Their experience and insights will make this workshop truly enriching for all participants.';

const workshopFacultyDetails = {
    name: 'Faculties',
    photo: '/assets/placeholder.png',
    role: 'Nationwide renowned experts in their fields.',
    bio: facultyWorkshopBio,
};

const workshops = [
    {
        id: 'myopia-masterclass',
        title: 'Myopia Masterclass',
        subtitle: 'Stop Myopia, Not Just Correct It',
        date: '22 August 2026',
        day: '22 Aug',
        time: '09 AM - 12 PM',
        fee: 500,
        image: '/assets/myopia_masterclass.png',
        description: 'A practical clinical workshop for understanding, measuring, and managing progressive myopia with confidence.',
        topics: [
            'Understanding the Myopia Epidemic',
            'Axial Length Measurements',
            'Corneal Topography',
            'Evidence-based Myopia Control',
            'Clinical Protocols',
            'Case Discussions',
            'School Screening Programs',
            'Practice Integration',
        ],
        faculty: workshopFacultyDetails,
    },
    {
        id: 'selling-skills',
        title: 'Selling Skills for Opticians',
        subtitle: 'Create better patient experiences and ethical optical sales',
        date: '22 August 2026',
        day: '22 Aug',
        time: '12 PM - 2 PM',
        fee: 500,
        image: '/assets/selling_skills.png',
        description: 'Transform every patient interaction into a delightful experience while ethically increasing optical sales.',
        topics: [
            'Customer Psychology',
            'Communication Skills',
            'Frame Selection',
            'Lens Recommendation',
            'Closing Techniques',
            'Premium Lens Selling',
            'Handling Objections',
            'Increasing Patient Satisfaction',
        ],
        faculty: workshopFacultyDetails,
    },
    {
        id: 'low-vision',
        title: 'Seeing Beyond 6/60',
        subtitle: 'Practical Low Vision Workshop',
        date: '22 August 2026',
        day: '22 Aug',
        time: '2 PM - 5 PM',
        fee: 500,
        image: '/assets/seeing_beyond.png',
        description: 'From Nothing More Can Be Done to We Can Do a Lot.',
        topics: [
            'Low Vision Assessment',
            'Device Demonstration',
            'Hands-on Practice',
            'Case Discussions',
            'Rehabilitation',
            'Patient Counselling',
            'Clinic Setup',
        ],
        faculty: workshopFacultyDetails,
    },
    {
        id: 'binocular-vision',
        title: 'Seeing as One',
        subtitle: 'Binocular Vision & Orthoptics Workshop',
        date: '23 August 2026',
        day: '23 Aug',
        time: '10 AM - 1 PM',
        fee: 500,
        image: '/assets/seeing_as_one.png',
        description: 'Walk away with confidence to perform complete binocular vision evaluation and initiate vision therapy.',
        topics: [
            'BV Assessment',
            'Cover Tests',
            'Accommodation',
            'Vergence',
            'Vision Therapy',
            'Case Discussions',
            'Marketing BV Services',
        ],
        faculty: workshopFacultyDetails,
    },
    {
        id: 'master-machines',
        title: 'Master the Machines',
        subtitle: 'Clinical Diagnostics for Optometrists',
        date: '23 August 2026',
        day: '23 Aug',
        time: '2 PM - 5 PM',
        fee: 1000,
        image: '/assets/master_the_machines.png',
        description: 'Gain confidence in interpreting modern diagnostic equipment.',
        topics: [
            'Slit Lamp',
            'Dry Eye Workup',
            'OCT',
            'Fundus Camera',
            'Visual Fields',
            'Tonometry',
            'Corneal Diagnostics',
            'Clinical Cases',
        ],
        faculty: workshopFacultyDetails,
    },
];

const aboutTabs = [
    {
        id: 'hands-on',
        label: 'Hands-on Learning',
        image: '/assets/hands_on_learning.png',
        text: 'SkillConnect is built around practical stations, live demonstrations, and small-batch practice so participants can immediately apply what they learn.',
    },
    {
        id: 'clinical',
        label: 'Clinical Decisions',
        image: '/assets/clinical_decision.png',
        text: 'Each workshop focuses on real-world clinical decision-making through cases, protocols, patient counselling, and implementation guidance.',
    },
    {
        id: 'networking',
        label: 'Networking',
        image: '/assets/networking.png',
        text: 'Meet faculty, peers, students, opticians, optometrists, and eye care professionals from across India while attending the expo.',
    },
];

const whyAttendItems = [
    { icon: Stethoscope, label: 'Hands-on practical learning' },
    { icon: Eye, label: 'Live demonstrations' },
    { icon: ClipboardList, label: 'Case-based discussions' },
    { icon: Users, label: 'Small batch learning, only 60 participants' },
    { icon: Award, label: 'Certificate of Participation' },
    { icon: Sparkles, label: 'Meet national faculty' },
    { icon: Monitor, label: 'Learn the latest technologies' },
    { icon: Network, label: 'Build your professional network' },
];

const designationOptions = [
    'Optometrist',
    'Optician',
    'Ophthalmologist',
    'Student',
    'Faculty',
    'Industry Professional',
];

const allAccessPass = {
    id: 'all-access',
    title: 'All Access Pass',
    fee: 2500,
};

const allWorkshopsTotal = workshops.reduce((sum, workshop) => sum + workshop.fee, 0);
const allAccessSavings = allWorkshopsTotal - allAccessPass.fee;
const skillConnectSelectionStorageKey = 'skillconnectSelectedWorkshopIds';
const validWorkshopSelectionIds = new Set([...workshops.map((workshop) => workshop.id), allAccessPass.id]);

const getStoredWorkshopSelections = () => {
    if (typeof window === 'undefined') return [];

    try {
        const storedValue = window.sessionStorage.getItem(skillConnectSelectionStorageKey);
        const storedIds = JSON.parse(storedValue || '[]');
        if (!Array.isArray(storedIds)) return [];

        return storedIds.filter((id) => validWorkshopSelectionIds.has(id));
    } catch {
        return [];
    }
};

const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white px-4 py-3 font-heading text-sm font-medium text-gray-800 outline-none transition-all focus:ring-2 focus:ring-[#F47B20] ${hasError ? 'border-red-500' : 'border-gray-200 focus:border-transparent'}`;

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const navHeight = document.querySelector('nav')?.offsetHeight || 80;
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
};

const SkillConnect = ({ navigate }) => {
    const [activeAboutTab, setActiveAboutTab] = useState(aboutTabs[0].id);
    const [activeWorkshopId, setActiveWorkshopId] = useState(workshops[0].id);
    const [selectedWorkshopIds, setSelectedWorkshopIds] = useState(getStoredWorkshopSelections);
    const [workshopError, setWorkshopError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState('');
    const [paymentScreenshotFileName, setPaymentScreenshotFileName] = useState('');
    const [paymentScreenshotMimeType, setPaymentScreenshotMimeType] = useState('');
    const [isPaymentScreenshotPreviewOpen, setIsPaymentScreenshotPreviewOpen] = useState(false);
    const paymentScreenshotInputRef = useRef(null);
    const dispatch = useDispatch();
    const paymentScreenshotUpload = useSelector((state) => state.paymentScreenshot);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const paymentScreenshotRegister = register('paymentScreenshot');

    const activeTab = aboutTabs.find((tab) => tab.id === activeAboutTab) || aboutTabs[0];
    const activeWorkshop = workshops.find((workshop) => workshop.id === activeWorkshopId) || workshops[0];
    const isAllAccessSelected = selectedWorkshopIds.includes(allAccessPass.id);
    const selectedWorkshops = workshops.filter((workshop) => selectedWorkshopIds.includes(workshop.id));
    const totalFee = useMemo(() => {
        if (isAllAccessSelected) return allAccessPass.fee;
        return selectedWorkshops.reduce((sum, workshop) => sum + workshop.fee, 0);
    }, [isAllAccessSelected, selectedWorkshops]);

    const selectedLabels = isAllAccessSelected
        ? [allAccessPass.title]
        : selectedWorkshops.map((workshop) => workshop.title);


    useEffect(() => {
        [...aboutTabs, ...workshops].forEach((item) => {
            const image = new Image();
            image.src = item.image;
        });
    }, []);

    useEffect(() => {
        sessionStorage.setItem(skillConnectSelectionStorageKey, JSON.stringify(selectedWorkshopIds));
    }, [selectedWorkshopIds]);

    const toggleWorkshop = (workshopId) => {
        setWorkshopError(false);
        setSelectedWorkshopIds((current) => {
            if (workshopId === allAccessPass.id) {
                return current.includes(allAccessPass.id) ? [] : [allAccessPass.id];
            }

            const individualSelections = current.filter((id) => id !== allAccessPass.id);
            if (individualSelections.includes(workshopId)) {
                return individualSelections.filter((id) => id !== workshopId);
            }
            return [...individualSelections, workshopId];
        });
    };

    const handleOpenFacultyDetails = () => {
        sessionStorage.setItem('pendingScrollTarget', 'about-faculty-details');
        navigate('about');
    };

    const handleRemovePaymentScreenshot = (event) => {
        event?.preventDefault();
        event?.stopPropagation();
        dispatch(clearPaymentScreenshot());
        setPaymentScreenshotPreview('');
        setPaymentScreenshotFileName('');
        setPaymentScreenshotMimeType('');
        setIsPaymentScreenshotPreviewOpen(false);
        if (paymentScreenshotInputRef.current) {
            paymentScreenshotInputRef.current.value = '';
        }
    };

    const handlePaymentScreenshotChange = async (event) => {
        paymentScreenshotRegister.onChange(event);
        const file = event.target.files?.[0];

        if (!file) {
            dispatch(clearPaymentScreenshot());
            setPaymentScreenshotPreview('');
            setPaymentScreenshotFileName('');
            setPaymentScreenshotMimeType('');
            setIsPaymentScreenshotPreviewOpen(false);
            return;
        }

        const resetPaymentScreenshot = () => {
            dispatch(clearPaymentScreenshot());
            event.target.value = '';
            setPaymentScreenshotPreview('');
            setPaymentScreenshotFileName('');
            setPaymentScreenshotMimeType('');
            setIsPaymentScreenshotPreviewOpen(false);
        };

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file for the payment screenshot.');
            resetPaymentScreenshot();
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Please upload a screenshot smaller than 2 MB.');
            resetPaymentScreenshot();
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPaymentScreenshotPreview(String(reader.result || ''));
            setPaymentScreenshotFileName(file.name);
            setPaymentScreenshotMimeType(file.type);
        };
        reader.readAsDataURL(file);

        dispatch(paymentScreenshotUploadStarted());
        try {
            const uploadedScreenshot = await uploadPaymentScreenshotToCloudinary(file);
            dispatch(paymentScreenshotUploadSucceeded({
                ...uploadedScreenshot,
                name: file.name,
                mimeType: file.type,
            }));
        } catch (error) {
            const message = error?.message || 'Payment screenshot upload failed. Please try again.';
            dispatch(paymentScreenshotUploadFailed(message));
            alert(message);
        }
    };

    const getClientIpAddress = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 3000);
            const response = await fetch('https://api.ipify.org?format=json', {
                signal: controller.signal,
            });
            window.clearTimeout(timeoutId);
            if (!response.ok) return '';
            const result = await response.json();
            return result.ip || '';
        } catch (error) {
            return '';
        }
    };
    const uploadPaymentScreenshotToCloudinary = async (file) => {
        if (!file) return null;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary payment screenshot upload is not configured.');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'ophthall/skillconnect/payments');
        formData.append('tags', 'skillconnect,payment-screenshot,ophthall');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.error?.message || 'Payment screenshot upload failed.');
        }

        return {
            url: result.secure_url || result.url || '',
            publicId: result.public_id || '',
            format: result.format || '',
            bytes: result.bytes || '',
            width: result.width || '',
            height: result.height || '',
            originalFilename: result.original_filename || '',
        };
    };

    const handleGoogleSheetForm = async (formData) => {
        try {
            await fetch('https://script.google.com/macros/s/AKfycbyMUEUHDYMsMf9f9SLErE8rvdefoNpqnsLjmVXuFt-vciOWdPxoyLGxPdwGBXtiSOuIpA/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });
            return true;
        } catch (error) {
            console.error('SkillConnect submission error:', error);
            return false;
        }
    };

    const onSubmit = async (data) => {
        if (selectedWorkshopIds.length === 0) {
            setWorkshopError(true);
            scrollToSection('skillconnect-registration');
            return;
        }

        setIsSubmitting(true);
        try {
            const screenshotFile = data.paymentScreenshot?.[0];
            const uploadedScreenshot = paymentScreenshotUpload.data;

            if (totalFee > 0 && !screenshotFile) {
                alert('Please upload the payment screenshot before submitting registration.');
                return;
            }

            if (paymentScreenshotUpload.status === 'uploading') {
                alert('Payment screenshot is still uploading. Please wait a moment and submit again.');
                return;
            }

            if (totalFee > 0 && !uploadedScreenshot?.url) {
                alert(paymentScreenshotUpload.error || 'Payment screenshot Cloudinary URL is missing. Please upload the screenshot again.');
                return;
            }

            const ipAddress = await getClientIpAddress();
            const payload = {
                sheetName: 'Skill Connect',
                source_form: 'SkillConnect 2026 Registration',
                name: data.name?.trim(),
                gender: data.gender || '',
                age: data.age || '',
                phone: data.mobile?.trim(),
                whatsapp: data.whatsapp?.trim() || '',
                email: data.email?.trim(),
                city: data.city?.trim() || '',
                state: data.state?.trim() || '',
                institution: data.institution?.trim() || '',
                designation: data.designation || '',
                years_of_experience: data.experience || '',
                program: selectedLabels.join(', '),
                selected_workshops: selectedLabels.join(', '),
                total_fee: totalFee,
                amount_paid: totalFee,
                all_access_original_total: isAllAccessSelected ? allWorkshopsTotal : '',
                transaction_id: data.transactionId?.trim(),
                payment_screenshot_url: uploadedScreenshot?.url || '',
                ip_address: ipAddress,
                utm_source: localStorage.getItem('utm_source') || 'direct',
                timestamp: new Date().toISOString(),
            };

            const params = new URLSearchParams();
            Object.entries(payload).forEach(([key, value]) => {
                params.append(key, value !== undefined && value !== null ? String(value) : '');
            });

            const success = await handleGoogleSheetForm(params);
            if (success) {
                reset();
                setSelectedWorkshopIds([]);
                sessionStorage.removeItem(skillConnectSelectionStorageKey);
                setPaymentScreenshotPreview('');
                setPaymentScreenshotFileName('');
                setPaymentScreenshotMimeType('');
                setIsPaymentScreenshotPreviewOpen(false);
                dispatch(clearPaymentScreenshot());
                sessionStorage.setItem('lastSubmittedForm', 'skillconnect');
                navigate('thank-you');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('SkillConnect form error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] pt-20 text-[#1e293b]">
            <section className="bg-[#0F2C4C] text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-heading text-sm font-semibold text-orange-100">
                            <CalendarDays size={18} />
                            22-23 August 2026
                        </div>
                        <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
                            Ophthall Academy SkillConnect 2026
                        </h1>
                        <p className="mt-4 font-heading text-2xl font-bold text-[#F47B20]">Learn. Practice. Connect.</p>
                        <p className="mt-5 max-w-3xl font-heading text-lg leading-8 text-blue-50">
                            Hands-on learning workshops for Optometrists, Opticians, Vision Therapists, Students, and Eye Care Professionals.
                        </p>
                        <div className="mt-8 grid gap-3 font-heading text-sm font-semibold sm:grid-cols-3">
                            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                <CalendarDays className="mb-3 text-[#F47B20]" size={22} />
                                22-23 August 2026
                            </div>
                            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                <MapPin className="mb-3 text-[#F47B20]" size={22} />
                                Chennai Trade Centre
                            </div>
                            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
                                <Users className="mb-3 text-[#F47B20]" size={22} />
                                60 seats per workshop
                            </div>
                        </div>
                        <p className="mt-5 font-heading text-sm font-medium text-blue-100">
                            Held alongside the India International Optical Expo 2026 at Nandambakkam, Chennai.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {/* <button
                                type="button"
                                onClick={() => scrollToSection('skillconnect-registration')}
                                className="inline-flex items-center justify-center rounded-full bg-[#F47B20] px-7 py-3 font-heading font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-[#d66a15]"
                            >
                                Register Now
                            </button> */}
                            <button
                                type="button"
                                onClick={() => scrollToSection('skillconnect-workshops')}
                                className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3 font-heading font-bold text-white transition-all hover:bg-white hover:text-[#163A5F]"
                            >
                                View Workshops
                            </button>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl">
                        <img
                            src="/assets/skillconnect_banner.png"
                            alt="Ophthall Academy SkillConnect hands-on workshop"
                            className="h-[320px] w-full rounded-lg object-cover md:h-[440px]"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" id="skillconnect-about">
                <div className="mb-8 max-w-4xl">
                    <p className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">About SkillConnect</p>
                    <h2 className="font-heading text-3xl font-bold text-[#163A5F] md:text-4xl">
                        Practical workshops designed for real eye care practice.
                    </h2>
                    <p className="mt-5 font-heading text-lg leading-8 text-gray-600">
                        The future of eye care belongs to professionals who continuously upgrade their knowledge and skills. SkillConnect focuses on practical learning, live demonstrations, clinical decision-making, and interactive case discussions that participants can implement immediately.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="space-y-3">
                        {aboutTabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveAboutTab(tab.id)}
                                onMouseDown={(event) => event.preventDefault()}
                                className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B20]/40 ${activeAboutTab === tab.id ? 'border-[#F47B20] bg-[#163A5F] shadow-xl shadow-[#163A5F]/15' : 'border-[#163A5F]/10 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:border-[#F47B20]/40 hover:bg-white hover:shadow-md'}`}
                            >
                                <span>
                                    <span className={`block font-heading text-lg font-bold ${activeAboutTab === tab.id ? 'text-white' : 'text-[#163A5F]'}`}>{tab.label}</span>
                                    <span className={`mt-1 block font-heading text-sm leading-6 ${activeAboutTab === tab.id ? 'text-blue-100' : 'text-gray-600'}`}>{tab.text}</span>
                                </span>
                                <span className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${activeAboutTab === tab.id ? 'bg-[#F47B20] text-white' : 'bg-[#F5F7FA] text-gray-300'}`}><Check size={18} /></span>
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={handleOpenFacultyDetails}
                            onMouseDown={(event) => event.preventDefault()}
                            className="group flex w-full items-start justify-between rounded-2xl border border-[#163A5F]/10 bg-white/80 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#F47B20]/40 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B20]/40"
                            aria-label="Open About page faculty details"
                        >
                            <span>
                                <span className="mb-2 block font-heading text-xs font-bold uppercase tracking-wide text-[#F47B20]">Faculty Details</span>
                                <span className="block font-heading text-lg font-bold text-[#163A5F]">Faculties</span>
                                <span className="mt-1 block font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">Nationwide renowned experts in their fields.</span>
                                <span className="mt-3 block font-heading text-sm leading-6 text-gray-600">Their experience and insights will make this workshop truly enriching for all participants.</span>
                            </span>
                            <span className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#F47B20] transition-all group-hover:bg-[#F47B20] group-hover:text-white">
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </span>
                        </button>
                    </div>
                    <div key={activeTab.id} className="overflow-hidden rounded-2xl bg-[#0F2C4C] shadow-xl transition-opacity duration-200">
                        <img key={activeTab.image} src={activeTab.image} alt={activeTab.label} className="h-[300px] w-full object-cover md:h-[420px]" />
                        <div className="border-t border-white/10 bg-[#0F2C4C] p-6 md:p-8">
                            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-wide text-[#F47B20]">SkillConnect Focus</p>
                            <h3 className="font-heading text-2xl font-bold text-white">{activeTab.label}</h3>
                            <p className="mt-3 font-heading leading-7 text-blue-100">{activeTab.text}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">Why Attend</p>
                            <h2 className="font-heading text-3xl font-bold text-[#163A5F] md:text-4xl">Learn with focus, practice with experts.</h2>
                        </div>
                        <p className="max-w-xl border-l-4 font-heading border-[#F47B20] pl-5 text-gray-600 md:border-l-0 md:border-r-4 md:pl-0 md:pr-5 md:text-right">Each workshop is built for high-utility learning, limited seats, and meaningful faculty interaction.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {whyAttendItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="group relative overflow-hidden rounded-2xl border border-[#163A5F]/10 bg-gradient-to-br from-white to-[#F5F7FA] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#F47B20]/40 hover:shadow-xl hover:shadow-[#163A5F]/10">
                                    <div className="absolute right-4 top-4 font-heading text-4xl font-bold text-[#163A5F]/5">{String(index + 1).padStart(2, '0')}</div>
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#F47B20] ring-1 ring-[#F47B20]/10 transition-colors group-hover:bg-[#F47B20] group-hover:text-white">
                                        <Icon size={25} />
                                    </div>
                                    <p className="relative font-heading text-[15px] font-bold leading-6 text-[#163A5F]">{item.label}</p>
                                    <div className="mt-5 h-1 w-10 rounded-full bg-[#F47B20]/80 transition-all group-hover:w-16" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8" id="skillconnect-workshops">
                <div className="mb-10">
                    <p className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">Workshop Schedule</p>
                    <h2 className="font-heading text-3xl font-bold text-[#163A5F] md:text-4xl">Two days of hands-on learning.</h2>
                </div>

                <div className="hidden overflow-hidden rounded-2xl border border-[#163A5F]/10 bg-white shadow-xl shadow-[#163A5F]/5 md:block">
                    <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-[#0F2C4C] to-[#163A5F] text-white">
                            <tr>
                                <th className="px-6 py-4 font-heading text-sm font-bold">Day</th>
                                <th className="px-6 py-4 font-heading text-sm font-bold">Workshop</th>
                                <th className="px-6 py-4 font-heading text-sm font-bold">Time</th>
                                <th className="px-6 py-4 font-heading text-sm font-bold">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workshops.map((workshop) => (
                                <tr key={workshop.id} className="border-t border-[#163A5F]/5 bg-white transition-colors odd:bg-[#F5F7FA]/70 hover:bg-orange-50/60">
                                    <td className="px-6 py-4"><span className="rounded-full bg-[#163A5F]/10 px-3 py-1 font-heading text-sm font-bold text-[#163A5F]">{workshop.day}</span></td>
                                    <td className="px-6 py-4 font-heading font-semibold text-[#163A5F]">{workshop.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{workshop.time}</td>
                                    <td className="px-6 py-4"><span className="rounded-full bg-orange-50 px-3 py-1 font-heading font-bold text-[#F47B20]">&#8377;{workshop.fee}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 md:hidden">
                    {workshops.map((workshop) => (
                        <div key={workshop.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <span className="rounded-full bg-orange-50 px-3 py-1 font-heading text-xs font-bold text-[#F47B20]">{workshop.day}</span>
                                <span className="font-heading text-sm font-bold text-[#163A5F]">&#8377;{workshop.fee}</span>
                            </div>
                            <h3 className="font-heading text-lg font-bold text-[#163A5F]">{workshop.title}</h3>
                            <p className="mt-1 font-heading text-sm text-gray-500">{workshop.time}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-xl border border-[#163A5F]/10 bg-[#F5F7FA] p-4 md:mt-8 md:p-5">
                    <h4 className="font-heading text-sm font-bold text-[#163A5F]">Terms & Conditions</h4>
                    <p className="mt-1 font-heading text-sm text-gray-600">Please Note Registration Fee Is Non Refundable And Does Not Include Lunch</p>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-3">
                        {workshops.map((workshop) => (
                            <button
                                key={workshop.id}
                                type="button"
                                onClick={() => setActiveWorkshopId(workshop.id)}
                                aria-expanded={activeWorkshopId === workshop.id}
                                className={`group w-full rounded-2xl border p-5 text-left transition-all ${activeWorkshopId === workshop.id ? 'border-[#F47B20] bg-[#163A5F] shadow-xl shadow-[#163A5F]/15' : 'border-[#163A5F]/10 bg-white/90 shadow-sm hover:-translate-y-0.5 hover:border-[#F47B20]/40 hover:bg-white hover:shadow-md'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-heading text-xs font-bold uppercase tracking-wide text-[#F47B20]">{workshop.date} | {workshop.time}</p>
                                        <h3 className={`mt-2 font-heading text-xl font-bold ${activeWorkshopId === workshop.id ? 'text-white' : 'text-[#163A5F]'}`}>{workshop.title}</h3>
                                        <p className={`mt-1 font-heading text-sm ${activeWorkshopId === workshop.id ? 'text-blue-100' : 'text-gray-600'}`}>{workshop.subtitle}</p>
                                    </div>
                                    <span className={`mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all ${activeWorkshopId === workshop.id ? 'bg-[#F47B20] text-white' : 'bg-[#F5F7FA] text-[#163A5F] group-hover:bg-orange-50 group-hover:text-[#F47B20]'}`}>
                                        <ArrowRight size={19} />
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div key={activeWorkshop.id} className="overflow-hidden rounded-lg bg-white shadow-lg transition-opacity duration-200">
                        <img key={activeWorkshop.image} src={activeWorkshop.image} alt={activeWorkshop.title} className="h-64 w-full object-cover" />
                        <div className="p-6 md:p-8">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-[#163A5F] px-4 py-2 text-sm font-bold text-white">{activeWorkshop.date}</span>
                                <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[#F47B20]">{activeWorkshop.time}</span>
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-[#163A5F]">&#8377;{activeWorkshop.fee}</span>
                            </div>
                            <h3 className="font-heading text-3xl font-bold text-[#163A5F]">{activeWorkshop.title}</h3>
                            <p className="mt-2 font-heading text-lg font-semibold text-gray-700">{activeWorkshop.subtitle}</p>
                            <p className="mt-4 font-heading leading-7 text-gray-600">{activeWorkshop.description}</p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {activeWorkshop.topics.map((topic) => (
                                    <div key={topic} className="flex items-start gap-3 rounded-xl border border-[#163A5F]/5 bg-gradient-to-br from-white to-[#F5F7FA] p-4 shadow-sm">
                                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#F47B20] ring-1 ring-[#F47B20]/10">
                                            <Check size={15} strokeWidth={3} />
                                        </span>
                                        <span className="font-heading text-sm font-bold leading-6 text-[#163A5F]">{topic}</span>
                                    </div>
                                ))}
                            </div>
                            {/* <button
                                type="button"
                                onClick={() => toggleWorkshop(activeWorkshop.id)}
                                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-bold transition-all sm:w-auto ${selectedWorkshopIds.includes(activeWorkshop.id) ? 'bg-[#163A5F] text-white' : 'bg-[#F47B20] text-white hover:bg-[#d66a15]'}`}
                            >
                                {selectedWorkshopIds.includes(activeWorkshop.id) ? 'Selected' : 'Select this workshop'}
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="bg-white py-16" id="skillconnect-registration">
                <div className="mx-auto max-w-5xl px-4 md:px-8">
                    <div className="mb-10 text-center">
                        <p className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">Registration</p>
                        <h2 className="font-heading text-3xl font-bold text-[#163A5F] md:text-4xl">Register for SkillConnect 2026</h2>
                        <p className="mx-auto mt-4 max-w-3xl font-heading text-gray-600">
                            Fill your details, select workshops, complete payment using the UPI QR code, and submit your registration.
                        </p>
                    </div>

                    <form className="rounded-lg border border-gray-100 bg-[#F5F7FA] p-5 shadow-lg md:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Name *</label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className={inputClass(errors.name)}
                                    placeholder="Enter full name"
                                />
                                {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Gender</label>
                                <select {...register('gender')} className={inputClass(false)}>
                                    <option value="">Select gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Age</label>
                                <input type="number" min="16" max="90" {...register('age')} className={inputClass(false)} placeholder="Enter age" />
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Mobile Number *</label>
                                <input
                                    type="tel"
                                    {...register('mobile', {
                                        required: 'Mobile number is required',
                                        minLength: { value: 10, message: 'Enter a valid mobile number' },
                                    })}
                                    className={inputClass(errors.mobile)}
                                    placeholder="98765 43210"
                                />
                                {errors.mobile && <p className="mt-1 text-xs font-medium text-red-500">{errors.mobile.message}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">WhatsApp Number</label>
                                <input type="tel" {...register('whatsapp')} className={inputClass(false)} placeholder="98765 43210" />
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Email *</label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Enter a valid email address',
                                        },
                                    })}
                                    className={inputClass(errors.email)}
                                    placeholder="name@example.com"
                                />
                                {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">City</label>
                                <input type="text" {...register('city')} className={inputClass(false)} placeholder="City" />
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">State</label>
                                <input type="text" {...register('state')} className={inputClass(false)} placeholder="State" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Institution / Hospital / Optical Store</label>
                                <input type="text" {...register('institution')} className={inputClass(false)} placeholder="Institution, hospital, or optical store name" />
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Designation</label>
                                <select {...register('designation')} className={inputClass(false)}>
                                    <option value="">Select designation</option>
                                    {designationOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Years of Experience</label>
                                <input type="number" min="0" max="60" {...register('experience')} className={inputClass(false)} placeholder="Example: 3" />
                            </div>
                        </div>

                        <div className={`mt-8 rounded-lg border bg-white p-5 ${workshopError ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'}`}>
                            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-[#163A5F]">Workshop Selection *</h3>
                                    <p className="mt-1 font-heading text-sm text-gray-500">Select individual workshops or choose the All Access Pass.</p>
                                </div>
                                <div className="rounded-lg bg-[#163A5F] px-5 py-3 text-white">
                                    <span className="block font-heading text-xs font-bold uppercase tracking-wide text-blue-100">Total Fee</span>
                                    <span className="text-2xl font-bold">&#8377;{totalFee}</span>
                                    {isAllAccessSelected && (
                                        <span className="mt-1 block font-heading text-xs font-bold text-orange-100">
                                            Bundle saving: &#8377;{allAccessSavings}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {workshops.map((workshop) => {
                                    const selected = selectedWorkshopIds.includes(workshop.id);
                                    return (
                                        <button
                                            key={workshop.id}
                                            type="button"
                                            onClick={() => toggleWorkshop(workshop.id)}
                                            className={`flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${selected ? 'border-[#F47B20] bg-orange-50' : 'border-gray-200 bg-white hover:border-[#F47B20]/50'}`}
                                        >
                                            <span className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${selected ? 'border-[#F47B20] bg-[#F47B20]' : 'border-gray-300 bg-white'}`}>
                                                {selected && <Check size={14} className="text-white" />}
                                            </span>
                                            <span className="flex-1">
                                                <span className="block font-bold text-[#163A5F]">{workshop.title}</span>
                                                <span className="mt-1 block text-sm text-gray-500">{workshop.date} | {workshop.time}</span>
                                            </span>
                                            <span className="font-bold text-[#F47B20]">&#8377;{workshop.fee}</span>
                                        </button>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => toggleWorkshop(allAccessPass.id)}
                                    className={`flex items-start gap-4 rounded-lg border p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md max-[390px]:gap-2 max-[390px]:p-2 ${isAllAccessSelected ? 'border-[#163A5F] bg-[#EAF3FC] ring-2 ring-[#163A5F]/10' : 'border-[#163A5F]/20 bg-[#F4F8FC] hover:border-[#163A5F]/50 hover:bg-[#EDF5FC]'}`}
                                >
                                    <span className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${isAllAccessSelected ? 'border-[#163A5F] bg-[#163A5F]' : 'border-gray-300 bg-white'}`}>
                                        {isAllAccessSelected && <Check size={14} className="text-white" />}
                                    </span>
                                    <span className="flex-1">
                                        <span className="flex flex-wrap items-center gap-2">
                                            <span className="font-bold text-[#163A5F]">All Access Pass</span>
                                            <span className="rounded-full bg-[#163A5F] px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-wide text-white">Best value</span>
                                        </span>
                                        <span className="mt-1 block text-sm text-gray-500">
                                            Access all workshops at a bundled price. Save &#8377;{allAccessSavings} compared with individual selection.
                                        </span>
                                    </span>
                                    <span className="flex flex-shrink-0 flex-col items-end gap-1">
                                        <span className="font-heading text-xs font-bold text-gray-400 line-through">&#8377;{allWorkshopsTotal}</span>
                                        <span className="font-bold text-[#163A5F]">&#8377;{allAccessPass.fee}</span>
                                        <span className="rounded-full bg-orange-50 px-2 py-0.5 font-heading text-xs font-bold text-[#F47B20]">
                                            Save &#8377;{allAccessSavings}
                                        </span>
                                    </span>
                                </button>
                            </div>
                            {workshopError && <p className="mt-3 text-sm font-medium text-red-500">Please select at least one workshop or the All Access Pass.</p>}
                        </div>

                        {totalFee > 0 && (
                            <div className="mt-8 rounded-lg border border-orange-100 bg-orange-50 p-5 max-[390px]:px-2">
                                <div className="mb-5 flex items-center gap-3">
                                    <Wallet className="text-[#F47B20]" size={28} />
                                    <div>
                                        <h3 className="font-heading text-2xl font-bold text-[#163A5F]">Payment</h3>
                                        <p className="font-heading text-sm text-gray-600">Please complete payment before submitting registration.</p>
                                    </div>
                                </div>
                                <div className="grid gap-6 md:grid-cols-[300px_1fr] md:items-start">
                                    <div className="rounded-lg bg-white p-4 text-center shadow-sm max-[390px]:px-2">
                                        <img
                                            src="/assets/qr-code-new-2.jpeg"
                                            alt="SkillConnect UPI QR code"
                                            className="mx-auto aspect-square w-full max-w-[300px] rounded-lg bg-white object-contain object-center"
                                        />
                                        <p className="mt-3 text-xs font-semibold text-gray-500">SkillConnect UPI QR code</p>
                                    </div>
                                    <div className="grid gap-5">
                                        <div className="rounded-lg bg-white p-4">
                                            <span className="block font-heading text-xs font-bold uppercase tracking-wide text-gray-500">Amount Payable</span>
                                            <span className="mt-1 block text-3xl font-bold text-[#F47B20]">&#8377;{totalFee}</span>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Selected: {selectedLabels.length ? selectedLabels.join(', ') : 'No workshop selected'}
                                            </p>
                                            {isAllAccessSelected && (
                                                <div className="mt-3 flex flex-wrap items-center gap-2 font-heading text-xs font-bold">
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-500 line-through">
                                                        Individual total &#8377;{allWorkshopsTotal}
                                                    </span>
                                                    <span className="rounded-full bg-orange-50 px-3 py-1 text-[#F47B20]">
                                                        Bundle discount applied: Save &#8377;{allAccessSavings}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Transaction ID *</label>
                                            <input
                                                type="text"
                                                {...register('transactionId', { required: totalFee > 0 ? 'Transaction ID is required' : false })}
                                                className={inputClass(errors.transactionId)}
                                                placeholder="Enter UPI transaction ID"
                                            />
                                            {errors.transactionId && <p className="mt-1 text-xs font-medium text-red-500">{errors.transactionId.message}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-2 block font-heading text-sm font-bold text-gray-700">Upload Payment Screenshot</label>
                                            <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-[#163A5F]/20 bg-white p-4 transition-all hover:border-[#F47B20]/60 hover:bg-orange-50/30">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...paymentScreenshotRegister}
                                                    onChange={handlePaymentScreenshotChange}
                                                    ref={(element) => {
                                                        paymentScreenshotRegister.ref(element);
                                                        paymentScreenshotInputRef.current = element;
                                                    }}
                                                    className="sr-only"
                                                />
                                                {paymentScreenshotPreview ? (
                                                    <div className="grid gap-4 sm:grid-cols-[140px_1fr] sm:items-center">
                                                        <div className="relative w-full sm:w-36">
                                                            <button
                                                                type="button"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    setIsPaymentScreenshotPreviewOpen(true);
                                                                }}
                                                                aria-label="View uploaded payment screenshot"
                                                                className="group block w-full overflow-hidden rounded-xl border border-[#163A5F]/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:ring-offset-2"
                                                            >
                                                                <img src={paymentScreenshotPreview} alt="Uploaded payment screenshot preview" className="h-32 w-full object-cover transition-transform group-hover:scale-105" />
                                                            </button>
                                                            <button type="button" onClick={handleRemovePaymentScreenshot} aria-label="Remove payment screenshot" className="absolute -right-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 ring-2 ring-white transition-colors hover:bg-red-600"><X size={17} strokeWidth={3} /></button>
                                                            <button
                                                                type="button"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    setIsPaymentScreenshotPreviewOpen(true);
                                                                }}
                                                                aria-label="Preview uploaded payment screenshot"
                                                                className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#163A5F] text-white shadow-lg transition-colors hover:bg-[#0F2C4C]"
                                                            >
                                                                <Eye size={16} />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <p className="font-heading text-sm font-bold text-[#163A5F]">{paymentScreenshotUpload.status === 'uploading' ? 'Uploading....' : 'Screenshot uploaded'}</p>
                                                            <p className="mt-1 break-all font-heading text-xs text-gray-500">{paymentScreenshotFileName}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                        <div>
                                                            <p className="font-heading text-sm font-bold text-[#163A5F]">Upload screenshot image</p>
                                                            <p className="mt-1 font-heading text-xs text-gray-500">PNG, JPG, or WEBP up to 2 MB. Preview appears here after upload.</p>
                                                        </div>
                                                        <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#163A5F] px-5 py-2 font-heading text-sm font-bold text-white max-[390px]:px-3 max-[390px]:text-xs">Browse image</span>
                                                    </div>
                                                )}
                                            </label>
                                            {(paymentScreenshotUpload.status === 'uploading' || paymentScreenshotUpload.status === 'failed') && (
                                                <div className="mt-2 font-heading text-xs">
                                                    {paymentScreenshotUpload.status === 'uploading' && (
                                                        <p className="font-bold text-[#F47B20]">Uploading....</p>
                                                    )}
                                                    {paymentScreenshotUpload.status === 'failed' && (
                                                        <p className="font-bold text-red-500">{paymentScreenshotUpload.error}</p>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || paymentScreenshotUpload.status === 'uploading'}
                            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F47B20] px-7 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-[#d66a15] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <ReceiptText size={22} />
                            {isSubmitting ? 'Submitting Registration...' : 'Submit Registration'}
                        </button>
                    </form>
                </div>
            </section> */}

            <section className="bg-[#163A5F] py-14 text-white">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
                        <div>
                            <p className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-[#F47B20]">Contact</p>
                            <h2 className="font-heading text-3xl font-bold">Ophthall Academy</h2>
                            <p className="mt-4 font-heading text-blue-100">For registration assistance and workshop queries, contact the academy team.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <a href="mailto:academy@ophthall.in" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 font-semibold transition-colors hover:bg-white/15">
                                <Mail className="text-[#F47B20]" size={22} />
                                academy@ophthall.in
                            </a>
                            <a href="mailto:info@ophthall.in" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 font-semibold transition-colors hover:bg-white/15">
                                <Mail className="text-[#F47B20]" size={22} />
                                info@ophthall.in
                            </a>
                            <a href="tel:+919443013809" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 font-semibold transition-colors hover:bg-white/15">
                                <Phone className="text-[#F47B20]" size={22} />
                                Jaanake - +91 94430 13809
                            </a>
                            <a href="https://www.ophthall.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 font-semibold transition-colors hover:bg-white/15">
                                <MapPin className="text-[#F47B20]" size={22} />
                                www.ophthall.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {isPaymentScreenshotPreviewOpen && paymentScreenshotPreview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6" role="dialog" aria-modal="true" aria-label="Payment screenshot preview">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsPaymentScreenshotPreviewOpen(false)}
                            aria-label="Close payment screenshot preview"
                            className="absolute -right-3 -top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg ring-2 ring-white transition-colors hover:bg-red-600"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>
                        <img src={paymentScreenshotPreview} alt="Payment screenshot full preview" className="max-h-[86vh] max-w-[92vw] rounded-md object-contain shadow-2xl" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillConnect;






















