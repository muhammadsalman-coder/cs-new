import React from "react";
import cn from "classnames";

import styles from "./Items.module.sass";
import CardSearch from "./CardSearch";
import Spinner from "components/Spinner/Spinner";
// import Loader from "components/Loader";

const Items = ({ className, items = [], loading = false }) => {
  // console.log("className in items ->", className);
  // console.log("items in items ->", items);
  // console.log("loading in items ->", loading);

  return (
    <div className={cn(styles.items, className)}>
      {loading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : items.length ? (
        <div className={styles.list}>
          {items.map((x, index) => (
            <CardSearch
              className={styles.card}
              item={x}
              key={`${x.title}-${index}`}
            />
          ))}
        </div>
      ) : (
        <div>No data</div>
      )}
      {/* <Loader className={styles.loader} /> */}
    </div>
  );
};

export default Items;
