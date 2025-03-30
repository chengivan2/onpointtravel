// components/Header/Header.tsx
'use client'; // This component needs hooks and browser interactions

// Keep React imports for hooks and Suspense
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Logo from './Logo'; // Assuming component file is Logo.tsx
import HeaderButtons from './HeaderButtons'; // Now potentially an async Server Component
import ThemeToggler from './ThemeToggler'; // Client Component
import MobileMenuToggle from './MobileMenuToggle'; // Server Component (just renders icon)
import MobileMenu from './MobileMenu'; // Client Component

const Header = () => {
  // REMOVE the local isLoggedIn state - auth state is handled in children
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll handling logic (add window checks for safety)
  const controlHeaderVisibility = useCallback(() => {
    // Ensure window exists (runs client-side, but good practice)
    if (typeof window === 'undefined') return;

    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsMenuOpen(false); // Close menu when hiding header
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial scroll position on mount
      setLastScrollY(window.scrollY);
      window.addEventListener('scroll', controlHeaderVisibility);
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', controlHeaderVisibility);
      }
    };
  }, [controlHeaderVisibility]); // Dependency array


  // Body scroll lock logic
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount or when isMenuOpen changes
    return () => {
       document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);


  // Memoize handler functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
                   bg-lightmode-header-bg-color dark:bg-darkmode-header-bg-color shadow-md
                   ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <Logo /> {/* Use correct import name */}
                </div>

                {/* Right: Buttons, Theme Toggler, Menu Toggle */}
                <div className="flex items-center space-x-3">
                   {/* Render HeaderButtons without isLoggedIn prop */}
                   {/* Wrap in Suspense if HeaderButtons is async */}
                   <Suspense fallback={
                       // Simple placeholder for desktop buttons
                       <div className="hidden md:flex items-center space-x-3 h-8">
                           <div className="w-32 h-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                           <div className="w-20 h-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                       </div>
                   }>
                       <HeaderButtons />
                   </Suspense>

                   <ThemeToggler />

                   {/* Interaction Button for Mobile Menu */}
                   <div className="md:hidden">
                     <button
                       onClick={toggleMenu} // Attach the interaction here
                       aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                       aria-expanded={isMenuOpen}
                       // Apply button styling from previous MobileMenuToggle or adjust as needed
                       className="p-2 rounded-md text-lightmode-headertext-color hover:text-lightmode-headertext-hover-color dark:text-darkmode-headertext-color dark:hover:text-darkmode-headertext-hover-color transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightmode-heading-color dark:focus:ring-darkmode-heading-color"
                     >
                       {/* Render the Server Component icon based on state */}
                       <MobileMenuToggle isOpen={isMenuOpen} />
                     </button>
                   </div>
                </div>
            </div>
        </nav>
      </header>

      {/* Mobile Menu Component - Render without isLoggedIn prop */}
      <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />

      {/* Spacer */}
       <div className="h-16"></div>
    </>
  );
};

export default Header;