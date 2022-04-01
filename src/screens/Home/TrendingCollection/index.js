import React, { useEffect, useState } from "react";
import styles from "./TrendingCollection.module.sass";
import ContentCardHero from "../../../components/ContentCardHero/CardHero";
import cn from "classnames";
import axios from "axios";
import { BACKEND_URL } from "config";
const TrendingCollection = () => {
  const [featuredCollection, setFeaturedCollection] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${BACKEND_URL}feature_collection`);

    setFeaturedCollection(res.data.data);
  }, []);

  // const images = [
  //   {
  //     img: "65_1.png",
  //     link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
  //   },
  //   {
  //     img: "66_1.png",
  //     link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
  //   },
  //   {
  //     img: "67_1.png",
  //     link: "collection/genesis%20refined%20apes%20collection/0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
  //   },
  // ];
  return (
    <>
      <div className={styles.card_mainUpperContainer}>
        <div className={styles.card_mainContainer}>
          {featuredCollection.length
            ? featuredCollection.map((value, index) => {
                var temp = value.link.split("/");

                var tempName = temp[temp.length - 2];
                // console.log("tempName", tempName.split("%20"));
                var name = "";
                if (tempName.split("%20").length > 0) {
                  tempName.split("%20").forEach((element) => {
                    name += element?.toUpperCase() + " ";
                  });
                }

                return (
                  <div className={styles.card_container}>
                    <ContentCardHero
                      infoImg={value.imageUrl}
                      key={index}
                      myLink={value.link}
                      name={name}
                    />
                  </div>
                );
              })
            : [1, 2, 3].map((value, i) => {
                return (
                  <div className={styles.card_container}>
                    <ContentCardHero
                      // infoImg={value.imageUrl}
                      key={i}
                      // myLink={value.link}
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
