import { Component } from 'react';

import { Box } from './Box';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = { searchQuery: '' };

  onFormSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() === '') {
      alert('Enter search query');
      return;
    }
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />

        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Box>
    );
  }
}
