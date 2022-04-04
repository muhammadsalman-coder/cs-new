import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import styles from "./HotBid.module.sass";
import Icon from "../Icon";
import Card from "../Card";

// data
import { bids } from "../../mocks/bids";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Hot = ({ classSection }) => {
  const settings = {
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 3,
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

  const bgColors = [
    {
      id: 1,
      cName: "black",
    },
    {
      id: 2,
      cName: "purple",
    },
    {
      id: 3,
      cName: "blue",
    },
  ];

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container center-1200", styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn("h3", styles.title)}>Exclusive OpenSea drops</h3>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {bids.map((x, index) => (
                <Card
                  key={index}
                  linkColor={x.cName}
                  className={styles.card}
                  item={x}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hot;
