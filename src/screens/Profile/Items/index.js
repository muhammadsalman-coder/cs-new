import React from "react";
import cn from "classnames";

import styles from "./Items.module.sass";
import CardSearch from "./CardSearch";
// import Loader from "components/Loader";

const Items = ({ className, items = [] }) => {

  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <CardSearch className={styles.card} item={x} key={`${x.title}-${index}`} />
        ))}
      </div>
      {/* <Loader className={styles.loader} /> */}
    </div>
  );
};

export default Items;
