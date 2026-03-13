import React, { useState } from 'react';
import './SideScrollMenu.css';

const SideScrollMenu = ({ scrollToPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (pageIndex) => {
    setIsOpen(false);
    if (scrollToPage) {
      scrollToPage(pageIndex);
    }
  };

  return (
    <div className={`scroll-container ${isOpen ? 'open' : ''}`}>

      {/* 1. THE PAPER (Unrolls to the Left) */}
      <div className="scroll-paper">
        <div className="paper-content">
          <button onClick={() => handleNavClick(0)}>HOME</button>
          <button onClick={() => handleNavClick(1)}>ABOUT</button>
          <button onClick={() => handleNavClick(1)}>THEMES</button>
          <button onClick={() => handleNavClick(1)}>PRIZES</button>
          <button onClick={() => handleNavClick(1)}>FAQ</button>
          <button onClick={() => handleNavClick(2)}>TIMELINE</button>
        </div>
      </div>

      {/* 2. THE WOODEN ROLL (The Handle) */}
      <div className="scroll-roller" onClick={toggleMenu}>
        <div className="roller-cap top"></div>
        <div className="roller-body">
          <span className="vertical-text">{isOpen ? 'CLOSE' : 'MENU'}</span>
        </div>
        <div className="roller-cap bottom"></div>
      </div>

    </div>
  );
};

export default SideScrollMenu;