import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem ({smallImgURL, id}) {
    return (
      <li className={css.galleryItem}>
        <img src={smallImgURL} alt={id} />
      </li>
    );
  }


ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};