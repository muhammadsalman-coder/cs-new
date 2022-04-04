import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popular from "./Popular";
import Discover from "./Discover";
import Description from "./Description";
import Content from "../../components/Content/Content";
import Slider from "./Slider";
import UpcommingMetaverse from "./UpcommingMetaverse";
import Collections from "./Collections";
import NftGames from "./NftGames";
import UpcommingCollections from "./UpcommingCollections";
import TrendingCollection from "./TrendingCollection";
import TopTrendingUpcommingProjects from "./TopTrendingUpcommingProjects";
import styles from "./Home.module.sass";
// import Banner from "./Banner";
import Dropdown from "../../components/Dropdown";
import DropdownEmpty from "../../components/DropdownEmpty";
const Home = () => {
  const history = useHistory();
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Live", "Upcoming"];
  const [direction, setDirection] = useState(directionOptions[0]);
  // console.log("home Histroy ->", history);
  // const [content, setcontent] = useState();
  // useEffect(() => {
  //   console.log("window.history.length", window.history.length);

  //   const myContent = () => {
  //     if (window.history.length == 4) {
  //       return <Content />;
  //     }
  //   };
  //   setcontent(myContent);
  // }, []);
  return (
    <>
      {/* <Banner /> */}
      <TrendingCollection />
      <UpcommingMetaverse />
      <div className="container-fluid">
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Top Trending Featured NFTs</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
        </div>
        <Content />
      </div>
      {/* <Slider /> */}

      {/* <Description /> */}
      <NftGames />
      <TopTrendingUpcommingProjects />
      <UpcommingCollections />
      <Popular />
      <Discover />
      {/* {content} */}
      {/* <Collections /> */}
    </>
  );
};

export default Home;
