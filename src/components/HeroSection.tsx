"use client";

import React from 'react';
import { HeroDynamicText } from './HeroDynamicText';
import { AnimatedStats } from './AnimatedStats';
import { ImageGallery } from './ImageGallery';

interface HeroSectionProps {
  language: 'es' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const scrollToBooking = () => {
    const bookingSection = document.querySelector('.booking-container');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroTexts = language === 'es' 
    ? {
        title: "Arte en tu",
        accent: "Piel",
        description: "Especialistas en blackwork, fine line y realismo. Transforma tus ideas en arte permanente con nuestros artistas certificados.",
        ctaButton: "Agendar Cita"
      }
    : {
        title: "Art on your",
        accent: "Skin", 
        description: "Specialists in blackwork, fine line and realism. Transform your ideas into permanent art with our certified artists.",
        ctaButton: "Book Appointment"
      };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              {heroTexts.title} <span className="hero-accent">
                {heroTexts.accent}
                <div className="hero-accent-line"></div>
              </span>
            </h1>

            <div className="hero-subtitle-container fade-in-up">
              <HeroDynamicText language={language} />
            </div>

            <p className="hero-description fade-in-up">
              {heroTexts.description}
            </p>

            <AnimatedStats language={language} />

            <button className="cta-button" onClick={scrollToBooking}>
              <div className="cta-overlay"></div>
              {language === 'es' ? (
                <span className="cta-text">Agendar Cita</span>
              ) : (
                <span className="cta-text">Book Appointment</span>
              )}
            </button>
          </div>

          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
