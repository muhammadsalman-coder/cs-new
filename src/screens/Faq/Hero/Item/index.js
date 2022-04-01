import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

const Preview = ({ children, className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.item, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {item}
      </div>
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Preview;
