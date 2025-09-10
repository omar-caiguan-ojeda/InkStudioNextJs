
"use client";

import React from 'react';
import Image from 'next/image';

export const ImageGallery: React.FC = () => {
  const galleryImages = [
    {
      src: "/tatto_001.jpeg",
      alt: "Tatuaje blackwork",
      label: "Blackwork",
      position: "left"
    },
    {
      src: "/tatto_002.webp", 
      alt: "Tatuaje fine line",
      label: "Fine Line",
      position: "right"
    },
    {
      src: "/tatto_004.webp",
      alt: "Tatuaje geométrico", 
      label: "Geométrico",
      position: "left"
    },
    {
      src: "/tatto_003.webp",
      alt: "Tatuaje realismo",
      label: "Realismo", 
      position: "right"
    }
  ];

  return (
    <div className="hero-gallery fade-in-up">
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className={`gallery-item gallery-item-${image.position} gallery-item-${index + 1}`}
          >
            <div className="gallery-image-container">
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={250}
                className="gallery-image"
                priority={index < 2}
              />
              <div className="gallery-overlay">
                <div className="gallery-label">{image.label}</div>
                <div className="gallery-glow"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
