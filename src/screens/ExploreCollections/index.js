import React from "react";
import cn from "classnames";
import styles from "./ExploreCollection.module.sass";
import { useHistory, useLocation } from "react-router";
import CollectionCard from "./CollectionCard";
import { collectionLinks } from "utils/constants/collectionLinks";
// const navLinks = [
//   {
//     name: "Trending",
//     paramss: "trending",
//   },
//   {
//     name: "Art",
//     paramss: "art",
//   },
//   {
//     name: "Collectibles",
//     paramss: "collectibles",
//   },
//   {
//     name: "Domain Names",
//     paramss: "domain-names",
//   },
//   {
//     name: "Music",
//     paramss: "music",
//   },
//   {
//     name: "Photography",
//     paramss: "photography-category",
//   },
//   {
//     name: "Sports",
//     paramss: "sports",
//   },
//   {
//     name: "Utlity",
//     paramss: "utlity",
//   },
//   {
//     name: "Virtual Worlds",
//     paramss: "virtual-worlds",
//   },
// ];
const ExploreCollections = () => {
  const { search: query } = useLocation();
  const history = useHistory();
  const activeTab =
    new URLSearchParams(query).get("tab") || collectionLinks[0].paramss;

  console.log("activeTab", activeTab);
  const onNavClickHandler = (x, index) => () => {
    // setIsSearching(false);
    history.push({
      pathname: `/explore-collection`,
      search: `?tab=${x.paramss}`,
    });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headingTitle}>
          <h1 style={{ fontWeight: 600 }}>Discover Collections</h1>
        </div>
        {/* <h1 style={{ fontWeight: 600 }}>Coming Soon...</h1> */}

        <div className={styles.nav}>
          {collectionLinks.map((x, index) => (
            <button
              className={cn(styles.link, styles.navLink, {
                [styles.active]: x.paramss === activeTab,
              })}
              onClick={onNavClickHandler(x, index)}
              key={index}
            >
              <span>{x.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.contentContainer}>
        {activeTab == collectionLinks[0].paramss && ( //trending
          <CollectionCard text={collectionLinks[0].paramss} />
        )}

        {activeTab == collectionLinks[1].paramss && ( //art
          <CollectionCard text={collectionLinks[1].paramss} />
        )}

        {activeTab == collectionLinks[2].paramss && ( //Collectibles
          <CollectionCard text={collectionLinks[2].paramss} />
        )}

        {activeTab == collectionLinks[3].paramss && ( //domain-names
          <CollectionCard text={collectionLinks[3].paramss} />
        )}

        {activeTab == collectionLinks[4].paramss && ( //music
          <CollectionCard text={collectionLinks[4].paramss} />
        )}

        {activeTab == collectionLinks[5].paramss && ( //photography
          <CollectionCard text={collectionLinks[5].paramss} />
        )}

        {activeTab == collectionLinks[6].paramss && ( //sports
          <CollectionCard text={collectionLinks[6].paramss} />
        )}

        {activeTab == collectionLinks[7].paramss && ( //utility
          <CollectionCard text={collectionLinks[7].paramss} />
        )}

        {activeTab == collectionLinks[8].paramss && ( //virtual-worlds
          <CollectionCard text={collectionLinks[8].paramss} />
        )}
      </div>
    </>
  );
};

export default ExploreCollections;
