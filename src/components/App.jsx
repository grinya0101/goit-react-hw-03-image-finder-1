import { Component } from 'react';

import { Box } from './Box';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImagesApi from '../service-api/ImagesAPI';
import Loader from './Loader';
import { Button } from './ImageGallery/ImageGallery.styled';

import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  searchQuery: '',
  page: 1,
  per_page: 40,
  imagesData: [],
  total: null,
  totalHits: null,
  isLoading: false,
};

export class App extends Component {
  state = initialValues;

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.setState({ isLoading: true });
      ImagesApi.getImages(
        this.state.searchQuery,
        this.state.page,
        this.state.per_page
      )
        .then(data => {
          this.setState(prevState => ({
            imagesData: [...prevState.imagesData, ...data.hits],
            totalHits: data.totalHits,
            total: data.total,
          }));

          if (this.state.page === 1) {
            toast.success(`Hooray! We found ${data.total} images`);
          }

          if (
            this.state.page !== 1 &&
            this.state.per_page * this.state.page >= this.state.totalHits
          ) {
            toast.info(` You've reached the end of search results`);
          }
        })
        .catch(err => toast.error(err))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  onFormSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() === '') {
      toast.warning('Enter search query');
      return;
    }
    this.setState({
      ...initialValues,
      searchQuery,
    });
  };

  onLoadMoreHandler = () => {
    this.setState(({ page }) => {
      return { page: (page += 1) };
    });
  };

  render() {
    const { imagesData, totalHits, per_page, page, isLoading } = this.state;

    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery imagesData={imagesData} />

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
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Box>
    );
  }
}
