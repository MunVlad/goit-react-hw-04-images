import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.galleryItem}>
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}


ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};