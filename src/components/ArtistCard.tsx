import Image from 'next/image';
import styles from './ArtistCard.module.css';

interface ArtistCardProps {
  imageSrc: string;
  name: string;
  specialty: string;
  instagramUrl: string;
  instagramHandle: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ imageSrc, name, specialty, instagramUrl, instagramHandle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={imageSrc} alt={`Foto de ${name}`} width={300} height={400} className={styles.image} />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.specialty}>{specialty}</p>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
          {instagramHandle}
        </a>
      </div>
    </div>
  );
};

export default ArtistCard;
