import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import styles from "./Slider.module.sass";
import cn from "classnames";
import axios from "axios";
import LazyImage from "components/LazyImage";
const Slider = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(async () => {
    const geting = await axios.get(
      "https://closedsea262.herokuapp.com/getsliders"
    );

    console.log("getingDAta", geting.data);
    setSliderData(geting.data);
  }, []);
  console.log("sliderData", sliderData);
  return (
    <div className="slider-main-container">
      <Carousel>
        {sliderData.length > 0 ? (
          sliderData.map((v, i) => {
            return (
              <Carousel.Item interval={1500}>
                <img
                  className={cn("d-block w-100 slider-img", styles.sliderImg)}
                  src={v.imageUrl}
                  alt="First slide"
                />
                {/* <Carousel.Caption className={styles.myFont}>
             <h3>First slide label</h3>
             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
           </Carousel.Caption> */}
              </Carousel.Item>
            );
          })
        ) : (
          <LazyImage alt="img" width="100%" height="512px" />
        )}
      </Carousel>
    </div>
  );
};

export default Slider;
