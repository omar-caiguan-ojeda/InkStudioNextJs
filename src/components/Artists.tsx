import ArtistCard from './ArtistCard';
import styles from './Artists.module.css';

type Lang = 'es' | 'en';

interface ArtistsProps {
  language?: Lang;
}

const artistsData = [
  {
    imageSrc: '/perfil_001.jpg',
    name: "Javier 'El Trazo' Rodriguez",
    specialtyEs: 'Especialista en Blackwork & Geométrico',
    specialtyEn: 'Specialist in Blackwork & Geometric',
    instagramUrl: 'https://instagram.com/el_trazo_tattoo',
    instagramHandle: '@el_trazo_tattoo',
  },
  {
    imageSrc: '/perfil_002.jpg',
    name: "Sebastian 'La Sombra' Mendez",
    specialtyEs: 'Maestro del Realismo & Fine Line',
    specialtyEn: 'Master of Realism & Fine Line',
    instagramUrl: 'https://instagram.com/sofia.sombra.ink',
    instagramHandle: '@sofia.sombra.ink',
  },
  {
    imageSrc: '/perfil_003.webp',
    name: "Carlos 'El Detalle' Vega",
    specialtyEs: 'Experto en Microrealismo & Dotwork',
    specialtyEn: 'Expert in Micro-realism & Dotwork',
    instagramUrl: 'https://instagram.com/carlos.detalle.tattoo',
    instagramHandle: '@carlos.detalle.tattoo',
  },
];

const Artists = ({ language = 'es' }: ArtistsProps) => {
  const title = language === 'en' ? 'Our Artists' : 'Nuestros Artistas';
  const subtitle =
    language === 'en'
      ? 'Meet the talented team that will bring your ideas to life.'
      : 'Conoce al talentoso equipo que dará vida a tus ideas.';

  const artistsLd = artistsData.map((artist) => ({
    '@type': 'Person',
    name: artist.name,
    jobTitle: language === 'en' ? 'Tattoo Artist' : 'Artista Tatuador',
    worksFor: {
      '@type': 'TattooParlor',
      name: 'InkStudio',
    },
    url: artist.instagramUrl,
    image: `https://inkstudio-tattoo.vercel.app${artist.imageSrc}`,
    sameAs: [artist.instagramUrl],
  }));

  return (
    <section id="artistas" className={styles.artistsSection}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistsLd) }}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.grid}>
          {artistsData.map((artist, index) => (
            <ArtistCard
              key={index}
              imageSrc={artist.imageSrc}
              name={artist.name}
              specialty={language === 'en' ? artist.specialtyEn : artist.specialtyEs}
              instagramUrl={artist.instagramUrl}
              instagramHandle={artist.instagramHandle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
