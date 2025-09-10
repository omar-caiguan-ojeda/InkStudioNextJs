"use client";

import React, { useState, useEffect, useMemo } from 'react';

interface HeroDynamicTextProps {
  language: 'es' | 'en';
}

export const HeroDynamicText: React.FC<HeroDynamicTextProps> = ({ language }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const texts = useMemo(() => {
    return language === 'es' 
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
  }, [language]);

  useEffect(() => {
    const baseTypeSpeed = 60;
    const baseDeleteSpeed = 30;
    const pauseDuration = 2500;
    const shortPause = 150;

    // Add natural variation to typing speed
    const getVariableSpeed = (baseSpeed: number) => {
      return baseSpeed + Math.random() * 40 - 20;
    };

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];

      if (!isDeleting) {
        // Typing phase
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
          
          // Add slight pause after punctuation for more natural feel
          if (['.', ',', '!', '?'].includes(fullText[charIndex])) {
            setTimeout(() => {}, shortPause);
          }
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % texts.length);
          // Small pause before starting to type next text
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
          }, 300);
        }
      }
    }, isDeleting ? getVariableSpeed(baseDeleteSpeed) : getVariableSpeed(baseTypeSpeed));

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, charIndex, isPaused, texts]);

  return (
    <h2 className="hero-subtitle">
      <span>{currentText}</span>
      <span className="hero-typing-cursor">|</span>
    </h2>
  );
};
