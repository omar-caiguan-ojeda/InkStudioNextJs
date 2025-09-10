"use client";

import { useState, useRef } from "react";

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
}

const services = [
  { id: "tatuaje-pequeno", name: "Tatuaje Pequeño", price: "$150-300", duration: "1-2 horas", icon: "" },
  { id: "tatuaje-mediano", name: "Tatuaje Mediano", price: "$300-600", duration: "2-4 horas", icon: "" },
  { id: "tatuaje-grande", name: "Tatuaje Grande", price: "$600-1200", duration: "4-8 horas", icon: "" },
  { id: "cover-up", name: "Cover Up", price: "$400-800", duration: "3-6 horas", icon: "" },
  { id: "retoque", name: "Retoque", price: "$100-200", duration: "1 hora", icon: "" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const formRef = useRef<HTMLDivElement>(null);

  const validateStep = (step: number): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!bookingData.service) {
        errors.service = "Por favor selecciona un servicio";
        isValid = false;
      }
    } else if (step === 2) {
      if (!bookingData.date) {
        errors.date = "Por favor selecciona una fecha";
        isValid = false;
      }
      if (!bookingData.time) {
        errors.time = "Por favor selecciona una hora";
        isValid = false;
      }
    } else if (step === 3) {
      if (!bookingData.name || bookingData.name.trim().length < 2) {
        errors.name = "El nombre debe tener al menos 2 caracteres";
        isValid = false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!bookingData.email || !emailRegex.test(bookingData.email)) {
        errors.email = "Por favor ingresa un email válido";
        isValid = false;
      }
      
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!bookingData.phone || !phoneRegex.test(bookingData.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.phone = "Por favor ingresa un número de teléfono válido";
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const scrollToFormTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const newBookingNumber = `INK${Date.now().toString().slice(-6)}`;
        setBookingNumber(newBookingNumber);
        setCurrentStep(4);
      } else {
        throw new Error('Error al enviar la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu reserva. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setBookingData({
      service: "",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      description: "",
    });
    setValidationErrors({});
    setCurrentStep(1);
    scrollToFormTop();
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDateForInput = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(selectedYear, selectedMonth + direction, 1);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateForInput(day);
      const isDisabled = isDateDisabled(day);
      const isSelected = bookingData.date === dateString;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => !isDisabled && handleInputChange('date', dateString)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const canSubmit = bookingData.name && bookingData.email && bookingData.phone;

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container" ref={formRef}>
        {currentStep < 4 && (
          <>
            <div className="booking-header">
              <h2 className="booking-title">Reserva tu Cita</h2>
              <p className="booking-subtitle">
                Agenda tu sesión de tatuaje con nuestros artistas profesionales
              </p>
            </div>

            <div className="progress-steps">
              {[1, 2, 3].map((step) => (
                <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && "Servicio"}
                    {step === 2 && "Fecha & Hora"}
                    {step === 3 && "Contacto"}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentStep === 1 && (
          <div className="form-step step-1">
            <h3 className="step-title">Selecciona tu Servicio</h3>
            
            {validationErrors.service && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.service}</span>
              </div>
            )}

            <div className="services-grid">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-card ${bookingData.service === service.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('service', service.id)}
                >
                  <h4 className="service-name">{service.name}</h4>
                  <p className="service-price">{service.price}</p>
                  <p className="service-duration">{service.duration}</p>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button 
                className={`next-btn ${bookingData.service ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.service}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            <h3 className="step-title">Selecciona Fecha y Hora</h3>
            
            {(validationErrors.date || validationErrors.time) && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">
                  {validationErrors.date || validationErrors.time}
                </span>
              </div>
            )}

            <div className="datetime-container">
              <div className="date-section">
                <h3>Selecciona la Fecha</h3>
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                      ‹
                    </button>
                    <span className="month-year">
                      {monthNames[selectedMonth]} {selectedYear}
                    </span>
                    <button className="nav-btn" onClick={() => navigateMonth(1)}>
                      ›
                    </button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    {weekdays.map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-grid">
                    {renderCalendar()}
                  </div>
                </div>
              </div>

              <div className="time-section">
                <h3>Selecciona la Hora</h3>
                <div className="time-slots">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className={`time-slot ${bookingData.time === time ? 'selected' : ''}`}
                      onClick={() => handleInputChange('time', time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.date && bookingData.time ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.date || !bookingData.time}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            <h3 className="step-title">Información de Contacto</h3>
            
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  className={validationErrors.name ? 'error' : ''}
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Tu nombre completo"
                />
                {validationErrors.name && (
                  <div className="field-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{validationErrors.name}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  className={validationErrors.email ? 'error' : ''}
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                />
                {validationErrors.email && (
                  <div className="field-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{validationErrors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  className={validationErrors.phone ? 'error' : ''}
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1234567890"
                />
                {validationErrors.phone && (
                  <div className="field-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{validationErrors.phone}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción del Tatuaje (Opcional)</label>
                <textarea
                  id="description"
                  value={bookingData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe tu idea de tatuaje, estilo, tamaño, ubicación..."
                  rows={4}
                />
              </div>
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`submit-btn ${canSubmit ? 'enabled' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Cita'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="booking-success">
            <div className="success-header">
              <div className="success-icon">
                <div className="checkmark">✓</div>
              </div>
              <h2 className="success-title">¡Reserva Confirmada!</h2>
            </div>

            <div className="success-content">
              <div className="booking-number-card">
                <div className="booking-number-header">
                  <p className="booking-label">Número de Reserva</p>
                </div>
                <div className="booking-number-display">
                  <span className="booking-number">{bookingNumber}</span>
                </div>
              </div>

              <div className="success-message">
                <div className="message-card">
                  <h3 className="message-title">¿Qué sigue ahora?</h3>
                  <p className="message-text">
                    Hemos recibido tu solicitud de reserva y nos pondremos en contacto contigo 
                    dentro de las próximas 24 horas para confirmar tu cita.
                  </p>
                  <p className="message-text">
                    Por favor, guarda tu número de reserva para futuras referencias.
                  </p>
                </div>
              </div>

              <div className="success-actions">
                <button className="new-appointment-btn" onClick={resetForm}>
                  <span className="btn-text">Agendar Nueva Cita</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
