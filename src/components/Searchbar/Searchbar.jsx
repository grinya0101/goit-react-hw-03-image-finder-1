import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Formik } from 'formik';

import {
  StyledSearchbar,
  StyledForm,
  Label,
  Input,
  Button,
} from './Searchbar.styled';

class Searchbar extends Component {
  onSubmitHandle = value => {
    this.props.onFormSubmit(value);
  };

  render() {
    return (
      <StyledSearchbar>
        <Formik
          initialValues={{ searchQuery: '' }}
          onSubmit={this.onSubmitHandle}
        >
          <StyledForm autoComplete="off">
            <Label htmlFor="searchQuery" />

            <Input
              id="searchQuery"
              type="text"
              name="searchQuery"
              placeholder="Search images and photos"
              autoFocus
            />

            <Button type="submit">
              <BsSearch aria-label="Search" />
            </Button>
          </StyledForm>
        </Formik>
      </StyledSearchbar>
    );
  }
}

export default Searchbar;
