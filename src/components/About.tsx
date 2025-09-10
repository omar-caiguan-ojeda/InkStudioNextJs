import Image from "next/image";

export default function About() {
  return (
    <section id="about-us" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-image">
            <Image
              src="/tatto_005.jpg"
              alt="InkStudio Interior"
              width={400}
              height={300}
              className="about-img"
            />
          </div>
          <div className="about-text">
            <h2 className="about-title">Quiénes Somos</h2>
            <p className="about-description">
              En InkStudio – Arte en tu Piel, creemos que cada tatuaje es más que tinta; es una
              historia, una experiencia y una forma de expresión única.
            </p>
            <p className="about-description">
              Somos un equipo de artistas certificados especializados en blackwork, fine line,
              geométrico y realismo, con más de 5 años de experiencia y 500+ tatuajes realizados.
              Nuestro compromiso es transformar tus ideas en arte permanente con un enfoque en el
              detalle, la creatividad y la seguridad.
            </p>
          </div>
        </div>
        
        <div className="about-studio">
          <div className="studio-text">
            <p className="studio-description">
              En nuestro estudio encontrarás un espacio seguro, higiénico y profesional, donde cada
              diseño se trabaja de manera personalizada, respetando tu visión y estilo. Para nosotros,
              lo más importante es que cada cliente viva una experiencia única y quede 100%
              satisfecho con su tatuaje.
            </p>
            <p className="studio-highlight">
              ★ Porque en InkStudio, tu piel es nuestro lienzo y tu historia nuestra inspiración.
            </p>
          </div>
          <div className="team-image">
            <Image
              src="/tatto_006.jpg"
              alt="Equipo InkStudio"
              width={500}
              height={300}
              className="team-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
