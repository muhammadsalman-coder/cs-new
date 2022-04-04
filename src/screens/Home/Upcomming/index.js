import React from "react";
import styles from "./Upcomming.module.sass";
const Upcomming = () => {
  const links = {
    all_item: "All items",
    art: "Art",
    game: "Game",
    photgraphy: "Photography",
    music: "Mucic",
    video: "Video",
  };
  return (
    <>
      <div className={styles.upcomming__Container}>
        <div className={styles.upcomming__innerContainer}>
          <h1>Upcomming</h1>
          <div className={styles.upcommingHeader}>
            <div className={styles.upcommingLeft}></div>
            <div className={styles.upcommingCenter}></div>
            <div className={styles.upcommingRight}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcomming;
