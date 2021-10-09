import React from "react";

import styles from "./MediaItems.module.scss";

const MediaItems = (props) => {
  return (
    <div className={styles.mediaItems}>
      {/* Loop through the media items sent through props and output each item */}
      {props.items.map((item) => (
        <div
          className={`${styles.mediaItem} ${
            item.top ? styles.mediaItemTop : ""
          } ${item.new ? styles.newItem : ""} ${
            item.highLimit ? styles.highLimit : ""
          }`}
          key={item.title + Math.random()}
        >
          <img alt={`${item.title}`} src={item.image} />
        </div>
      ))}
    </div>
  );
};

export default MediaItems;
