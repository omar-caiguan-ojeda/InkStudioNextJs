
"use client";

import React, { useState, useEffect } from 'react';

interface HeroDynamicTextProps {
  language: 'es' | 'en';
}

export const HeroDynamicText: React.FC<HeroDynamicTextProps> = ({ language }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const texts = language === 'es' 
    ? [
        "Convierte tus ideas en arte permanente",
        "Especialistas en blackwork y fine line",
        "Tu historia, nuestra técnica",
        "Agenda tu próxima obra maestra"
      ]
    : [
        "Turn your ideas into permanent art",
        "Specialists in blackwork and fine line",
        "Your story, our technique", 
        "Schedule your next masterpiece"
      ];

  useEffect(() => {
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDuration = 3000;

    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];

      if (!isDeleting) {
        // Typing
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, charIndex, texts, language]);

  return (
    <h2 className="hero-subtitle">
      <span>{currentText}</span>
      <span className="hero-typing-cursor">|</span>
    </h2>
  );
};
