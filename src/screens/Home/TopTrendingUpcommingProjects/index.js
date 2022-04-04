import React, { useState } from "react";
import styles from "./TopTrendingUpcommingProjects.module.sass";
import cn from "classnames";
import { useHistory } from "react-router";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";
const TopTrendingUpcommingProjects = () => {
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Upcoming", "Live"];
  const [direction, setDirection] = useState(directionOptions[0]);
  const history = useHistory();
  const myLink = (e) => {
    window.open(e);
  };
  return (
    <div className={cn("container-fluid", styles.projects_main_container)}>
      {/* <h3 className={cn(styles.stage)}>Top Trending Upcoming Projects</h3> */}
      <div className={styles.top}>
        <div className={styles.box}>
          <div className={styles.stage}>Top Trending Upcoming Projects</div>
          <DropdownEmpty
            className={styles.dropdown}
            value={direction}
            setValue={setDirection}
            options={directionOptions}
          />
        </div>
      </div>
      <div className={styles.project_innerContainer}>
        <div
          className={styles.project_imgContainer}
          onClick={() => {
            myLink("https://apemoney.io");
          }}
        >
          <img src={"apemonay.png"} alt="img" />
          <span>Ape Money</span>
        </div>
        <div
          className={styles.project_imgContainer}
          onClick={() => {
            myLink("https://twitter.com/metavillasclub");
          }}
        >
          <img src={"metavillass1.jpg"} alt="img" />{" "}
          <span>metaVillas Club</span>
          {/* <video src={"MetaVillas.mp4"} controls /> */}
        </div>
      </div>
    </div>
  );
};

export default TopTrendingUpcommingProjects;
