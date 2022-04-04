import React, { useContext, useEffect } from "react";
import { withRouter, useLocation, Link } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./Page.module.sass";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer";
import { StatsContext } from "context/StatsContext";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const { visibleHeaderNotification, setVisibleHeaderNotification } =
    useContext(StatsContext);

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
        <div className={styles.notification}>
          <div style={{ flexGrow: 1 }}></div>
          {/* <span className={styles.landLeft}>
            Refined Apes Public Sale Now LIVE!{" "}
            <Link to={"/rabp-mint"}>Mint</Link>
          </span> */}
          <span className={styles.land}>
            Binance Smart Chain ClosedSea Now Live{" "}
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
