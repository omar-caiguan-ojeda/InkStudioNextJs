"use client";

import { useState, useEffect } from "react";

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}

const services = [
  {
    id: "pequeno",
    name: "Tatuaje Pequeño",
    price: "$80 - $150",
    duration: "1-2 horas",
    icon: "✨"
  },
  {
    id: "mediano", 
    name: "Tatuaje Mediano",
    price: "$200 - $400",
    duration: "2-4 horas",
    icon: "🎨"
  },
  {
    id: "grande",
    name: "Tatuaje Grande", 
    price: "$500 - $800",
    duration: "4-8 horas",
    icon: "🔥"
  },
  {
    id: "coverup",
    name: "Cover-Up",
    price: "$300 - $600",
    duration: "3-6 horas",
    icon: "🔄"
  },
  {
    id: "consulta",
    name: "Consulta de Diseño",
    price: "$50",
    duration: "45 minutos", 
    icon: "💭"
  }
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    description: ""
  });

  // Listen for service selection from Services component
  useEffect(() => {
    const handleServiceSelect = (event: CustomEvent) => {
      setBookingData(prev => ({ ...prev, service: event.detail }));
      setCurrentStep(1);
    };

    window.addEventListener('selectService', handleServiceSelect as EventListener);
    return () => window.removeEventListener('selectService', handleServiceSelect as EventListener);
  }, []);

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('¡Cita agendada exitosamente! Te contactaremos pronto.');
        // Reset form
        setBookingData({
          service: "",
          date: "",
          time: "",
          name: "",
          email: "",
          phone: "",
          description: ""
        });
        setCurrentStep(1);
      } else {
        throw new Error('Error al enviar la cita');
      }
    } catch (error) {
      alert('Error al agendar la cita. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = bookingData.service !== "";
  const canProceedToStep3 = canProceedToStep2 && bookingData.date && bookingData.time;
  const canSubmit = canProceedToStep3 && bookingData.name && bookingData.email && bookingData.phone;

  return (
    <section id="booking" className="booking-section">
      <div className="booking-container">
        <div className="booking-header">
          <h2 className="booking-title">Agenda tu Cita</h2>
          <p className="booking-subtitle">Tres pasos para tu nueva obra de arte</p>
        </div>

        {/* Progress Steps */}
        <div className="booking-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Servicio</div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Fecha y Hora</div>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirmación</div>
          </div>
        </div>

        <div className="booking-form">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="step-content">
              <h3 className="step-title">Selecciona tu Servicio</h3>
              <div className="services-grid">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`service-option ${bookingData.service === service.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('service', service.id)}
                  >
                    <div className="service-icon">{service.icon}</div>
                    <h4 className="service-name">{service.name}</h4>
                    <div className="service-price">{service.price}</div>
                    <div className="service-duration">{service.duration}</div>
                  </div>
                ))}
              </div>
              <div className="step-actions">
                <button 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!canProceedToStep2}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date and Time */}
          {currentStep === 2 && (
            <div className="step-content">
              <h3 className="step-title">Selecciona Fecha y Hora</h3>
              <div className="datetime-grid">
                <div className="form-group">
                  <label htmlFor="date">Fecha preferida</label>
                  <input
                    type="date"
                    id="date"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Hora preferida</label>
                  <select
                    id="time"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  >
                    <option value="">Seleccionar hora</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>
                  Atrás
                </button>
                <button 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!canProceedToStep3}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="step-content">
              <h3 className="step-title">Información de Contacto</h3>
              <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    value={bookingData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Describe tu idea de tatuaje</label>
                  <textarea
                    id="description"
                    value={bookingData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Cuéntanos sobre tu idea, estilo preferido, ubicación en el cuerpo, etc."
                    rows={4}
                  />
                </div>
              </div>
              <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>
                  Atrás
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Agendar Cita'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
