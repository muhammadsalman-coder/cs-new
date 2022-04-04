import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popular from "./Popular";
import Discover from "./Discover";
import Description from "./Description";
import Content from "../../components/Content/Content";

const Home = () => {
  const history = useHistory();
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
      <Content />
      {/* {content} */}
      <Popular />
      {/* <Collections /> */}
      <Discover />
      <Description />
    </>
  );
};

export default Home;
