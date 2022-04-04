import React from "react";
import styles from "./TrendingCollection.module.sass";
import ContentCardHero from "../../../components/ContentCardHero/CardHero";
import cn from "classnames";
const TrendingCollection = () => {
  const images = [
    {
      img: "65_1.png",
      link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
    },
    {
      img: "66_1.png",
      link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
    },
    {
      img: "67_1.png",
      link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
    },
  ];
  return (
    <>
      <div className={styles.card_mainUpperContainer}>
        <div className={styles.card_mainContainer}>
          {images.map((value, index) => {
            return (
              <div className={styles.card_container}>
                <ContentCardHero
                  infoImg={value.img}
                  key={index}
                  myLink={value.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrendingCollection;
