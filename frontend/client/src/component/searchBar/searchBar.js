// SearchBar.js
import React from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button className={styles.button}>Search</button>
    </div>
  );
};

export default SearchBar;
