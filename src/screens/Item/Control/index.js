import React, { useState } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Checkout from "./Checkout";
import Connect from "../../../components/Connect";
import Confirm from "./Confirm";
import Bid from "../../../components/ConnectBid";
import Accept from "./Accept";
import PutSale from "./PutSale";
//import Icon from "./yourPathHere.jpg";
import {
  BiPurchaseTag,
  BiDice6,
  BiLineChart,
  BiListUl,
  BiLockAlt,
} from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";

import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Toggle from "../../../components/Toggle/Toggle";
import Modal from "../../../components/Modal";
import ConfirmBid from "../../../components/ConfirmBid";
//import ConnectBid from '../../../components/ConnectBid'

const Control = ({ className }) => {
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalPurchaseInner, setVisibleModalPurchaseInner] = useState({
    firstScreen: false,
    secondScreen: false,
    thirdScreen: false,
  });

  const [visibleModalBid, setVisibleModalBid] = useState({
    visible: false,
    visibleBid: false,
    visibleConfirmedBid: false,
  });

  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);

  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.info}>Current Price</div>
        <div className={styles.head}>
          <div className={styles.avatar}>
            <img src="./Binance.png" alt="Avatar" />
          </div>
          <div className={styles.details}>
            <div className={styles.cost}>
              <div className={styles.price}>0.1</div>
              <div className={styles.price}>($49.23)</div>
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className={cn("button btn-square", styles.button)}
            onClick={() => {
              setVisibleModalPurchase(true);
              setVisibleModalPurchaseInner({
                ...visibleModalPurchaseInner,
                firstScreen: true,
              });
            }}
          >
            <BiPurchaseTag size={28} />
            Purchase now
          </button>
          <button
            className={cn("button-stroke btn-square", styles.button)}
            onClick={() => {
              setVisibleModalBid({
                ...visibleModalBid,
                visible: true,
                visibleBid: true,
                visibleConfirmedBid: false,
              });
            }}
          >
            <BiDice6 size={28} />
            Place a bid
          </button>
        </div>
        {/* <div className={styles.btns}>
          <button className={cn("button-stroke", styles.button)}>
            View all
          </button>
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalAccept(true)}
          >
            Accept
          </button>
        </div> */}
        {/* <div className={styles.text}>
          Service fee <span className={styles.percent}>1.5%</span>{" "}
          <span>2.563 BNB</span> <span>$4,540.62</span>
        </div> */}
        {/* <div className={styles.foot}>
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalSale(true)}
          >
            Put on sale
          </button>
        </div>
        <div className={styles.note}>
          You can sell this token on Crypter Marketplace
        </div> */}
      </div>
      <div className={cn(styles.container)}>
        <Toggle isOpen={true} question="Price History" Icon={BiLineChart}>
          <table className={cn(styles.table)} border="1">
            <thead>
              <td>Price</td>
              <td>USD Price</td>
              <td>Expiration</td>
              <td>@By</td>
            </thead>
            <tbody>
              <tr>
                <td>0.1 BNB</td>
                <td>$49.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
              <tr>
                <td>0.01 BNB</td>
                <td>$29.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
            </tbody>
          </table>
        </Toggle>

        <Toggle isOpen={true} question="Listings" Icon={BiListUl}>
          <table className={cn(styles.table)} border="1">
            <thead>
              <td>Price</td>
              <td>USD Price</td>
              <td>Expiration</td>
              <td>@From</td>
            </thead>
            <tbody>
              <tr>
                <td>0.1 BNB</td>
                <td>$49.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
            </tbody>
          </table>
        </Toggle>

        <Toggle isOpen={true} question="Offers" Icon={MdLocalOffer}>
          <table width="100%" className={cn(styles.table)} border="1">
            <thead>
              <td>Price</td>
              <td>USD Price</td>
              <td>Expiration</td>
              <td>@From</td>
            </thead>
            <tbody>
              <tr>
                <td>0.1 BNB</td>
                <td>$49.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
            </tbody>
          </table>
        </Toggle>
        <Toggle
          isOpen={false}
          isLocked={true}
          question="includes unlockable content"
          Icon={BiLockAlt}
        >
          <table width="100%" className={cn(styles.table)} border="1">
            <thead>
              <td>Price</td>
              <td>USD Price</td>
              <td>Expiration</td>
              <td>@From</td>
            </thead>
            <tbody>
              <tr>
                <td>0.1 BNB</td>
                <td>$49.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
            </tbody>
          </table>
        </Toggle>
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={() => {
          setVisibleModalPurchase(false);
          setVisibleModalPurchaseInner({
            ...visibleModalPurchaseInner,
            firstScreen: false,
            secondScreen: false,
            thirdScreen: false,
          });
        }}
      >
        {visibleModalPurchaseInner.firstScreen && (
          <Checkout
            setVisibleModalPurchaseInner={setVisibleModalPurchaseInner}
            visibleModalPurchaseInner={visibleModalPurchaseInner}
          />
        )}

        {visibleModalPurchaseInner.secondScreen && (
          <Confirm
            setVisibleModalPurchaseInner={setVisibleModalPurchaseInner}
            visibleModalPurchaseInner={visibleModalPurchaseInner}
          />
        )}
        {visibleModalPurchaseInner.thirdScreen && <SuccessfullyPurchased />}
      </Modal>
      <Modal
        visible={visibleModalBid.visible}
        onClose={() =>
          setVisibleModalBid({
            ...visibleModalBid,
            visible: false,
            visibleBid: false,
            visibleConfirmedBid: false,
          })
        }
      >
        {visibleModalBid.visibleBid && (
          <Bid
            setVisibleModalBid={setVisibleModalBid}
            visibleModalBid={visibleModalBid}
          />
        )}
        {visibleModalBid.visibleConfirmedBid && (
          <ConfirmBid setVisibleModalBid={setVisibleModalBid} />
        )}
      </Modal>
      <Modal
        visible={visibleModalAccept}
        onClose={() => setVisibleModalAccept(false)}
      >
        <Accept />
      </Modal>
      <Modal
        visible={visibleModalSale}
        onClose={() => setVisibleModalSale(false)}
      >
        <PutSale />
      </Modal>
    </>
  );
};

export default Control;
