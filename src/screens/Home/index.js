import React from "react";
import Popular from "./Popular";
import Discover from "./Discover";
import Description from "./Description";
import Content from "../../components/Content/Content";
import HotCollection from "./HotCollection";
import HotBid from "./HotBid";
import Slider from "./Slider";
const Home = () => {
  return (
    <>
      {/* <Banner /> */}
      {/* <Content /> */}
      <Slider />
      <Popular />
      {/* <HotCollection /> */}
      {/* <HotBid /> */}
      {/* <Collections /> */}
      <Discover />
      <Description />
    </>
  );
};

export default Home;
