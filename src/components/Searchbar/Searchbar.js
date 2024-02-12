import * as React from 'react';
import icon from '../../image/icons-search.svg';
import styles from './Searchbar.module.css';
export const Searchbar = ({ handleSubmit }) => {
  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(event.target.search.value);
    event.target.search.value = '';
  };
  return (
    <header className={styles.header}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
          <img src={icon} alt="search" />
        </button>
        <input
          className={styles.searchFormInput}
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
