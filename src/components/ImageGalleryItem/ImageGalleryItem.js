import PropTypes from 'prop-types';

export const ImageGallaryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL, tags }) => (
    <li className="ImageGalleryItem" key={id} onClick={onClick()}>
      <img
        loading="lazy"
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
};

ImageGallaryItem.propTypes = {
  onClick: PropTypes.func,

  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
