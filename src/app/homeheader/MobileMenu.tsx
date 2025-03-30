
'use client';
import React from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import MobileHeaderAuthButton from './MobileHeaderAuthButton';
interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
  // Effect to handle body scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50"
        aria-hidden="true"
        onClick={closeMenu}
      ></div>

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-lightmode-header-bg-color dark:bg-darkmode-header-bg-color shadow-xl transform transition-transform ease-in-out duration-300 translate-x-0">
        <div className="flex justify-end p-4">
          <button onClick={closeMenu}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-4">
          
          <Link href="/create-trip" onClick={closeMenu} /* ... (rest of link attrs) */>
            Make your own trip
          </Link>

          
          <div onClick={closeMenu}>
             
            <React.Suspense fallback={
              <div className="block px-3 py-2 text-center text-sm text-gray-400 dark:text-gray-500">Loading...</div>
            }>
              <MobileHeaderAuthButton />
            </React.Suspense>
          </div>

        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;