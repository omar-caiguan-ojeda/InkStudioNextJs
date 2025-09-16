"use client";

import { useState, useRef } from "react";
import Image from 'next/image';

type Lang = 'es' | 'en';

interface BookingFormProps {
  language?: Lang;
}

interface BookingData {
  // Paso 1 - Nombre
  name: string;
  
  // Paso 2 - Email
  email: string;
  
  // Paso 3 - Teléfono
  phone: string;
  
  // Paso 4 - Cómo nos encontró
  howFoundUs: string;
  
  // Paso 5 - Artista preferido
  preferredArtist: string;
  
  // Paso 6 - Ubicación del tatuaje
  bodyLocation: string;
  
  // Paso 7 - Tamaño del tatuaje
  tattooSize: string;
  
  // Paso 8 - Presupuesto
  budgetRange: string;
  
  // Paso 9 - Descripción
  description: string;
  
  // Paso 10 - Estilo de color
  colorStyle: string;
  
  // Paso 11 - Imágenes de referencia
  referenceImages: File[];
  
  // Paso 12 - Fecha y hora
  date: string;
  time: string;
  
  // Paso 13 - Términos y condiciones
  isOver18: boolean;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const howFoundUsOptions = [
  "Instagram",
  "Facebook", 
  "Google",
  "Recomendación",
  "TikTok",
  "Evento",
  "Otro"
];

const artists = [
  "Cualquier artista residente",
  "Carlos Guzmán",
  "Santiago",
  "Ricardo", 
  "Lucas",
  "Chango",
  "Leo",
  "Más frío",
  "Luis"
];

const tattooSizes = [
  { id: "small", label: "Pequeño (5-10 centímetros)", description: "Ideal para primeros tatuajes" },
  { id: "medium", label: "Mediano (10-20 centímetros)", description: "Diseños con más detalle" },
  { id: "large", label: "Grande (20-30 centímetros)", description: "Piezas elaboradas" },
  { id: "xlarge", label: "Extra grande (+30 centímetros)", description: "Proyectos de gran escala" }
];

const budgetRanges = [
  { id: "budget1", label: "$150-$350 (Pequeño)", size: "small" },
  { id: "budget2", label: "$350-$800 (Medio)", size: "medium" },
  { id: "budget3", label: "$800-$1800 (Grande)", size: "large" }
];

const colorStyles = [
  { id: "color", label: "Color", description: "Tatuajes con colores vibrantes" },
  { id: "blackgray", label: "Negro y gris", description: "Estilo clásico" },
  { id: "both", label: "Ambos/No estoy seguro", description: "Explorar opciones" }
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

export default function BookingForm({ language = 'es' }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    howFoundUs: "",
    preferredArtist: "",
    bodyLocation: "",
    tattooSize: "",
    budgetRange: "",
    description: "",
    colorStyle: "",
    referenceImages: [],
    date: "",
    time: "",
    isOver18: false,
    acceptsTerms: false,
    acceptsPrivacy: false,
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    headerTitle: language === 'en' ? 'Book Your Appointment' : 'Reserva tu Cita',
    headerSubtitle:
      language === 'en'
        ? 'Schedule your tattoo session with our professional artists'
        : 'Agenda tu sesión de tatuaje con nuestros artistas profesionales',
  };

  const validateStep = (step: number): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!bookingData.name || bookingData.name.trim().length < 2) {
          errors.name = "El nombre debe tener al menos 2 caracteres";
          isValid = false;
        }
        break;
        
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!bookingData.email || !emailRegex.test(bookingData.email)) {
          errors.email = "Por favor ingresa un email válido";
          isValid = false;
        }
        break;
        
      case 3:
        const phoneRegex = /^[\+]?[1-9][\d]{7,15}$/;
        if (!bookingData.phone || !phoneRegex.test(bookingData.phone.replace(/[\s\-\(\)]/g, ''))) {
          errors.phone = "Por favor ingresa un número de teléfono válido";
          isValid = false;
        }
        break;
        
      case 4:
        if (!bookingData.howFoundUs) {
          errors.howFoundUs = "Por favor selecciona una opción";
          isValid = false;
        }
        break;
        
      case 5:
        if (!bookingData.preferredArtist) {
          errors.preferredArtist = "Por favor selecciona un artista";
          isValid = false;
        }
        break;
        
      case 6:
        if (!bookingData.bodyLocation || bookingData.bodyLocation.trim().length < 3) {
          errors.bodyLocation = "Por favor describe la ubicación del tatuaje";
          isValid = false;
        }
        break;
        
      case 7:
        if (!bookingData.tattooSize) {
          errors.tattooSize = "Por favor selecciona un tamaño";
          isValid = false;
        }
        break;
        
      case 8:
        if (!bookingData.budgetRange) {
          errors.budgetRange = "Por favor selecciona un rango de presupuesto";
          isValid = false;
        }
        break;
        
      case 9:
        if (!bookingData.description || bookingData.description.trim().length < 10) {
          errors.description = "Por favor describe tu idea con al menos 10 caracteres";
          isValid = false;
        }
        break;
        
      case 10:
        if (!bookingData.colorStyle) {
          errors.colorStyle = "Por favor selecciona un estilo de color";
          isValid = false;
        }
        break;
        
      case 11:
        // Las imágenes son opcionales, no se valida
        break;
        
      case 12:
        if (!bookingData.date) {
          errors.date = "Por favor selecciona una fecha";
          isValid = false;
        }
        if (!bookingData.time) {
          errors.time = "Por favor selecciona una hora";
          isValid = false;
        }
        break;
        
      case 13:
        if (!bookingData.isOver18) {
          errors.isOver18 = "Debes confirmar que eres mayor de 18 años";
          isValid = false;
        }
        if (!bookingData.acceptsTerms) {
          errors.acceptsTerms = "Debes aceptar los términos y condiciones";
          isValid = false;
        }
        if (!bookingData.acceptsPrivacy) {
          errors.acceptsPrivacy = "Debes aceptar la política de privacidad";
          isValid = false;
        }
        break;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: keyof BookingData, value: BookingData[keyof BookingData]) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} no es un tipo de archivo válido. Solo se permiten PNG, JPG y GIF.`);
        continue;
      }
      
      if (file.size > maxSize) {
        alert(`${file.name} es muy grande. El tamaño máximo es 10MB.`);
        continue;
      }
      
      validFiles.push(file);
    }

    if (bookingData.referenceImages.length + validFiles.length > 5) {
      alert('Máximo 5 imágenes permitidas');
      return;
    }

    handleInputChange('referenceImages', [...bookingData.referenceImages, ...validFiles]);
  };

  const removeImage = (index: number) => {
    const newImages = bookingData.referenceImages.filter((_, i) => i !== index);
    handleInputChange('referenceImages', newImages);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      scrollToFormTop();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    scrollToFormTop();
  };

  const scrollToFormTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(13)) return;

    setIsSubmitting(true);
    
    try {
      // Convertir archivos a base64 para envío
      const imageData = await Promise.all(
        bookingData.referenceImages.map(async (file) => {
          return new Promise<{name: string, data: string, type: string}>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve({
              name: file.name,
              data: reader.result as string,
              type: file.type
            });
            reader.readAsDataURL(file);
          });
        })
      );

      const dataToSend = {
        ...bookingData,
        referenceImages: imageData
      };

      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const newBookingNumber = `INK${Date.now().toString().slice(-6)}`;
        setBookingNumber(newBookingNumber);
        setCurrentStep(14);
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
      name: "",
      email: "",
      phone: "",
      howFoundUs: "",
      preferredArtist: "",
      bodyLocation: "",
      tattooSize: "",
      budgetRange: "",
      description: "",
      colorStyle: "",
      referenceImages: [],
      date: "",
      time: "",
      isOver18: false,
      acceptsTerms: false,
      acceptsPrivacy: false,
    });
    setValidationErrors({});
    setCurrentStep(1);
    scrollToFormTop();
  };

  // Funciones del calendario (reutilizadas del código original)
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

  const getStepTitle = (step: number): string => {
    const titles = {
      1: "¿Cómo te llamas?",
      2: "¿Cuál es tu correo electrónico?", 
      3: "¿Tu número de teléfono?",
      4: "¿Cómo se enteró de nosotros?",
      5: "¿Qué artista te gustaría?",
      6: "¿En qué parte de tu cuerpo?",
      7: "¿Pensaste cuál será el tamaño de tu tattoo?",
      8: "¿Cuál es tu rango de presupuesto?",
      9: "Descripción de tu idea de tatuaje",
      10: "Estilo de color de tatuaje preferido",
      11: "¿Alguna imagen de referencia?",
      12: "¿Cuándo estás disponible para programar una cita?",
      13: "Antes de continuar declare:",
      14: "¡Solicitud enviada!"
    };
    return titles[step as keyof typeof titles] || "";
  };

  const getStepSubtitle = (step: number): string => {
    const subtitles = {
      1: "Empecemos por lo básico",
      2: "Lo usaremos para enviarte actualizaciones.",
      3: "Para una comunicación rápida sobre su cita.",
      4: "Seleccione una opción",
      5: "Elige tu artista preferido (obligatorio)",
      6: "Cuéntanos la ubicación de tu tatuaje",
      7: "Esto nos ayuda a estimar el tiempo y el costo",
      8: "Esto nos ayuda a planificar en consecuencia",
      9: "Por favor comparte tu visión, estilos o elementos específicos",
      10: "Elige entre color o negro y gris",
      11: "Sube imágenes que inspiren tu diseño (opcional)",
      12: "",
      13: "",
      14: "Gracias por su solicitud de reserva. Revisaremos su información y nos comunicaremos con usted dentro de 4 a 8 horas."
    };
    return subtitles[step as keyof typeof subtitles] || "";
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container" ref={formRef}>
        {currentStep < 14 && (
          <>
            <div className="booking-header">
              <h2 className="booking-title">{t.headerTitle}</h2>
              <p className="booking-subtitle">
                {t.headerSubtitle}
              </p>
            </div>

            <div className="progress-steps">
              {Array.from({length: 13}, (_, i) => i + 1).map((step) => (
                <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                  <div className="step-number">{step}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Paso 1: Nombre */}
        {currentStep === 1 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(1)}</h3>
            <p className="step-subtitle">{getStepSubtitle(1)}</p>
            
            {validationErrors.name && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.name}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                className={`form-input ${validationErrors.name ? 'error' : ''}`}
                value={bookingData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="form-navigation">
              <button 
                className={`next-btn ${bookingData.name ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.name}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Email */}
        {currentStep === 2 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(2)}</h3>
            <p className="step-subtitle">{getStepSubtitle(2)}</p>
            
            {validationErrors.email && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.email}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.email ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.email}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Teléfono */}
        {currentStep === 3 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(3)}</h3>
            <p className="step-subtitle">{getStepSubtitle(3)}</p>
            
            {validationErrors.phone && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.phone}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="tel"
                className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(+56) 9 **** ****"
              />
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.phone ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.phone}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Cómo nos encontró */}
        {currentStep === 4 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(4)}</h3>
            <p className="step-subtitle">{getStepSubtitle(4)}</p>
            
            {validationErrors.howFoundUs && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.howFoundUs}</span>
              </div>
            )}

            <div className="options-grid">
              {howFoundUsOptions.map((option) => (
                <div
                  key={option}
                  className={`option-card ${bookingData.howFoundUs === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange('howFoundUs', option)}
                >
                  <h4 className="option-name">{option}</h4>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.howFoundUs ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.howFoundUs}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 5: Artista preferido */}
        {currentStep === 5 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(5)}</h3>
            <p className="step-subtitle">{getStepSubtitle(5)}</p>
            
            {validationErrors.preferredArtist && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.preferredArtist}</span>
              </div>
            )}

            <div className="options-grid">
              {artists.map((artist) => (
                <div
                  key={artist}
                  className={`option-card ${bookingData.preferredArtist === artist ? 'selected' : ''}`}
                  onClick={() => handleInputChange('preferredArtist', artist)}
                >
                  <h4 className="option-name">{artist}</h4>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.preferredArtist ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.preferredArtist}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 6: Ubicación del cuerpo */}
        {currentStep === 6 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(6)}</h3>
            <p className="step-subtitle">{getStepSubtitle(6)}</p>
            
            {validationErrors.bodyLocation && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.bodyLocation}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                className={`form-input ${validationErrors.bodyLocation ? 'error' : ''}`}
                value={bookingData.bodyLocation}
                onChange={(e) => handleInputChange('bodyLocation', e.target.value)}
                placeholder="Ej: Brazo izquierdo, espalda, pierna, etc."
              />
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.bodyLocation ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.bodyLocation}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 7: Tamaño del tatuaje */}
        {currentStep === 7 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(7)}</h3>
            <p className="step-subtitle">{getStepSubtitle(7)}</p>
            
            {validationErrors.tattooSize && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.tattooSize}</span>
              </div>
            )}

            <div className="options-list">
              {tattooSizes.map((size) => (
                <div
                  key={size.id}
                  className={`option-card-detailed ${bookingData.tattooSize === size.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('tattooSize', size.id)}
                >
                  <h4 className="option-name">{size.label}</h4>
                  <p className="option-description">{size.description}</p>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.tattooSize ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.tattooSize}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 8: Presupuesto */}
        {currentStep === 8 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(8)}</h3>
            <p className="step-subtitle">{getStepSubtitle(8)}</p>
            
            {validationErrors.budgetRange && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.budgetRange}</span>
              </div>
            )}

            <div className="options-list">
              {budgetRanges.map((budget) => (
                <div
                  key={budget.id}
                  className={`option-card-detailed ${bookingData.budgetRange === budget.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('budgetRange', budget.id)}
                >
                  <h4 className="option-name">{budget.label}</h4>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.budgetRange ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.budgetRange}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 9: Descripción */}
        {currentStep === 9 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(9)}</h3>
            <p className="step-subtitle">{getStepSubtitle(9)}</p>
            
            {validationErrors.description && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.description}</span>
              </div>
            )}

            <div className="form-group">
              <textarea
                className={`form-textarea ${validationErrors.description ? 'error' : ''}`}
                value={bookingData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe tu idea de tatuaje, incluyendo estilo, elementos específicos, simbolismo, etc."
                rows={6}
              />
              <small className="char-counter">
                {bookingData.description.length}/500 caracteres
              </small>
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.description.length >= 10 ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={bookingData.description.length < 10}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 10: Estilo de color */}
        {currentStep === 10 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(10)}</h3>
            <p className="step-subtitle">{getStepSubtitle(10)}</p>
            
            {validationErrors.colorStyle && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{validationErrors.colorStyle}</span>
              </div>
            )}

            <div className="options-list">
              {colorStyles.map((style) => (
                <div
                  key={style.id}
                  className={`option-card-detailed ${bookingData.colorStyle === style.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('colorStyle', style.id)}
                >
                  <h4 className="option-name">{style.label}</h4>
                  <p className="option-description">{style.description}</p>
                </div>
              ))}
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`next-btn ${bookingData.colorStyle ? 'enabled' : 'disabled'}`}
                onClick={nextStep}
                disabled={!bookingData.colorStyle}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 11: Imágenes de referencia */}
        {currentStep === 11 && (
          <div className="form-step">
            <h3 className="step-title">¿Alguna imagen de referencia?</h3>
            <p className="step-subtitle">Sube imágenes que inspiren tu diseño (opcional)</p>

            <div className="file-upload-container">
              <div 
                className="file-upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="upload-text">Click to upload images</p>
                <p className="upload-subtext">PNG, JPG, GIF up to 10MB each</p>
                <p className="upload-note">O arrastra y suelta aquí</p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,image/gif,image/jpg"
                onChange={(e) => handleFileUpload(e.target.files)}
                style={{ display: 'none' }}
              />
            </div>

            {bookingData.referenceImages.length > 0 && (
              <div className="uploaded-images">
                <h4>Imágenes cargadas:</h4>
                <div className="image-preview-grid">
                  {bookingData.referenceImages.map((file, index) => (
                    <div key={index} className="image-preview">
                      <Image 
                        src={URL.createObjectURL(file)} 
                        alt={`Referencia ${index + 1}`}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                      <button 
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                      <span className="image-name">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button className="next-btn enabled" onClick={nextStep}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 12: Fecha y Hora */}
        {currentStep === 12 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(12)}</h3>
            
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

        {/* Paso 13: Términos y Condiciones */}
        {currentStep === 13 && (
          <div className="form-step">
            <h3 className="step-title">{getStepTitle(13)}</h3>
            
            <div className="terms-container">
              <div className="checkbox-group">
                <label className={`checkbox-label ${validationErrors.isOver18 ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={bookingData.isOver18}
                    onChange={(e) => handleInputChange('isOver18', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Tengo 18 años o más
                </label>
                {validationErrors.isOver18 && (
                  <span className="error-text">{validationErrors.isOver18}</span>
                )}
              </div>

              <div className="checkbox-group">
                <label className={`checkbox-label ${validationErrors.acceptsTerms ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={bookingData.acceptsTerms}
                    onChange={(e) => handleInputChange('acceptsTerms', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  He leído y acepto los <a href="/terminos" target="_blank">términos y condiciones</a>
                </label>
                {validationErrors.acceptsTerms && (
                  <span className="error-text">{validationErrors.acceptsTerms}</span>
                )}
              </div>

              <div className="checkbox-group">
                <label className={`checkbox-label ${validationErrors.acceptsPrivacy ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={bookingData.acceptsPrivacy}
                    onChange={(e) => handleInputChange('acceptsPrivacy', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  He leído y acepto la <a href="/privacidad" target="_blank">política de privacidad</a>
                </label>
                {validationErrors.acceptsPrivacy && (
                  <span className="error-text">{validationErrors.acceptsPrivacy}</span>
                )}
              </div>
            </div>

            <div className="important-notices">
              <h4>AVISOS IMPORTANTES:</h4>
              <ul>
                <li>Se requiere un depósito no reembolsable para asegurar su reserva</li>
                <li>Las citas requieren un aviso mínimo de 48 horas para su reprogramación</li>
                <li>Debes tener 18 años o más para hacerte un tatuaje</li>
              </ul>
            </div>

            <div className="form-navigation">
              <button className="prev-btn" onClick={prevStep}>
                Atrás
              </button>
              <button 
                className={`submit-btn ${bookingData.isOver18 && bookingData.acceptsTerms && bookingData.acceptsPrivacy ? 'enabled' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!bookingData.isOver18 || !bookingData.acceptsTerms || !bookingData.acceptsPrivacy || isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </div>
        )}

        {/* Paso 14: Confirmación */}
        {currentStep === 14 && (
          <div className="booking-success">
            <div className="success-header">
              <div className="success-icon">
                <div className="checkmark">✓</div>
              </div>
              <h2 className="success-title">{getStepTitle(14)}</h2>
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
                  <p className="message-text">{getStepSubtitle(14)}</p>
                </div>
              </div>

              <div className="success-actions">
                <button className="new-appointment-btn" onClick={resetForm}>
                  <span className="btn-text">Cerrar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}