import React, { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import cn from "classnames";
import { AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";

import styles from "./User.module.sass";
import Icon from "components/Icon";
import Report from "components/Report";
import Modal from "components/Modal";
import { useWeb3React } from "@web3-react/core";
import { getEllips } from "utils/helpers/common";
import { BACKEND_URL } from "config";
import axios from "axios";

// import useGetUser from "utils/hooks/use-get-user";

const shareUrlFacebook = "https://closedsea.com/";
const shareUrlTwitter = "https://closedsea.com/";

const Months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "AUG",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const convertDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getUTCMonth();
  const monthName = Months[month];
  const day = new Date(date).getDate();
  return `${day} ${monthName} ${year}`;
};

const User = ({ className, user }) => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  // const [user, setUser] = useState();

  let { address } = useParams();
  const { account } = useWeb3React();

  // console.log("I AM THE USER visible", user);
  useEffect(() => {
    console.log("user", user);
    if (user?.follower?.length) {
      user?.follower.forEach((element) => {
        if (element == account.toLowerCase()) {
          setVisible(true);
        }
      });
    } else {
      setVisible(false);
    }
  }, [user, address]);

  const updatingFollow = async () => {
    const res = await axios.post(`${BACKEND_URL}users_follow`, {
      follower: address,
      following: account.toLowerCase(),
    });
    console.log("res", res);
  };
  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          {user?.avatar ? (
            <img src={user?.avatar} alt="Avatar" />
          ) : (
            <AiOutlineUser size={100} />
          )}
        </div>
        {user?.userName ? (
          <div className={styles.name}>{user.userName}</div>
        ) : (
          <div className={styles.unname}>Unnamed</div>
        )}
        <div className={styles.code}>
          <div className={styles.number}>
            {getEllips(user?.address ? user.address : account)}
          </div>
          <button className={styles.copy}>
            <Icon name="copy" size="16" />
          </button>
        </div>
        <div className={styles.info}>{user?.description}</div>
        <div className={styles.control}>
          <div className={styles.btns}>
            {account?.toLowerCase() != address?.toLowerCase() && (
              <button
                className={cn(
                  "button button-small btn-square",
                  // { [styles.active]: visible },
                  styles.button
                )}
                onClick={() => {
                  setVisible(!visible);
                  updatingFollow();
                }}
                // type="button"
                disabled={visible ? "disabled" : ""}
              >
                <span aria-disabled>{visible ? "Unfollow" : "Follow"}</span>
                {/* <span aria-disabled>Unfollow</span> */}
              </button>
            )}

            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <Icon name="report" size="20" />
            </button>
          </div>
          <div className={cn(styles.box, { [styles.active]: visibleShare })}>
            <div className={styles.stage}>Share link to this page</div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                url={shareUrlTwitter}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={shareUrlFacebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>

        <div className={styles.socials}>
          {/* {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))} */}
        </div>
        <div className={styles.note}>
          Member since {convertDate(user?.createdAt)}
        </div>
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report setVisibleModalReport={setVisibleModalReport} />
      </Modal>
    </>
  );
};
export default User;
