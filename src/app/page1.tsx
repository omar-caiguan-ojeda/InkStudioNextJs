"use client";

import { useEffect } from "react";
import Image from "next/image";
import About from "@/src/components/About";
import Carrousel from "@/src/components/Carrousel";
import Services from "@/src/components/Services";
import BookingForm from "@/src/components/BookingForm";
import Footer from "@/src/components/Footer";

export default function HomePage() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    // Typewriter effect for hero
    const typewriterText = "Agenda tu Próxima Obra Maestra";
    const typewriterElement = document.getElementById("heroTypewriter");
    
    if (typewriterElement) {
      let i = 0;
      typewriterElement.textContent = "";
      
      const typeWriter = () => {
        if (i < typewriterText.length) {
          typewriterElement.textContent += typewriterText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      observer.disconnect();
    };
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <nav className="nav">
            <div className="logo-container">
              <a href="#" className="logo-link">
                <div className="logo-icon">
                  <span>I</span>
                </div>
                <div className="logo-text">
                  <span className="logo-title">INKSTUDIO</span>
                  <span className="logo-subtitle">Arte Premium</span>
                </div>
              </a>
            </div>

            <div className="nav-menu">
              <a href="#about-us" className="nav-link">
                <span>Quiénes Somos</span>
                <div className="nav-underline"></div>
              </a>
              <a href="#servicios" className="nav-link">
                <span>Servicios</span>
                <div className="nav-underline"></div>
              </a>
              <a href="#portfolio" className="nav-link">
                <span>Portfolio</span>
                <div className="nav-underline"></div>
              </a>
              <a href="#booking" className="nav-link">
                <span>Agendar</span>
                <div className="nav-underline"></div>
              </a>
              <a href="#contacto" className="nav-link">
                <span>Contacto</span>
                <div className="nav-underline"></div>
              </a>
            </div>

            <button className="cta-button" onClick={scrollToBooking}>
              <div className="cta-overlay"></div>
              <span className="cta-text">Agendar Cita</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-text">
              <h1 className="hero-title fade-in-up">
                Arte en tu{" "}
                <span className="hero-accent">
                  Piel
                  <div className="hero-accent-line"></div>
                </span>
              </h1>

              <h2 className="hero-subtitle fade-in-up">
                <span id="heroTypewriter"></span>
                <span className="cursor">|</span>
              </h2>

              <p className="hero-description fade-in-up">
                Especialistas en blackwork, fine line y realismo. Transforma tus
                ideas en arte permanente con nuestros artistas certificados.
              </p>

              <div className="hero-stats fade-in-up">
                <div className="stat-item">
                  <div className="stat-icon">🎨</div>
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Tatuajes Realizados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Años de Experiencia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Clientes Satisfechos</div>
                </div>
              </div>

              <button className="hero-cta fade-in-up" onClick={scrollToBooking}>
                <div className="hero-cta-overlay"></div>
                <span className="hero-cta-text">
                  Comenzar mi Tatuaje <span className="hero-cta-arrow">→</span>
                </span>
              </button>
            </div>

            <div className="hero-gallery fade-in-up">
              <div className="gallery-grid">
                <div className="gallery-item">
                  <Image
                    src="/tatto_001.jpeg"
                    alt="Tatuaje blackwork"
                    width={200}
                    height={250}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-label">Blackwork</div>
                  </div>
                </div>
                <div className="gallery-item">
                  <Image
                    src="/tatto_002.webp"
                    alt="Tatuaje fine line"
                    width={200}
                    height={250}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-label">Fine Line</div>
                  </div>
                </div>
                <div className="gallery-item">
                  <Image
                    src="/tatto_004.webp"
                    alt="Tatuaje geométrico"
                    width={200}
                    height={250}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-label">Geométrico</div>
                  </div>
                </div>
                <div className="gallery-item">
                  <Image
                    src="/tatto_003.webp"
                    alt="Tatuaje realismo"
                    width={200}
                    height={250}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-label">Realismo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="scroll-animate">
        <About />
      </div>

      {/* Portfolio Section */}
      <div className="scroll-animate">
        <Carrousel />
      </div>

      {/* Services Section */}
      <div className="scroll-animate">
        <Services />
      </div>

      {/* Booking Section */}
      <div className="scroll-animate">
        <BookingForm />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
