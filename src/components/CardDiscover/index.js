import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./CardDiscover.module.sass";
import Icon from "../Icon";
import Modal from "../Modal";
import Connect from "../ConnectBid";

const CardDiscover = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);

  return (
    <>
      <div className={cn(styles.card, className)}>
        <div className={styles.preview}>
          <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Card" />
          <div className={styles.control}>
            {/* <div
              className={cn(
                { "status-green": item.category === "green" },
                styles.category
              )}
            >
              {item.categoryText}
            </div> */}
            {/* <button
              className={cn(styles.favorite, { [styles.active]: visible })}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="heart" size="20" />
            </button> */}
            {/* <a href="#test-popup" data-effect="mfp-zoom-in" className={cn("button-small js-popup-open", styles.button)}>
            <span>Place a bid</span>
            <Icon name="scatter-up" size="16" />
          </a> */}
            {/* <button
              className={cn("button", styles.button)}
              onClick={() => setVisibleModalBid(true)}
            >
              <span>Place a bid</span>
              <Icon name="scatter-up" size="16" />
            </button> */}
          </div>
        </div>

        <Link
          className={cn(item.cName, styles.link)}
          //className={styles.link}
          to={item.url}
          //style={{ backgroundColor: { linkColor } }}
        >
          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.title}>{item.title}</div>
            </div>
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

export default CardDiscover;
