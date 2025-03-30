// components/Header/MobileMenuToggle.tsx
import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MobileMenuToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isOpen, toggleMenu }) => {
  return (
    // Shown only on small screens
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="p-2 rounded-md text-lightmode-headertext-color hover:text-lightmode-headertext-hover-color dark:text-darkmode-headertext-color dark:hover:text-darkmode-headertext-hover-color transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightmode-heading-color dark:focus:ring-darkmode-heading-color"
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default MobileMenuToggle;