import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import cn from "classnames";
import { Link } from "react-router-dom";
import LazyImage from "components/LazyImage";
import styles from "./CardHero.module.sass";
import { getTokenOwnerInfo } from "utils/hooks/use-token-owner";
import fetchUserProfile from "utils/helpers/apis/fetch-user-profile";
import ReactSkeleton from "components/ReactSkeleton";

function CardHero({ infoImg, myLink }) {
  // let [currentImage, setCurrentImage] = useState(0);
  // const [avatars, setAvatars] = useState([]);

  // const { chainId } = useWeb3React();
  // console.log("infoshani", info);
  // const images = useMemo(() => {
  //   return info.map((i) => i.image);
  // }, [info]);

  // useEffect(() => {
  //   info.forEach((item) => {
  //     getTokenOwnerInfo({
  //       chainId: chainId || process.env.REACT_APP_DEFAULT_CHAINID,
  //       address: item.tokenAddr,
  //       tokenId: item.tokenId,
  //     }).then((ownerInfo) => {
  //       if (ownerInfo?.owner_of) {
  //         fetchUserProfile({ address: ownerInfo.owner_of }).then((result) => {
  //           if (result) {
  //             setAvatars((prev) => [...prev, result.avatar]);
  //           }
  //         });
  //       }
  //     });
  //   });
  // }, [info, chainId]);

  // const switchImage = useCallback(() => {
  //   if (currentImage < images.length - 1 && !!images[currentImage + 1]) {
  //     setCurrentImage(currentImage + 1);
  //   } else {
  //     setCurrentImage(0);
  //   }
  // }, [currentImage, images]);

  // useEffect(() => {
  //   let interval;
  //   if (images.length > 1) {
  //     interval = setInterval(switchImage, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [images, switchImage]);

  // const onClickHandler = () => {
  //   onClick(currentImage);
  // };

  return (
    // <div className="container-fluid">
    infoImg ? (
      <div className={styles.root}>
        <Link to={myLink}>
          <div className={styles.card}>
            <div className={styles.card__head}>
              <LazyImage src={infoImg} alt="" width="100%" height="100%" />
            </div>
            {/* <div className="card__frame"> */}
            <div className={styles.card__body}>
              <div className={styles.card__bodyHead}>
                <div className={styles.card__bodyHeadLeft}>
                  <img src="bsc.png" alt="" className={styles.binanceIcon} />
                  <img src="ethereum.png" alt="" />
                  <img src="polygon.png" alt="" />
                  {/* <img src="salona.svg" alt="" /> */}
                </div>
                <div className={styles.card__bodyHeadCenter}>
                  <p>Genesis Refined Apes</p>
                </div>
                <div className={styles.card__bodyHeadRight}>
                  {/* <a
                  className={cn(styles.card__link, styles.card__twitter)}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${window.location.href}assets/${info[currentImage].tokenAddr}/${info[currentImage].tokenId}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                  <RiFacebookCircleLine />
                  {/* </a> */}
                  {/* <a
                  className={cn(styles.card__link, styles.card__fb)}
                  href={`https://twitter.com/intent/tweet?text=Check out this Item on ClosedSea&url=${encodeURIComponent(
                    `${window.location.href}assets/${info[currentImage].tokenAddr}/${info[currentImage].tokenId}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                  <AiOutlineTwitter />
                  {/* </a> */}
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
                    href="https://www.instagram.com/refinedapesblockparty/"
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
                {/* <div className={styles.card__footerHeadLeft}>
                {(avatars && avatars[currentImage]) && (
                  <LazyImage className={styles.circle} src={avatars[currentImage]} circle />
                )}
              </div>
              <div className={styles.card__footerHeadRight}>
                <p>Owners</p>
              </div> */}
                <div className={styles.card__footerHeadRight}>
                  <p>Trending Now</p>
                </div>

                <div className={styles.card__footerHeadLeft}>
                  <span>Featured Collections</span>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </Link>
      </div>
    ) : (
      <ReactSkeleton height="100%" />
    )
  );
}

export default CardHero;
