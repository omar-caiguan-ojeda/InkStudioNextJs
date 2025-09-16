"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Artists from "../components/Artists";
import Carrousel from "../components/Carrousel";
import Services from "../components/Services";
import BookingForm from "../components/BookingForm";
import Contact from "../components/Contact";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function HomePage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    // Always scroll to top on page load/reload
    window.scrollTo(0, 0);
    
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Scroll animations observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      observer.disconnect();
    };
  }, []);

  // Load saved language on first mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (saved === 'en' || saved === 'es') setLanguage(saved);
  }, []);

  return (
    <>
      {/* Language Toggle */}
      <div className="language-toggle" role="group" aria-label="Language selector">
        <button
          onClick={() => {
            setLanguage('es');
            if (typeof window !== 'undefined') localStorage.setItem('lang', 'es');
          }}
          aria-pressed={language === 'es'}
          className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        >
          ES
        </button>
        <button
          onClick={() => {
            setLanguage('en');
            if (typeof window !== 'undefined') localStorage.setItem('lang', 'en');
          }}
          aria-pressed={language === 'en'}
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        >
          EN
        </button>
      </div>

      {/* Header Modularizado */}
      <Header language={language} />

      {/* Hero Section Mejorado */}
      <HeroSection language={language} />

      {/* About Section */}
      <div className="scroll-animate">
        <About language={language} />
      </div>

      {/* Artists Section */}
      <div className="scroll-animate">
        <Artists language={language} />
      </div>

      {/* Portfolio Section */}
      <div className="scroll-animate">
        <Carrousel language={language} />
      </div>

      {/* Services Section */}
      <div className="scroll-animate">
        <Services language={language} />
      </div>

      {/* FAQ Section */}
      <div className="scroll-animate">
        <FaqSection language={language} />
      </div>

      {/* Contact Section */}
      <div className="scroll-animate">
        <Contact language={language} />
      </div>

      {/* Booking Section */}
      <div className="scroll-animate booking-container" id="booking">
        <BookingForm />
      </div>

      {/* Footer */}
      <Footer language={language} />

      {/* Inline styles for the floating language toggle */}
      <style jsx>{`
        .language-toggle {
          position: fixed;
          top: 80px; /* place below fixed header */
          right: 16px;
          display: inline-flex;
          gap: 8px;
          padding: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          z-index: 10000; /* above header */
        }
        .lang-btn {
          appearance: none;
          border: none;
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--text-light);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lang-btn:hover { transform: translateY(-1px); }
        .lang-btn.active {
          background: linear-gradient(135deg, #DC2626 0%, #FF3737 100%);
          color: #fff;
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.35);
        }
      `}</style>
    </>
  );
}
