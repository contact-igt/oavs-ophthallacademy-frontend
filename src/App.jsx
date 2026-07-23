import React, { useState, useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingActionButtons from './components/layout/FloatingActionButtons';
import BrochureModal from './components/common/BrochureModal';
import Home from './pages/Home';
import About from './pages/About';
import CourseDispensing from './pages/CourseDispensing';
import CourseClinical from './pages/CourseClinical';
import CourseContactLens from './pages/CourseContactLens';
import CourseOrthoptics from './pages/CourseOrthoptics';
import CourseLowVision from './pages/CourseLowVision';
import Admissions from './pages/Admissions';
import Internship from './pages/Internship';
import SkillConnect from './pages/SkillConnect';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import useUTMSource from './utils/useUTMSource';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [brochureModalOpen, setBrochureModalOpen] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useUTMSource();

    // Initial page load and history sync
    useEffect(() => {
        const syncPath = () => {
            const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
            setCurrentPage(path || 'home');
        };

        syncPath();
        window.addEventListener('popstate', syncPath);
        return () => window.removeEventListener('popstate', syncPath);
    }, []);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    }, [currentPage]);

    // Navbar background effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const knownPages = ['home', 'about', 'dispensing', 'clinical', 'contact-lens', 'orthoptics', 'low-vision', 'internship',  'admissions', 'thank-you', 'privacy-policy'];
    // 'skillconnect',
    const navigate = (page) => {
        setCurrentPage(page);
        window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    };

    // Brochure download gate — shows form on first click per session
    const handleBrochureDownload = () => {
        if (sessionStorage.getItem('brochureFormSubmitted') === 'true') {
            // Already submitted this session — download directly
            const a = document.createElement('a');
            a.href = '/broucher.jpeg';
            a.download = 'broucher.jpeg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            setBrochureModalOpen(true);
        }
    };

    return (
        <div className="antialiased bg-[#F5F7FA] text-[#1e293b]">
            <GlobalStyles />

            <Navigation
                currentPage={currentPage}
                navigate={navigate}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                scrolled={scrolled}
            />

            <main>
                {currentPage === 'home' && <Home navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'about' && <About />}
                {currentPage === 'dispensing' && <CourseDispensing navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'clinical' && <CourseClinical navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'contact-lens' && <CourseContactLens navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'orthoptics' && <CourseOrthoptics navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'low-vision' && <CourseLowVision navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {currentPage === 'internship' && <Internship navigate={navigate} onBrochureDownload={handleBrochureDownload} />}
                {/* {currentPage === 'skillconnect' && <SkillConnect navigate={navigate} />} */}
                {currentPage === 'admissions' && <Admissions navigate={navigate} />}
                {currentPage === 'thank-you' && <ThankYou navigate={navigate} />}
                {currentPage === 'privacy-policy' && <PrivacyPolicy navigate={navigate} />}
                {!knownPages.includes(currentPage) && (
                    <div className="min-h-[60vh] pt-32 px-4 text-center bg-[#F5F7FA]">
                        <p className="text-sm font-bold uppercase tracking-wide text-[#F47B20] mb-3">Page not found</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#163A5F] mb-4">We could not find this page.</h1>
                        <p className="text-gray-600 mb-6">Please use the navigation menu or return to the homepage.</p>
                        <button onClick={() => navigate('home')} className="bg-[#F47B20] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30">
                            Return to Home
                        </button>
                    </div>
                )}
            </main>

            <Footer navigate={navigate} />
            <FloatingActionButtons />

            {/* Brochure lead-capture modal — rendered at root so it overlays any page */}
            <BrochureModal
                isOpen={brochureModalOpen}
                onClose={() => setBrochureModalOpen(false)}
                program={currentPage}
            />
        </div>
    );
};

export default App;
