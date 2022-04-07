import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  // state = {
  //   inputValue: '',
  // };
  const handleInputChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      //   alert('Enter your search query');
      toast.info(' Enter your search query !');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
    // this.setState({ inputValue: '' });
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <BiSearchAlt2
            style={{
              width: 12,
            }}
          />
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          name="inputValue"
          value={inputValue}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
