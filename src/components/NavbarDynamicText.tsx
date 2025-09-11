"use client";

import React, { useState, useEffect, useMemo } from 'react';

interface NavbarDynamicTextProps {
  language: 'es' | 'en';
}

export const NavbarDynamicText: React.FC<NavbarDynamicTextProps> = ({ language }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const texts = useMemo(() => language === 'es' 
    ? [
        "Blackwork Specialist",
        "Fine Line Expert", 
        "Tu visión, nuestro arte",
        "Arte Premium"
      ]
    : [
        "Blackwork Specialist",
        "Fine Line Expert",
        "Your vision, our art",
        "Premium Art"
      ], [language]);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

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
    <span className="logo-subtitle navbar-dynamic-text">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
};
