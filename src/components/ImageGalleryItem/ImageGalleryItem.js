import React from 'react';
import styles from './ImageGalleryItem.module.css';

export const  ImageGalleryItem = ({ image, setModalImg }) => {
  const { webformatURL, largeImageURL, tags, id } = image;
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
          onClick={() => setModalImg(id)}
          src={webformatURL}
          data-src={largeImageURL}
          alt={tags}
        />
      </li>
    </>
  );
}
