import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css'
import { toast } from 'react-toastify';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

 function handleInputChange (e) {
    setQuery(e.target.value.toLowerCase());
  };

   function handleSubmit (e) {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    onSubmit(query);
  };


  return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            onInput={handleInputChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {query}
          />
          <button type="submit" className={css.searchFormButton}>
            search
          </button>
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};