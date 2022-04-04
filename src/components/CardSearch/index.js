import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import Web3 from "web3";

import styles from "./Card.module.sass";
import Icon from "../Icon";
import Modal from "../Modal";
import Connect from "../ConnectBid";
import LazyImage from "components/LazyImage";

const CardSearch = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);

  return (
    <>
      <div className={cn(styles.card, className)}>
        <Link
          className={styles.link}
          to={`/asset/${item.tokenAddr}/${item.tokenId}`}
        >
          <div className={styles.preview}>
            <LazyImage src={item.metadata?.imageUrl} alt="Card" />
            <div className={styles.control}>
              {!!item.categoryText && (
                <div className={cn("status-green", styles.category)}>
                  {item.categoryText}
                </div>
              )}
              <button
                className={cn(styles.favorite, { [styles.active]: visible })}
                onClick={() => setVisible(!visible)}
              >
                <Icon name="heart" size="20" />
              </button>
              <button
                className={cn("button btn-square", styles.button)}
                onClick={() => setVisibleModalBid(true)}
              >
                <span>Place a bid</span>
                <Icon name="scatter-up" size="16" />
              </button>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.title}>{item.metadata?.name}</div>
              {!!item.price && (
                <div className={styles.price}>
                  <div style={{ textAlign: "right" }}>Price</div>
                  <div>
                    <img
                      src="bsc.png"
                      alt="bsc-icon"
                      className={cn("bnbIcon", styles.bnbIcon)}
                    />{" "}
                    {Web3.utils.fromWei(item.price, "ether")} BNB
                  </div>
                </div>
              )}
            </div>
            {/* <div className={styles.line}>
              {item?.avatar && (
                <div className={styles.avatar}>
                  <LazyImage src={item.avatar} alt="Avatar" />
                </div>
              )}
            </div> */}
          </div>
          <div className={styles.foot}>
            <div className={styles.footer_purchaseNow_btn}>
              <span>Purchase Now</span>
            </div>
            {!!item.highestBid && (
              <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                Highest bid{" "}
                <span>
                  {Web3.utils.fromWei(item.highestBid[1])}{" "}
                  {item.highestBid[2] ? "BNB" : "SEA"}
                </span>
              </div>
            )}
            <div
              className={styles.bid}
              dangerouslySetInnerHTML={{ __html: item.bid }} //fire logo here
            />
          </div>
        </Link>
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect setVisibleModalBid={() => setVisibleModalBid(false)} />
      </Modal>
    </>
  );
};

export default CardSearch;
