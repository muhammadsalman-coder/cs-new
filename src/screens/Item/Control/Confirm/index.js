import React, { useState } from "react";
import cn from "classnames";
import styles from "./Confirm.module.sass";
import Icon from "../../../../components/Icon";
import LoaderCircle from "../../../../components/LoaderCircle";
import Modal from "../../../../components/Modal";
import Bid from "../../../../components/ConnectBid";
import SuccessfullyPurchased from "../SuccessfullyPurchased";

const items = [
  {
    title: "0.007",
    value: "BNB",
  },
  {
    title: "Your balance",
    value: "8.498 BNB",
  },
  {
    title: "Service fee",
    value: "0 BNB",
  },
  {
    title: "You will pay",
    value: "0.007 BNB",
  },
];

const Confirm = ({
  className,
  setVisibleModalPurchaseInner,
  visibleModalPurchaseInner,
}) => {
  const [visibleModalAccept, setvisibleModalAccept] = useState(false);
  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>Follow</div>

      <div className={cn("h4", styles.title)}>Follow steps</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <LoaderCircle className={styles.loader} />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>Purchasing</div>
          <div className={styles.text}>
            Sending transaction with your wallet
          </div>
        </div>
      </div>
      <div className={styles.attention}>
        <div className={styles.preview}>
          <Icon name="info-circle" size="32" />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>This creator is not verified</div>
          <div className={styles.text}>Purchase this item at your own risk</div>
        </div>
        <div className={styles.avatar}>
          <img src="./images/content/avatar-3.jpg" alt="Avatar" />
        </div>
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => {
            setVisibleModalPurchaseInner({
              ...visibleModalPurchaseInner,
              firstScreen: false,
              secondScreen: false,
              thirdScreen: true,
            });
          }}
          className={cn("button btn-square", styles.button)}
        >
          I understand, continue
        </button>
        <button className={cn("button-stroke btn-square", styles.button)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirm;
