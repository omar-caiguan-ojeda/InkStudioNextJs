import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <span>I</span>
              </div>
              <div className="logo-text">
                <span className="logo-title">INKSTUDIO</span>
                <span className="logo-subtitle">Arte Premium</span>
              </div>
            </div>
            <p className="footer-description">
              Transformando ideas en arte permanente desde 2019. 
              Más de 500 tatuajes realizados con la más alta calidad y seguridad.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Servicios</h3>
            <ul className="footer-links">
              <li><Link href="#servicios">Tatuaje Pequeño</Link></li>
              <li><Link href="#servicios">Tatuaje Mediano</Link></li>
              <li><Link href="#servicios">Tatuaje Grande</Link></li>
              <li><Link href="#servicios">Cover-Up</Link></li>
              <li><Link href="#servicios">Consulta de Diseño</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Navegación</h3>
            <ul className="footer-links">
              <li><Link href="#about-us">Quiénes Somos</Link></li>
              <li><Link href="#artistas">Artistas</Link></li>
              <li><Link href="#portfolio">Portfolio</Link></li>
              <li><Link href="#servicios">Servicios</Link></li>
              <li><Link href="#booking">Agendar Cita</Link></li>
              <li><Link href="#contacto">Contacto</Link></li>
              <li><Link href="#faq">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>123 Arte Street, Ciudad</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.39 21 0 11.61 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08C5.16 2.08 5.49 4.08 6.16 5.92C6.27 6.22 6.16 6.56 5.9 6.82L4.5 8.22C6.1 11.26 8.74 13.9 11.78 15.5L13.18 14.1C13.44 13.84 13.78 13.73 14.08 13.84C15.92 14.51 17.92 14.84 19.92 14.84C20.52 14.84 21 15.32 21 15.92V18.92Z" fill="currentColor"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>info@inkstudio.com</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Horarios</h3>
            <div className="schedule">
              <div className="schedule-item">
                <span>Lun - Vie:</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="schedule-item">
                <span>Sábado:</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="schedule-item">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 11.37C16 14.24 13.76 16.5 10.88 16.5C8 16.5 5.76 14.24 5.76 11.37C5.76 8.5 8 6.24 10.88 6.24C13.76 6.24 16 8.5 16 11.37Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.32 21 7.26 20.3 5.54 19.05L3 20L4.05 17.54C2.7 15.82 2 13.76 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8.5 7.5C8.5 7.5 9 7 9.5 8.5C10 10 10.5 10.5 10.5 10.5C10.5 10.5 11.76 9.24 13.5 11C15.24 12.76 14 14 14 14C14 14 13.5 14.5 12.5 14C11.5 13.5 10.5 12.5 10 11.5C9.5 10.5 9.5 9.5 10 9C10.5 8.5 11 8.5 11 8.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2024 InkStudio. Todos los derechos reservados.</p>
            <p>Diseñado con ❤️ para amantes del arte corporal</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
