import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li className={s.GalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
