import React, { useState, useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FloatingActionButtons from './components/layout/FloatingActionButtons';
import Home from './pages/Home';
import About from './pages/About';
import CourseDispensing from './pages/CourseDispensing';
import CourseClinical from './pages/CourseClinical';
import CourseContactLens from './pages/CourseContactLens';
import CourseOrthoptics from './pages/CourseOrthoptics';
import CourseLowVision from './pages/CourseLowVision';
import Admissions from './pages/Admissions';
import ThankYou from './pages/ThankYou';
import useUTMSource from './utils/useUTMSource';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useUTMSource();
    // Initial page load and history sync
    useEffect(() => {
        const syncPath = () => {
            const path = window.location.pathname.replace('/', '');
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

    const navigate = (page) => {
        setCurrentPage(page);
        window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
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
                {currentPage === 'home' && <Home navigate={navigate} />}
                {currentPage === 'about' && <About />}
                {currentPage === 'dispensing' && <CourseDispensing navigate={navigate} />}
                {currentPage === 'clinical' && <CourseClinical navigate={navigate} />}
                {currentPage === 'contact-lens' && <CourseContactLens navigate={navigate} />}
                {currentPage === 'orthoptics' && <CourseOrthoptics navigate={navigate} />}
                {currentPage === 'low-vision' && <CourseLowVision navigate={navigate} />}
                {currentPage === 'admissions' && <Admissions navigate={navigate} />}

                {currentPage === 'thank-you' && <ThankYou navigate={navigate} />}

            </main>

            <Footer navigate={navigate} />
            <FloatingActionButtons />
        </div>
    );
};

export default App;
