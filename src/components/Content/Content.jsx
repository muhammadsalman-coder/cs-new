import React, { useEffect, useState } from "react";

import { AiOutlineMedium, AiOutlineTwitter } from "react-icons/ai";
import { FaTelegramPlane, FaDiscord, FaInstagram } from "react-icons/fa";
import styles from "./Content.module.sass";

import CardHero from "../CardHero/CardHero";
import cn from "classnames";
function Content() {
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

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
  const imagesRight = [
    "./right/8bit2.png",
    "./right/8bit4.png",
    "./right/IMG_6147.jpg",
    "./right/IMG_6148.png",
    "./right/IMG_6149.jpg",
    "./right/IMG_6150.jpg",
    "./right/IMG_6151.jpg",
    "./right/IMG_6152.png",
    "./right/IMG_6153.jpg",
  ];
  const imagesThree = [
    "./third/1.jpeg",
    "./third/2.jpeg",
    "./third/3.jpeg",

    "./third/5.jpeg",

    "./third/7.jpeg",
    "./third/8.png",
    "./third/9.png",
    "./third/10.jpeg",
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
  // const avatarRight = [
  //   {
  //     id: 1,
  //     image: "./icon32.png",
  //     check: true,
  //   },
  //   {
  //     id: 2,
  //     image: "./icon31.png",
  //     check: true,
  //   },
  //   {
  //     id: 3,
  //     image: "./icon46.png",
  //     check: false,
  //   },
  // ];

  return (
    <div className={styles.section}>
      <div className={cn("container-fluid", styles.container)}>
        <div className={styles.content}>
          <div className={styles.content__container}>
            <CardHero images={images} avatar={avatar} />
          </div>
          <div className={styles.content__container}>
            <CardHero images={imagesRight} avatar={avatar} />
          </div>
          <div className={styles.content__container}>
            <CardHero images={imagesThree} avatar={avatar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
