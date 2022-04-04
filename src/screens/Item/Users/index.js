import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Users = ({ className, items, isOwner }) => {
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
              {x.reward && (
                <div className={styles.reward}>
                  <img src={x.reward} alt="Reward" />
                </div>
              )}

              {x.check && (
                <div className="img-icon-checkmark">
                  <FaCheck />
                </div>
              )}
            </div>
            <div className={styles.details}>
              <div className={styles.position}>{x.position}</div>
              {isOwner ? (
                <Link to="/profile">
                  <div className={styles.name}>{x.name}</div>
                </Link>
              ) : (
                <div className={styles.name}>{x.name}</div>
              )}
              {/* {check ? (
                  <div className="img-icon-checkmark">
                    <FaCheck />
                  </div>
                ) : null} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
