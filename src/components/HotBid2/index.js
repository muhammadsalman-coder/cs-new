import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import styles from "./HotBid.module.sass";
import Icon from "../Icon";
//import Card from "../Card";
import CardSearch from "../CardSearch";

// data
import { bids } from "../../mocks/search01";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Hot = ({ classSection }) => {
  const settings = {
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        breakpoint: 1179,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn("h3", styles.title)}>Hot Bids</h3>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {bids.map((x, index) => (
                <CardSearch key={index} className={styles.card} item={x} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hot;
