import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import Web3 from "web3";

import styles from "./Card.module.sass";
import Icon from "../../../components/Icon";
import Modal from "components/Modal";
// import Connect from "../ConnectBid";
import LazyImage from "components/LazyImage";
import { FaCheck } from "react-icons/fa";
const CardSearch = ({ className, item, handleSelected }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  console.log("tokenaddddd", item);
  return (
    <>
      <div
        className={cn(styles.card, className)}
        onClick={() => handleSelected(item.tokenId, item.selected)}
      >
        {/* <Link
          className={styles.link}
          to={`/asset/${item.tokenAddr}/${item.tokenId}`}
        > */}
        <div className={styles.preview}>
          <LazyImage
            src={item.metadata?.imageUrl}
            alt="Card"
            className={styles.imgLazyTest}
          />
          <div className={styles.control}>
            {!!item.categoryText && (
              <div className={cn("status-green", styles.category)}>
                {item.categoryText}
              </div>
            )}
            <button
              className={cn(styles.favorite)}
              // onClick={(event) => {
              //   // event.stopPropagation();
              //   // alert("image");
              //   // console.log("abec");
              //   // setVisible(!visible);
              // }}
            >
              {item.selected ? (
                <FaCheck size="20" style={{ fill: "green" }} />
              ) : (
                <FaCheck size="20" style={{ fill: "#d8d5d5" }} />
              )}
            </button>
            {/* <button
              className={cn("button btn-square", styles.button, styles.bidbid)}
              onClick={() => setVisibleModalBid(true)}
              style={{ zIndex: 1000 }}
            >
              <span>Place a bid</span>
              <Icon name="scatter-up" size="16" />
            </button> */}
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
                  />
                  {Web3.utils.fromWei(String(item.price), "ether")} BNB
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
        {/* </Link> */}
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <div className="row">
          <div className="col-md-6">
            <h1>abc</h1>
          </div>
          <div className="col-md-6">
            <h1>abc</h1>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CardSearch;
