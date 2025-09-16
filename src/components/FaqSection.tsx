import FaqItem from './FaqItem';
import styles from './FaqSection.module.css';

type Lang = 'es' | 'en';

const faqDataEs = [
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

const faqDataEn = [
  {
    question: 'What is the process to book an appointment?',
    answer: 'To book an appointment, you can fill out the contact form on our website, email us, or reach out through our social networks. We will get back to you shortly to discuss your idea and schedule a date.',
  },
  {
    question: 'How much does a tattoo cost?',
    answer: 'The price of a tattoo varies depending on size, design complexity, and the time required. We offer a free consultation to discuss your idea and provide a detailed quote.',
  },
  {
    question: 'What tattoo styles do you offer?',
    answer: 'We specialize in a wide variety of styles, including blackwork, fine line, geometric, and realism. You can see examples in our portfolio section.',
  },
  {
    question: 'Is getting a tattoo painful?',
    answer: 'Pain level depends on the body area and each person’s tolerance. We do our best to make the experience as comfortable as possible using modern techniques and equipment.',
  },
  {
    question: 'How should I care for my new tattoo?',
    answer: 'We will provide you with detailed aftercare instructions. It’s crucial to keep the area clean, moisturized, and protected from the sun to ensure proper healing and preserve tattoo quality.',
  },
];

interface FaqSectionProps {
  language?: Lang;
}

export default function FaqSection({ language = 'es' }: FaqSectionProps) {
  const data = language === 'en' ? faqDataEn : faqDataEs;
  const title = language === 'en' ? 'Frequently Asked Questions (FAQ)' : 'Preguntas Frecuentes (FAQ)';

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className={styles.faqContainer}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.faqList}>
        {data.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
