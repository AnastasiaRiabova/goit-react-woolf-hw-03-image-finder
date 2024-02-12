import * as React from "react";
import icon from '../../image/icons-search.svg'
import styles from './Searchbar.module.css';
export const Searchbar = ({ handleSubmit }) => {
  return (
    <header className={styles.header}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
            <img src={icon} alt="search"/>
        </button>
        <input
          className={styles.searchFormInput}
          name="serach"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
