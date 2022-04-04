import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaTelegramPlane, FaCheck, FaInstagram } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./CardHero.module.sass";
import cn from "classnames";
function CardHero({ images, avatar }) {
  let [currentImage, setCurrentImage] = useState(0);

  const switchImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };

  useEffect(() => {
    let interval = setInterval(switchImage, 4000);
    return () => clearInterval(interval);
  });

  return (
    // <div className="container-fluid">
    <Link to="/item">
      <div className={styles.card}>
        <div className={styles.card__head}>
          <img src={images[currentImage]} alt="" />
          {/* <img src="BA1.jpeg" alt="" /> */}
        </div>
        {/* <div className="card__frame"> */}
        <div className={styles.card__body}>
          <div className={styles.card__bodyHead}>
            <div className={styles.card__bodyHeadLeft}>
              <img src="bsc.png" alt="" />
              <img src="ethereum.png" alt="" />
              <img src="polygon.png" alt="" />
              <img src="salona.svg" alt="" />
            </div>
            <div className={styles.card__bodyHeadRight}>
              <a
                className={cn(styles.card__link, styles.card__twitter)}
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
              <a
                className={cn(styles.card__link, styles.card__fb)}
                href="https://closedsea.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiFacebookCircleLine />
              </a>

              <a
                className={cn(styles.card__link, styles.card__telegram)}
                href="https://t.me/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane />
              </a>
              <a
                className={cn(styles.card__link, styles.card__insta)}
                href="https://closedsea.com/#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.card__footer}>
          <div className={styles.card__footerHead}>
            <div className={styles.card__footerHeadLeft}>
              {avatar.map((avt) => (
                <div key={avt.id} className={styles.card__footerHeadImg}>
                  <img src={avt.image} alt="" />
                  {avt.check ? (
                    <div className="img-icon-checkmark">
                      <FaCheck />
                    </div>
                  ) : null}
                </div>
              ))}

              {/* <div className="card__footer-head-img">
                <img src="icon1.png" alt="" />
                <div className="img-icon-checkmark">
                  <FaCheck />
                </div>
              </div>
              <div className="card__footer-head-img">
                <img src="icon2.png" alt="" />
                <div className="img-icon-checkmark">
                  <FaCheck />
                </div>
              </div>
              <div className="card__footer-head-img">
                <img src="icon3.png" alt="" />
                <div className="img-icon-checkmark">
                  <FaCheck />
                </div>
              </div> */}
            </div>
            <div className={styles.card__footerHeadRight}>
              <p>Owners</p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Link>
  );
}

export default CardHero;
