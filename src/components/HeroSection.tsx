
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroDynamicText } from './HeroDynamicText';
import { AnimatedStats } from './AnimatedStats';
import { ImageGallery } from './ImageGallery';

interface HeroSectionProps {
  language: 'es' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroTexts = language === 'es' 
    ? {
        title: "Arte en tu",
        accent: "Piel",
        description: "Especialistas en blackwork, fine line y realismo. Transforma tus ideas en arte permanente con nuestros artistas certificados.",
        ctaButton: "Comenzar mi Tatuaje"
      }
    : {
        title: "Art on your",
        accent: "Skin", 
        description: "Specialists in blackwork, fine line and realism. Transform your ideas into permanent art with our certified artists.",
        ctaButton: "Start my Tattoo"
      };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              {heroTexts.title}{" "}
              <span className="hero-accent">
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

            <button className="hero-cta fade-in-up" onClick={scrollToBooking}>
              <div className="hero-cta-overlay"></div>
              <span className="hero-cta-text">
                {heroTexts.ctaButton}
                <span className="hero-cta-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </span>
            </button>
          </div>

          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
