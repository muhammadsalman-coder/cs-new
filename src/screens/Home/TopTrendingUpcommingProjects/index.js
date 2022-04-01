import React, { useState } from "react";
import styles from "./TopTrendingUpcommingProjects.module.sass";
import cn from "classnames";
import { useHistory } from "react-router";
import { Row, Col } from "react-bootstrap";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";
import Slider from "react-slick";
import Icon from "../../../components/Icon";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);
const TopTrendingUpcommingProjects = () => {
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Upcoming", "Live"];
  const [direction, setDirection] = useState(directionOptions[0]);
  const history = useHistory();
  const myLink = (e) => {
    window.open(e);
  };

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,

    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
          // speed: 500,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          // slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
        {/* <div> */}
        {/* <Row>
          <Col md={12} lg={6} sm={12}>
            <div
              className={styles.project_imgContainer}
              onClick={() => {
                myLink(
                  "http://home.babyswap.finance/gamepaddetail/thecryptoyou"
                );
              }}
            >
              <img src={"0207TheCryptoYouNFT_Poster.png"} alt="img" />
              <span></span>
            </div>
          </Col>
          <Col md={12} lg={6} sm={12}>
            <div
              className={styles.project_imgContainer}
              onClick={() => {
                myLink("https://twitter.com/metavillasclub");
              }}
            >
              <img src={"metavillass1.jpg"} alt="img" />{" "}
              <span>metaVillas Club</span>
              {/* <video src={"MetaVillas.mp4"} controls /> 
            </div>
          </Col>
        <Row></Row>/ */}
        <Slider {...settings} className={cn("discover-slider", styles.slider)}>
          <div
            className={styles.project_imgContainer}
            onClick={() => {
              myLink("http://home.babyswap.finance/gamepaddetail/thecryptoyou");
            }}
          >
            <img src={"0207TheCryptoYouNFT_Poster.png"} alt="img" />
            {/* <span></span> */}
          </div>
          <div
            className={styles.project_imgContainer}
            onClick={() => {
              myLink("https://twitter.com/metavillasclub");
            }}
          >
            <img src={"metavillass1.jpg"} alt="img" />{" "}
            {/* <span>metaVillas Club</span> */}
            {/* <video src={"MetaVillas.mp4"} controls /> */}
          </div>
          <div
            className={styles.project_imgContainer}
            onClick={() => {
              myLink("http://home.babyswap.finance/gamepaddetail/thecryptoyou");
            }}
          >
            <img src={"0207TheCryptoYouNFT_Poster.png"} alt="img" />
            {/* <span></span> */}
          </div>
          <div
            className={styles.project_imgContainer}
            onClick={() => {
              myLink("https://twitter.com/metavillasclub");
            }}
          >
            <img src={"metavillass1.jpg"} alt="img" />{" "}
            {/* <span>metaVillas Club</span> */}
            {/* <video src={"MetaVillas.mp4"} controls /> */}
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default TopTrendingUpcommingProjects;
