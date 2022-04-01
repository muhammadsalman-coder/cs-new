import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "components/Icon";
import Modal from "components/Modal";
import Connect from "components/ConnectBid";
import LazyImage from "components/LazyImage";
import Web3 from "web3";

const CardSearch = ({ className, item }) => {
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  console.log("sdfsdfitem", item);
  if (item?.tokenId || item?.tokenAddr) {
    item.token_id = item.tokenId;
    item.token_address = item.tokenAddr;
  }
  return (
    <>
      <div className={cn(styles.card, className)}>
        <Link
          className={styles.link}
          to={`/asset/${item.token_address}/${item.token_id}`}
        >
          <div className={styles.preview}>
            <LazyImage src={item?.metadata?.imageUrl} alt="Card" />
            <div className={styles.control}>
              {!!item.categoryText && (
                <div
                  className={cn(
                    { "status-green": item.category === "green" },
                    styles.category
                  )}
                >
                  {item.categoryText}
                </div>
              )}
              {/* <a href="#test-popup" data-effect="mfp-zoom-in" className={cn("button-small js-popup-open", styles.button)}>
            <span>Place a bid</span>
            <Icon name="scatter-up" size="16" />
          </a> */}
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.title}>{item?.metadata?.name}</div>
              {/* {!!item.price && (
                <div className={styles.price}>
                  {Web3.utils.fromWei(String(item.price), "ether")} BNB
                </div>
              )} */}
            </div>
            <div className={styles.line}>
              <div className={styles.desc}>{item?.metadata?.description}</div>
            </div>
            <div className={styles.line}>
              {!!item.users && (
                <div className={styles.users}>
                  {item.users.map((x, index) => (
                    <div className={styles.avatar} key={index}>
                      <img src={x.avatar} alt="Avatar" />
                    </div>
                  ))}
                </div>
              )}
              {!!item.counter && (
                <div className={styles.counter}>{item.counter}</div>
              )}
            </div>
          </div>
          <div className={styles.foot}>
            {!!item.highestBid && (
              <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                Highest bid <span>{item.highestBid}</span>
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
        <Connect />
      </Modal>
    </>
  );
};

export default CardSearch;
