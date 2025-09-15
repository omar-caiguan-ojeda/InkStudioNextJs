import FaqItem from './FaqItem';
import styles from './FaqSection.module.css';

const faqData = [
  {
    question: '¿Cuál es el proceso para agendar una cita?',
    answer: 'Para agendar una cita, puedes rellenar el formulario de contacto en nuestra página web, enviarnos un correo electrónico o contactarnos a través de nuestras redes sociales. Te responderemos a la brevedad para discutir tu idea y coordinar una fecha.',
  },
  {
    question: '¿Cuánto cuesta un tatuaje?',
    answer: 'El precio de un tatuaje varía según el tamaño, la complejidad del diseño y el tiempo que tome realizarlo. Ofrecemos una consulta gratuita para discutir tu idea y darte un presupuesto detallado.',
  },
  {
    question: '¿Qué estilos de tatuaje realizan?',
    answer: 'Nos especializamos en una amplia variedad de estilos, incluyendo blackwork, fine line, geométrico y realismo. Puedes ver ejemplos de nuestro trabajo en la sección de portafolio.',
  },
  {
    question: '¿Es doloroso hacerse un tatuaje?',
    answer: 'El nivel de dolor depende de la zona del cuerpo y de la tolerancia de cada persona. Hacemos todo lo posible para que la experiencia sea lo más cómoda posible, utilizando técnicas y equipos modernos.',
  },
  {
    question: '¿Qué cuidados debo tener después de hacerme un tatuaje?',
    answer: 'Te proporcionaremos instrucciones detalladas sobre el cuidado posterior al tatuaje. Es crucial mantener la zona limpia, hidratada y protegida del sol para asegurar una correcta cicatrización y preservar la calidad del tatuaje.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className={styles.faqContainer}>
      <h2 className={styles.title}>Preguntas Frecuentes (FAQ)</h2>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
