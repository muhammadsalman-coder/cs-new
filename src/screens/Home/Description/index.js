import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Description.module.sass";
import Image from "../../../components/Image";

const Description = () => {
  return (
    <div className={cn("container-fluid", styles.section)}>
      <div className={cn(styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>Save your time with Stacks</div>
          <h1 className={cn("font-64", styles.title)}>
            Earn free crypto with Closedsea
          </h1>
          <div className={styles.text}>
            A creative agency that lead and inspire
          </div>
          <div className={styles.btns}>
            <Link
              className={cn("button btn-square", styles.button)}
              to="/upload-variants"
            >
              Create item
            </Link>
            <Link
              className={cn("button-stroke btn-square", styles.button)}
              to="/search01"
            >
              Discover more
            </Link>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="./images/content/pic16.png 2x"
              srcSetDark="./images/content/pic16.png 2x"
              src="./images/content/pic16.png"
              srcDark="./images/content/pic16.png"
              alt="Cubes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
