
"use client";

import React, { useState, useEffect } from 'react';
import { NavbarDynamicText } from './NavbarDynamicText';

interface HeaderProps {
  language: 'es' | 'en';
}

const Header: React.FC<HeaderProps> = ({ language }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = language === 'es' 
    ? [
        { href: '#about-us', label: 'Quiénes Somos' },
        { href: '#servicios', label: 'Servicios' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#booking', label: 'Agendar' },
        { href: '#contacto', label: 'Contacto' }
      ]
    : [
        { href: '#about-us', label: 'About Us' },
        { href: '#services', label: 'Services' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#booking', label: 'Book' },
        { href: '#contact', label: 'Contact' }
      ];

  const ctaText = language === 'es' ? 'Agendar Cita' : 'Book Appointment';

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-content">
        <nav className="nav">
          <div className="logo-container">
            <a href="#" className="logo-link">
              <div className="logo-icon">
                <span>I</span>
              </div>
              <div className="logo-text">
                <span className="logo-title">INKSTUDIO</span>
                <NavbarDynamicText language={language} />
              </div>
            </a>
          </div>

          <div className="nav-menu">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="nav-link">
                <span>{item.label}</span>
                <div className="nav-underline"></div>
              </a>
            ))}
          </div>

          <button className="cta-button" onClick={scrollToBooking}>
            <div className="cta-overlay"></div>
            <span className="cta-text">{ctaText}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
