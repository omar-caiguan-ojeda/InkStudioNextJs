import Image from "next/image";

type Lang = 'es' | 'en';

interface AboutProps {
  language?: Lang;
}

export default function About({ language = 'es' }: AboutProps) {
  const title = language === 'en' ? 'About Us' : 'Quiénes Somos';
  const p1 =
    language === 'en'
      ? "At InkStudio – Art on Your Skin, we believe every tattoo is more than ink; it's a story, an experience, and a unique form of expression."
      : "En InkStudio – Arte en tu Piel, creemos que cada tatuaje es más que tinta; es una historia, una experiencia y una forma de expresión única.";
  const p2 =
    language === 'en'
      ? "We are a team of certified artists specializing in blackwork, fine line, geometric, and realism, with over 5 years of experience and 500+ tattoos completed. Our commitment is to transform your ideas into permanent art with a focus on detail, creativity, and safety."
      : "Somos un equipo de artistas certificados especializados en blackwork, fine line, geométrico y realismo, con más de 5 años de experiencia y 500+ tatuajes realizados. Nuestro compromiso es transformar tus ideas en arte permanente con un enfoque en el detalle, la creatividad y la seguridad.";
  const studioP1 =
    language === 'en'
      ? "In our studio you will find a safe, hygienic, and professional space, where each design is tailored to your vision and style. For us, the most important thing is that every client lives a unique experience and is 100% satisfied with their tattoo."
      : "En nuestro estudio encontrarás un espacio seguro, higiénico y profesional, donde cada diseño se trabaja de manera personalizada, respetando tu visión y estilo. Para nosotros, lo más importante es que cada cliente viva una experiencia única y quede 100% satisfecho con su tatuaje.";
  const highlight =
    language === 'en'
      ? "★ At InkStudio, your skin is our canvas and your story our inspiration."
      : "★ Porque en InkStudio, tu piel es nuestro lienzo y tu historia nuestra inspiración.";

  return (
    <section id="about-us" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-image-wrapper">
            <Image
              src="/tatto_005.jpg"
              alt="InkStudio Interior"
              width={400}
              height={300}
              className="about-img"
            />
            <div className="gallery-glow"></div>
          </div>
          <div className="about-text">
            <h2 className="about-title">{title}</h2>
            <p className="about-description">{p1}</p>
            <p className="about-description">{p2}</p>
          </div>
        </div>
        
        <div className="about-studio">
          <div className="studio-text">
            <p className="studio-description">{studioP1}</p>
            <p className="studio-highlight">{highlight}</p>
          </div>
          <div className="about-image-wrapper">
            <Image
              src="/tatto_006.jpg"
              alt="Equipo InkStudio"
              width={500}
              height={300}
              className="team-img"
            />
            <div className="gallery-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
