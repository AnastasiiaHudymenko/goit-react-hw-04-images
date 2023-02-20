import PropTypes from 'prop-types';
import { ImageGallaryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="ImageGallery">
      <ImageGallaryItem images={images} onClick={onClick} />
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};
