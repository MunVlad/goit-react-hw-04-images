import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css'
import { toast } from 'react-toastify';



export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            onInput={this.handleInputChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.query}
          />
          <button type="submit" className={css.searchFormButton}>
            search
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};