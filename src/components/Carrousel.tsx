"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const portfolioImages = [
  {
    src: "/tatto_007.jpg",
    alt: "Tatuaje Blackwork",
    category: "Blackwork",
    description: "Resultado de años de experiencia"
  },
  {
    src: "/tatto_008.jpg", 
    alt: "Tatuaje Fine Line",
    category: "Fine Line",
    description: "Diseños delicados y precisos"
  },
  {
    src: "/tatto_009.jpg",
    alt: "Tatuaje Geométrico",
    category: "Geométrico", 
    description: "Patrones únicos y modernos"
  },
  {
    src: "/tatto_010.jpeg",
    alt: "Tatuaje Realismo",
    category: "Realismo",
    description: "Arte hiperrealista en piel"
  },
    {
    src: "/tatto_011.jpg", 
    alt: "Tatuaje Fine Line",
    category: "Fine Line",
    description: "Diseños delicados y precisos"
  },
  {
    src: "/tatto_012.jpeg",
    alt: "Tatuaje Geométrico",
    category: "Geométrico", 
    description: "Patrones únicos y modernos"
  },
  {
    src: "/tatto_013.jpg",
    alt: "Tatuaje Realismo",
    category: "Realismo",
    description: "Arte hiperrealista en piel"
  },
  {
    src: "/tatto_014.webp", 
    alt: "Tatuaje Fine Line",
    category: "Fine Line",
    description: "Diseños delicados y precisos"
  },
  {
    src: "/tatto_015.jpg",
    alt: "Tatuaje Geométrico",
    category: "Geométrico", 
    description: "Patrones únicos y modernos"
  },
  {
    src: "/tatto_016.jpg",
    alt: "Tatuaje Realismo",
    category: "Realismo",
    description: "Arte hiperrealista en piel"
  },
  {
    src: "/tatto_017.webp",
    alt: "Tatuaje Realismo",
    category: "Realismo",
    description: "Arte hiperrealista en piel"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? portfolioImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === portfolioImages.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-title">Nuestros Trabajos</h2>
        <p className="portfolio-subtitle">
          Explora algunos de nuestros mejores diseños y trabajos realizados
        </p>
        
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button 
              className="carousel-btn carousel-btn-prev"
              onClick={goToPrevious}
              aria-label="Imagen anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="carousel-content">
              <div className="carousel-image-container">
                <Image
                  src={portfolioImages[currentIndex].src}
                  alt={portfolioImages[currentIndex].alt}
                  width={600}
                  height={400}
                  className="carousel-image"
                  priority={currentIndex === 0}
                />
                <div className="carousel-overlay">
                  <div className="carousel-info">
                    <span className="carousel-category">
                      {portfolioImages[currentIndex].category}
                    </span>
                    <p className="carousel-description">
                      {portfolioImages[currentIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="carousel-btn carousel-btn-next"
              onClick={goToNext}
              aria-label="Siguiente imagen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="carousel-indicators">
            {portfolioImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          <button className="portfolio-cta">
            <span>Ver Más</span>
          </button>
        </div>
      </div>
    </section>
  );
}
