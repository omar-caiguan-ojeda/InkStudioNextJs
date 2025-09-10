"use client";

const services = [
  {
    id: "pequeno",
    name: "Tatuaje Pequeño",
    price: "$80 - $150",
    duration: "1-2 horas",
    description: "Diseños hasta 5cm. Perfecto para primeros tatuajes.",
    features: [
      "Líneas finas",
      "Detalles pequeños", 
      "Consulta incluida"
    ],
    popular: false,
    icon: "✨"
  },
  {
    id: "mediano",
    name: "Tatuaje Mediano", 
    price: "$200 - $400",
    duration: "2-4 horas",
    description: "Diseños hasta 15cm. Piezas con elaboración media.",
    features: [
      "Sombreado",
      "Colores básicos",
      "Boceto personalizado"
    ],
    popular: true,
    icon: "🎨"
  },
  {
    id: "grande",
    name: "Tatuaje Grande",
    price: "$500 - $800", 
    duration: "4-8 horas",
    description: "Diseños complejos hasta 25cm. Piezas elaboradas con múltiples sesiones.",
    features: [
      "Diseño complejo",
      "Colores avanzados",
      "Múltiples sesiones"
    ],
    popular: false,
    icon: "🔥"
  },
  {
    id: "coverup",
    name: "Cover-Up",
    price: "$300 - $600",
    duration: "3-6 horas", 
    description: "Transformamos tatuajes antiguos en nuevas obras de arte.",
    features: [
      "Evaluación previa",
      "Diseño personalizado",
      "Técnicas especiales"
    ],
    popular: false,
    icon: "🔄"
  },
  {
    id: "consulta",
    name: "Consulta de Diseño",
    price: "$50",
    duration: "45 minutos",
    description: "45 min para planificar tu proyecto soñado.",
    features: [
      "Boceto inicial",
      "Estimación exacta", 
      "Consejos de cuidado"
    ],
    popular: false,
    icon: "💭"
  }
];

export default function Services() {
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
          <h2 className="services-title">Nuestros Servicios</h2>
          <p className="services-subtitle">
            Cada tatuaje es una obra maestra única
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`service-card ${service.popular ? 'popular' : ''}`}
            >
              {service.popular && (
                <div className="popular-badge">
                  Popular
                </div>
              )}
              
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <div className="service-price">{service.price}</div>
                <div className="service-duration">{service.duration}</div>
              </div>

              <div className="service-body">
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="service-feature">
                      <svg className="feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-footer">
                <button 
                  className="service-btn"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-note">
          <p>
            * Los precios son estimados y pueden variar según la complejidad del diseño.
            Agenda una consulta gratuita para obtener un presupuesto exacto.
          </p>
        </div>
      </div>
    </section>
  );
}
