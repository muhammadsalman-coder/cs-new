import React, { useContext, useEffect, useState } from "react";
import { withRouter, useLocation, Link } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./Page.module.sass";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer";
import { StatsContext } from "context/StatsContext";
import axios from "axios";
import { BACKEND_URL } from "config";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [notificationBarData, setnotificationBarData] = useState();
  const { visibleHeaderNotification, setVisibleHeaderNotification } =
    useContext(StatsContext);

  useEffect(async () => {
    let res = await axios.get(`${BACKEND_URL}get-notification-bar`);
    if (res.status === 200) {
      setnotificationBarData(res.data);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  const onCloseHandler = () => {
    setVisibleHeaderNotification(false);
  };

  return (
    <div className={styles.page}>
      {!pathname.includes("rabp-mint") && visibleHeaderNotification && (
        <div
          className={styles.notification}
          style={{
            color: `${notificationBarData?.textColor}`,
            backgroundColor: `${notificationBarData?.color}`,
          }}
        >
          <div style={{ flexGrow: 1 }}></div>
          {/* <span className={styles.landLeft}>
            Refined Apes Public Sale Now LIVE!{" "}
            <Link to={"/rabp-mint"}>Mint</Link>
          </span> */}
          <span className={styles.land}>
            {notificationBarData?.text ? notificationBarData.text : null}
            {/* <Link
              onClick={() => {
                window.open("https://refinedlandmetaversehome.netlify.app/");
              }}
            >
              Mint NFT
            </Link> */}
            {/* <Link to={"/land-mint"}>Mint</Link> */}
          </span>
          <div style={{ flexGrow: 1 }}></div>
          <AiOutlineClose className={styles.close} onClick={onCloseHandler} />
        </div>
      )}
      <NavigationBar />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
