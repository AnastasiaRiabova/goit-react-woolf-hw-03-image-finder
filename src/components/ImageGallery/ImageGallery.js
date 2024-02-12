import { v4 as uuidv4 } from 'uuid';
import { ImageGalleryItem } from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const  ImageGallery = ({ images, setModalImg }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image =>
          <ImageGalleryItem
            key={uuidv4()}
            image={image}
            setModalImg={setModalImg}
          />
        )}
    </ul>
  );
}
