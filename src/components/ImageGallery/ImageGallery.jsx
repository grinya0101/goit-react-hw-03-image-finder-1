import { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../Modal';
import ImagesApi from '../../service-api/ImagesAPI';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Gallery, Button } from './ImageGallery.styled.js';

class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 40,
    imagesData: [],
    total: null,
    totalHits: null,
    selectedImage: {},
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.isLoading &&
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.setState({ isLoading: true });
      ImagesApi.getImages(this.props.searchQuery, 1, this.state.per_page)
        .then(data => {
          this.setState({
            page: 1,
            imagesData: data.hits,
            totalHits: data.totalHits,
            total: data.total,
          });
          toast.success(`Hooray! We found ${data.total} images`);
        })
        .catch(err => toast.error(err))
        .finally(() => this.setState({ isLoading: false }));
    }

    if (
      prevProps.searchQuery === this.props.searchQuery &&
      prevProps.searchQuery !== '' &&
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      ImagesApi.getImages(
        this.props.searchQuery,
        this.state.page,
        this.state.per_page
      )
        .then(data => {
          this.setState(prevState => {
            const imagesData = [...prevState.imagesData, ...data.hits];
            return { imagesData };
          });

          if (this.state.per_page * this.state.page >= this.state.totalHits) {
            toast.info(` You've reached the end of search results`);
          }
        })
        .catch(err => toast.error(err))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onItemClick = selectedImage => {
    this.setState({ selectedImage });
  };

  onModalClose = () => {
    this.setState({ selectedImage: {} });
  };

  onLoadMoreHandler = () => {
    this.setState(({ page }) => {
      const newPage = (page += 1);
      return { page: newPage };
    });
  };

  render() {
    const { imagesData, selectedImage, totalHits, per_page, page, isLoading } =
      this.state;
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

        {isLoading ? (
          <Loader />
        ) : (
          !!imagesData?.length &&
          per_page * page < totalHits && (
            <Button type="button" onClick={this.onLoadMoreHandler}>
              Load more
            </Button>
          )
        )}

        {selectedImage?.largeImageURL && (
          <Modal onClose={this.onModalClose}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}

function softScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
export default ImageGallery;
