
"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Carrousel from "../components/Carrousel";
import Services from "../components/Services";
import BookingForm from "../components/BookingForm";
import Footer from "../components/Footer";

export default function HomePage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
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

  return (
    <>
      {/* Language Toggle (opcional para futuro uso) */}
      <div className="language-toggle">
        <button 
          onClick={() => setLanguage('es')} 
          className={language === 'es' ? 'active' : ''}
        >
          ES
        </button>
        <button 
          onClick={() => setLanguage('en')} 
          className={language === 'en' ? 'active' : ''}
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
        <About />
      </div>

      {/* Portfolio Section */}
      <div className="scroll-animate">
        <Carrousel />
      </div>

      {/* Services Section */}
      <div className="scroll-animate">
        <Services />
      </div>

      {/* Booking Section */}
      <div className="scroll-animate">
        <BookingForm />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
