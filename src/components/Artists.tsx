import ArtistCard from './ArtistCard';
import styles from './Artists.module.css';

const artistsData = [
  {
    imageSrc: '/perfil_001.jpg',
    name: 'Javier \'El Trazo\' Rodriguez',
    specialty: 'Especialista en Blackwork & Geométrico',
    instagramUrl: 'https://instagram.com/el_trazo_tattoo',
    instagramHandle: '@el_trazo_tattoo',
  },
  {
    imageSrc: '/perfil_002.jpg',
    name: 'Sebastian \'La Sombra\' Mendez',
    specialty: 'Maestra del Realismo & Fine Line',
    instagramUrl: 'https://instagram.com/sofia.sombra.ink',
    instagramHandle: '@sofia.sombra.ink',
  },
  {
    imageSrc: '/perfil_003.webp',
    name: 'Carlos \'El Detalle\' Vega',
    specialty: 'Experto en Microrealismo & Dotwork',
    instagramUrl: 'https://instagram.com/carlos.detalle.tattoo',
    instagramHandle: '@carlos.detalle.tattoo',
  },
];

const Artists = () => {
  return (
    <section id="artistas" className={styles.artistsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuestros Artistas</h2>
        <p className={styles.subtitle}>Conoce al talentoso equipo que dará vida a tus ideas.</p>
        <div className={styles.grid}>
          {artistsData.map((artist, index) => (
            <ArtistCard key={index} {...artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
