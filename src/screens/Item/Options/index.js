import React from "react";
import cn from "classnames";
import styles from "./Options.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaCheck, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";

const Options = ({ className, items }) => {
  return (
    <div className={styles.optionsContainer}>
      <div className={cn(styles.options, className)}>
        <div className={styles.items}>
          <div className={styles.itemImgCantainer}>
            <img src="./icon1.png" alt="" />
            <div className={styles.imgIconCheckmarkimg}>
              <FaCheck size={10} />
            </div>
          </div>
          <div className={styles.itemImgCantainer}>
            <img src="./icon2.png" alt="" />
            <div className={styles.imgIconCheckmarkimg}>
              <FaCheck size={10} />
            </div>
          </div>
          <div className={styles.itemImgCantainer}>
            <img src="./icon3.png" alt="" />
            <div className={styles.imgIconCheckmarkimg}>
              <FaCheck size={10} />
            </div>
          </div>
        </div>

        <div className={styles.items}>
          <button className={cn("button-circle-stroke", styles.button)}>
            <FaShareSquare size={20} />
            {/* <Icon name="share" size="24" /> */}
          </button>
          <button
            className={cn(
              "button-circle-stroke",
              styles.button,
              styles.favorite
            )}
          >
            <AiFillHeart size={20} />
            {/* <Icon name="heart-fill" size="24" /> */}
          </button>
          <Actions className={styles.actions} />
        </div>
      </div>

      <div className={styles.itemSocial}>
        <div className={styles.itemSocialLeft}>
          <img src="./bsc.png" alt="" />
          <img src="./ethereum.png" alt="" />
          <img src="./polygon.png" alt="" />
          <img src="./salona.svg" alt="" />
        </div>
        <div className={styles.itemSocialRight}>
          <a
            className={cn("twitterBg", styles.itemSocialrightStyles)}
            href="https://twitter.com/closedseanft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter size={16} />
          </a>
          <a
            className={cn("facebookBg", styles.itemSocialrightStyles)}
            href="https://closedsea.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiFacebookCircleLine size={16} />
          </a>

          <a
            className={cn("telegramBg", styles.itemSocialrightStyles)}
            href="https://t.me/closedseanft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane size={16} />
          </a>
          <a
            className={cn("instaBg", styles.itemSocialrightStyles)}
            href="https://closedsea.com/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Options;
