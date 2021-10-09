import React, { useEffect, useState } from "react";

import MediaItems from "./MediaItems";
import styles from "./Exercise.module.scss";
import search from "../../assets/images/search.svg";
import all from "../../assets/images/all.svg";
import newFilterImg from "../../assets/images/new.svg";
import topImg from "../../assets/images/top.svg";

const Exercise2 = () => {
  // Set up state slices for each filter
  const [searchTitle, setSearchTitle] = useState("");
  const [newFilter, setNewFilter] = useState(false);
  const [topFilter, setTop] = useState(false);

  // Set up state slices for the original list of media items and the filtered items
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(originalItems);

  useEffect(() => {
    // Fetch the list of media items and set the original and filtered list to the data that's returned
    const apiUrl = "/data/data.json";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOriginalItems(data.media);
        setFilteredItems(data.media);
      })
      .catch((error) => console.log(error));
  }, []);

  // The main filter function which runs when any of the filters change
  useEffect(() => {
    // Set up the filters object with the state values
    const filters = {
      title: searchTitle,
      new: newFilter,
      top: topFilter,
    };

    // The main filter function. Filter items in the original list by looping through the keys in the filter object
    // and comparing the key's value to the values in the media item
    var filterKeys = Object.keys(filters);
    const updatedItems = originalItems.filter((item) => {
      return filterKeys.every((key) => {
        // If the filter has no value or is not set to true, return true and "skip" it
        if (!filters[key].length && filters[key] !== true) {
          return true;
        } else if (key === "title") {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        } else {
          return item[key] === filters[key];
        }
      });
    });

    // Set the filtered items to the updated items
    setFilteredItems(updatedItems);
  }, [searchTitle, newFilter, topFilter, originalItems]);

  // Set the search title state value and kick off the main filter function
  const searchTitleChangeHandler = (event) => {
    setSearchTitle(event.target.value);
  };

  const newFilterHandler = () => {
    setNewFilter(!newFilter);
  };

  const topFilterHandler = () => {
    setTop(!topFilter);
  };

  const clearFilters = () => {
    setNewFilter(false);
    setTop(false);
  };

  return (
    <div className={styles.exercise}>
      <header className={styles.header}>
        <form>
          <h2>SLOTS</h2>
          <div className={styles.rightSide}>
            <div className={styles.filters}>
              <img
                alt="Show all games"
                src={all}
                onClick={clearFilters}
                className={!newFilter && !topFilter ? styles.active : ""}
              />
              <img
                alt="Show new games"
                src={newFilterImg}
                onClick={newFilterHandler}
                className={newFilter ? styles.active : ""}
              />
              <img
                alt="Show top games"
                src={topImg}
                onClick={topFilterHandler}
                className={topFilter ? styles.active : ""}
              />
            </div>
            <div className={styles.search}>
              <label htmlFor="search" style={{ display: "none" }}>
                Search
              </label>
              <input
                id="search"
                placeholder="Search"
                value={searchTitle}
                onChange={searchTitleChangeHandler}
                className={styles.searchInput}
                type="text"
              />
              <button
                className={styles.searchButton}
                type="submit"
                onClick={(e) => e.preventDefault()}
              >
                <img alt="Search icon" src={search} />
              </button>
            </div>
          </div>
        </form>
      </header>
      {filteredItems.length ? (
        <MediaItems items={filteredItems} />
      ) : (
        <p>No games were found that meet that criteria.</p>
      )}
    </div>
  );
};

export default Exercise2;
