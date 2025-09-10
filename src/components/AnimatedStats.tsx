
"use client";

import React from 'react';

interface AnimatedStatsProps {
  language: 'es' | 'en';
}

export const AnimatedStats: React.FC<AnimatedStatsProps> = ({ language }) => {
  const statsData = language === 'es' 
    ? [
        {
          icon: "🎨",
          number: "500+",
          label: "Tatuajes Realizados"
        },
        {
          icon: "⭐",
          number: "5+",
          label: "Años de Experiencia"
        },
        {
          icon: "❤️",
          number: "100%",
          label: "Clientes Satisfechos"
        }
      ]
    : [
        {
          icon: "🎨",
          number: "500+",
          label: "Tattoos Completed"
        },
        {
          icon: "⭐",
          number: "5+",
          label: "Years of Experience"
        },
        {
          icon: "❤️",
          number: "100%",
          label: "Satisfied Clients"
        }
      ];

  return (
    <div className="hero-stats fade-in-up">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-icon floating-animation" style={{ animationDelay: `${index * 0.5}s` }}>
            {stat.icon}
          </div>
          <div className="stat-number pulse-animation" style={{ animationDelay: `${index * 0.3}s` }}>
            {stat.number}
          </div>
          <div className="stat-label slide-animation" style={{ animationDelay: `${index * 0.2}s` }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
