"use client";

type Lang = 'es' | 'en';

interface ServicesProps {
  language?: Lang;
}

const services = [
  {
    id: "pequeno",
    nameEs: "Tatuaje Pequeño",
    nameEn: "Small Tattoo",
    price: "$80 - $150",
    durationEs: "1-2 horas",
    durationEn: "1-2 hours",
    descriptionEs: "Diseños hasta 5cm. Perfecto para primeros tatuajes.",
    descriptionEn: "Designs up to 5cm. Perfect for first tattoos.",
    featuresEs: ["Líneas finas", "Detalles pequeños", "Consulta incluida"],
    featuresEn: ["Fine lines", "Small details", "Consultation included"],
    popular: false,
    icon: "✨",
  },
  {
    id: "mediano",
    nameEs: "Tatuaje Mediano",
    nameEn: "Medium Tattoo",
    price: "$200 - $400",
    durationEs: "2-4 horas",
    durationEn: "2-4 hours",
    descriptionEs: "Diseños hasta 15cm. Piezas con elaboración media.",
    descriptionEn: "Designs up to 15cm. Medium complexity pieces.",
    featuresEs: ["Sombreado", "Colores básicos", "Boceto personalizado"],
    featuresEn: ["Shading", "Basic colors", "Custom sketch"],
    popular: true,
    icon: "🎨",
  },
  {
    id: "grande",
    nameEs: "Tatuaje Grande",
    nameEn: "Large Tattoo",
    price: "$500 - $800",
    durationEs: "4-8 horas",
    durationEn: "4-8 hours",
    descriptionEs:
      "Diseños complejos hasta 25cm. Piezas elaboradas con múltiples sesiones.",
    descriptionEn:
      "Complex designs up to 25cm. Elaborate pieces with multiple sessions.",
    featuresEs: ["Diseño complejo", "Colores avanzados", "Múltiples sesiones"],
    featuresEn: ["Complex design", "Advanced colors", "Multiple sessions"],
    popular: false,
    icon: "🔥",
  },
  {
    id: "coverup",
    nameEs: "Cover-Up",
    nameEn: "Cover-Up",
    price: "$300 - $600",
    durationEs: "3-6 horas",
    durationEn: "3-6 hours",
    descriptionEs: "Transformamos tatuajes antiguos en nuevas obras de arte.",
    descriptionEn: "We transform old tattoos into new works of art.",
    featuresEs: ["Evaluación previa", "Diseño personalizado", "Técnicas especiales"],
    featuresEn: ["Assessment first", "Custom design", "Special techniques"],
    popular: false,
    icon: "🔄",
  },
  {
    id: "consulta",
    nameEs: "Consulta de Diseño",
    nameEn: "Design Consultation",
    price: "$50",
    durationEs: "45 minutos",
    durationEn: "45 minutes",
    descriptionEs: "45 min para planificar tu proyecto soñado.",
    descriptionEn: "45 min to plan your dream project.",
    featuresEs: ["Boceto inicial", "Estimación exacta", "Consejos de cuidado"],
    featuresEn: ["Initial sketch", "Accurate estimate", "Care tips"],
    popular: false,
    icon: "💭",
  },
];

export default function Services({ language = 'es' }: ServicesProps) {
  const t = {
    title: language === 'en' ? 'Our Services' : 'Nuestros Servicios',
    subtitle:
      language === 'en'
        ? 'Every tattoo is a unique masterpiece'
        : 'Cada tatuaje es una obra maestra única',
    popular: language === 'en' ? 'Popular' : 'Popular',
    select: language === 'en' ? 'Select' : 'Seleccionar',
    note1:
      language === 'en'
        ? '* Prices are estimates and may vary depending on design complexity.'
        : '* Los precios son estimados y pueden variar según la complejidad del diseño.',
    note2:
      language === 'en'
        ? 'Book a free consultation to get an exact quote.'
        : 'Agenda una consulta gratuita para obtener un presupuesto exacto.',
  };

  const handleServiceSelect = (serviceId: string) => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-select service in booking form
      const event = new CustomEvent('selectService', { detail: serviceId });
      window.dispatchEvent(event);
    }
  };

  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">{t.title}</h2>
          <p className="services-subtitle">{t.subtitle}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.popular ? 'popular' : ''}`}
            >
              {service.popular && (
                <div className="popular-badge">{t.popular}</div>
              )}

              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">
                  {language === 'en' ? service.nameEn : service.nameEs}
                </h3>
                <div className="service-price">{service.price}</div>
                <div className="service-duration">
                  {language === 'en' ? service.durationEn : service.durationEs}
                </div>
              </div>

              <div className="service-body">
                <p className="service-description">
                  {language === 'en' ? service.descriptionEn : service.descriptionEs}
                </p>

                <ul className="service-features">
                  {(language === 'en' ? service.featuresEn : service.featuresEs).map(
                    (feature, index) => (
                      <li key={index} className="service-feature">
                        <svg
                          className="feature-check"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="service-footer">
                <button
                  className="service-btn"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {t.select}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-note">
          <p>
            {t.note1}
            <br />
            {t.note2}
          </p>
        </div>
      </div>
    </section>
  );
}
