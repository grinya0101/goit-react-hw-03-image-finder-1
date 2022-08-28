import { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal';

import { Gallery } from './ImageGallery.styled.js';

class ImageGallery extends Component {
  state = {
    selectedImage: {},
  };

  onItemClick = selectedImage => {
    this.setState({ selectedImage });
  };

  onModalClose = () => {
    this.setState({ selectedImage: {} });
  };

  render() {
    const { selectedImage } = this.state;
    const { imagesData } = this.props;
    return (
      <>
        <Gallery>
          {!!imagesData?.length &&
            imagesData.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onItemClick={this.onItemClick}
              />
            ))}
        </Gallery>

        {selectedImage?.largeImageURL && (
          <Modal onClose={this.onModalClose}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
