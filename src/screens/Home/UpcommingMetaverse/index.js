import React, { useState } from "react";
import styles from "./UpcommingMetaverse.module.sass";
import cn from "classnames";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";
import { useHistory } from "react-router";
const UpcommingMetaverse = () => {
  const history = useHistory();
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Upcoming", "Live"];
  const [direction, setDirection] = useState(directionOptions[0]);
  const onClickLink = (e) => {
    history.push(e);
  };
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
        {/* <div className={styles.UpcommingMetaverse_mainContainer}> */}
        {/* <h3 className={cn("h3", styles.title)}>Upcomming Metaverse</h3> */}
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Top Trending Metaverse</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
        </div>
        <div
          className={styles.imageContainer}
          onClick={() => {
            onClickLink("/land-mint");
          }}
        >
          <img
            className={cn("img-fluid")}
            src="./refinedland.jpg"
            alt="refinedland img"
          />
          {/* <div className={styles.upcommingHead_container}>
            <h1 className={cn("h1", styles.upcommingHeadTitle)}>
              Refined Land
            </h1>
            <p>An NFT & Metaverse with a real life utility</p>
          </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default UpcommingMetaverse;
