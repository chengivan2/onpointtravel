"use client"

import { FaBars, FaTimes } from 'react-icons/fa';
interface MobileMenuToggleProps {
  isOpen: boolean;
}

const MobileMenuToggle = ({ isOpen }: MobileMenuToggleProps) => {
 
  return (
    <>
      {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
    </>
  );
};

export default MobileMenuToggle;