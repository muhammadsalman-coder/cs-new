import React, { useState } from "react";
import styles from "./UpcommingNFT.module.sass";
import cn from "classnames";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardSearch from "components/CardSearch";
import useFetchNftsByCategory from "utils/hooks/use-fetch-nfts-by-category";
import Spinner from "components/Spinner/Spinner";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";
const UpcommingCollections = () => {
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Live", "Upcoming"];
  const [direction, setDirection] = useState(directionOptions[0]);

  let { loading, nfts } = useFetchNftsByCategory({
    category: "Collectibles",
    page: 1,
    size: 8,
  });

  console.log("nfts", nfts);
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
        {/* <h3 className={cn("h3", styles.title)}>Upcomming Collections</h3> */}
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Top Trending Collections</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
        </div>
        <div className={styles.upcomming_mainContainer}>
          {loading ? (
            <div className={styles.wrapperSpinner}>
              <Spinner />
            </div>
          ) : nfts?.length > 0 ? (
            nfts.map((v, index) => {
              return (
                <div className={styles.nftCard_container}>
                  <CardSearch item={v} key={index} />
                </div>
              );
            })
          ) : (
            <span className={styles.nftCard_container}>No Data</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcommingCollections;
