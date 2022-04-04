import React from "react";
import Hero from "./Hero";
import Selection from "./Selection";
import Popular from "./Popular";
import HotBid from "../../components/HotBid";
import Collections from "./Collections";
import Discover from "./Discover";
import Description from "./Description";
import Hot from "../../components/HotBid3";
import CardHero from "../../components/CardHero/CardHero";
import Content from "../../components/Content/Content";
import BackedBy from "./BackedBy/BackedBy";
const images = [
  "./left/BA4.jpeg",
  "./left/IMG_6139.jpg",
  "./left/IMG_6140.jpg",
  "./left/IMG_6141.png",
  "./left/IMG_6142.jpg",
  "./left/IMG_6143.png",
  "./left/IMG_6144.png",
  "./left/IMG_6145.jpg",
  "./left/IMG_6146.jpg",
];
const avatar = [
  {
    id: 1,
    image: "./icon1.png",
    check: true,
  },
  {
    id: 2,
    image: "./icon2.png",
    check: false,
  },
  {
    id: 3,
    image: "./icon3.png",
    check: true,
  },
];

const Home = () => {
  return (
    <>
      {/* <Hero /> */}

      <Content />
      {/* <Hero /> */}
      {/* <HotBid classSection="section" />
      <Hot classSection="section" />
      <Selection /> */}
      <Popular />
      <Collections />
      <Discover />
      <Description />
      <BackedBy />
    </>
  );
};

export default Home;
