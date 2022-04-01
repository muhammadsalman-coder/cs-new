import React from "react";
import cn from "classnames";
import styles from "./Followers.module.sass";
import Loader from "../../../components/Loader";
import { useHistory } from "react-router";
import { GoVerified } from "react-icons/go";
import Spinner from "components/Spinner/Spinner";
const Followers = ({ className, items, loading }) => {
  const history = useHistory();

  const redirectToProfileMethod = (x) => {
    history.push(`/profile/${x?.address}`);
  };
  return (
    <div className={cn(styles.followers, className)}>
      {loading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.list}>
          {items.length ? (
            items.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                onClick={() => {
                  redirectToProfileMethod(x);
                }}
              >
                <div className={styles.follower}>
                  <div className={styles.avatar}>
                    <img
                      src={x?.avatar ? x.avatar : "./avatar.jpg"}
                      alt="Avatar"
                    />

                    <div
                      className={cn(styles.verifiedIcon, {
                        [styles.hideverifiedIcon]: !x.isVerified,
                      })}
                    >
                      <img
                        src="./images/icons/verified.png"
                        style={{ width: "25px", height: "25px" }}
                      />
                      {/* <GoVerified
                      // style={{ strokeWidth: "0.5px", stroke: "#b0b0b0" }}
                      /> */}
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.title}>{x?.userName}</div>
                    <div className={styles.counter}>
                      Followers: {x?.follower.length}
                    </div>
                    <a
                      className={cn(
                        {
                          "button-small btn-square": x?.buttonClass === "blue",
                        },
                        {
                          "button-stroke button-small btn-square":
                            x?.buttonClass === "stroke",
                        },
                        styles.button
                      )}
                      href={x?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {x?.buttonContent}
                    </a>
                  </div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.gallery}>
                    {x?.gallery &&
                      x.gallery.map((x, index) => (
                        <div className={styles.preview} key={index}>
                          <img src={x} alt="Follower" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Data</div>
          )}
        </div>
      )}
      {/* <Loader className={styles.loader} /> */}
    </div>
  );
};

export default Followers;
