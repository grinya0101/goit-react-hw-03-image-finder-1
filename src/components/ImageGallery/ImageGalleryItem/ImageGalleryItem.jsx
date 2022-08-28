import { GalleryItem, ItemImage } from './ImageGalleryItem.styled.js';

const ImageGalleryItem = ({ item, onItemClick }) => {
  return (
    <GalleryItem>
      <ItemImage
        src={item.webformatURL}
        alt={item.tags}
        onClick={() => onItemClick(item)}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
