import React, { useState, useRef } from "react";
import cn from "classnames";
import axios from "axios";
import styles from "./Connect.module.sass";
import Modal from "../Modal";
import ConfirmBid from "../ConfirmBid";

const Connect = ({ className, visibleModalBid, setVisibleModalBid }) => {
  const [productId, setProductId] = useState(111);
  const [userId, setUserid] = useState(222);
  const [balance, setBalance] = useState(12.498);
  const [servicefee, setServicefee] = useState(0);
  const [totalbidamount, setTotalbidamount] = useState(0);
  const [bid, setBid] = useState();
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmBid, setConfirmBid] = useState(false);

  const handleBid = (setVisibleModalBid, visibleModalBid) => {
    setTotalbidamount(Number(bid) + Number(servicefee));

    if (bid) {
      setErr(false);
      setBalance(balance - totalbidamount);
      axios
        .post("http://localhost:4000/placebid", {
          productID: productId,
          userID: userId,
          balance: balance,
          serviceFee: servicefee,
          bid: bid,
          totalBidAmount: totalbidamount,
        })
        .then((res) => {
          setSuccess(true);
          console.log(balance - totalbidamount);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr(true);
    }
  };

  return (
    <div className={cn(className, styles.connect)}>
      <div>
        <h1>Place a bid</h1>
      </div>
      <div className="table-font">
        You are about to purchase Closedsea Art
        {err ? (
          <div>
            <p>
              <strong>please type a Bid first</strong>{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {success ? (
          <div>
            <p>
              <strong>The Bid is Submited</strong>{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <h3>Your bid</h3>
      </div>
      <table>
        <tr className="table-font">
          <td className="gray">Enter bid</td>
          <td className="table-right">
            <input
              style={{
                backgroundColor: "#FCFCFD",
                textAlign: "right",
                marginRight: "2px",
              }}
              type="text"
              onChange={(e) => {
                setBid(Number(e.target.value));
                setTotalbidamount(
                  Number(Number(e.target.value) + Number(servicefee))
                );
              }}
            />
            BNB
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <hr />
          </td>
        </tr>
        <tr className="table-font">
          <td className="gray">Your balance</td>
          <td className="table-right">{balance} BNB</td>
        </tr>

        <tr className="table-font">
          <td className="gray">Service fee</td>
          <td className="table-right">{servicefee} BNB</td>
        </tr>
        <tr className="table-font">
          <td className="gray">SEA Token Balance</td>
          <td className="table-right">1000 SEA</td>
          {/* <td className="table-right">{totalbidamount} SEA</td> */}
        </tr>
        <tr className="table-font">
          <td className="gray">Total bid amount</td>
          <td className="table-right">{totalbidamount} BNB</td>
        </tr>
      </table>
      <div className={styles.btns}>
        <button
          className={cn("button btn-square", styles.button)}
          onClick={() => {
            handleBid();
            setVisibleModalBid({
              ...visibleModalBid,
              visibleBid: false,
              visibleConfirmedBid: true,
            });
            // setConfirmBid(true);
          }}
        >
          Place a bid
        </button>
        <button className={cn("button-stroke btn-square", styles.button)}>
          Cancel
        </button>
      </div>

      <Modal
        visible={confirmBid}
        onClose={() => {
          setConfirmBid(false);
          setVisibleModalBid(false);
        }}
      >
        <ConfirmBid />
      </Modal>
    </div>
  );
};

export default Connect;
