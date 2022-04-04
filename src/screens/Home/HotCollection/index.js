import React from "react";
import styles from "./HotCollection.module.sass";
import { Container } from "react-bootstrap";
import cn from "classnames";
const HotCollection = () => {
  return (
    <>
      <Container fluid class={styles.myContainer}>
        <div className={styles.mainContainer}>
          <h1>Hot Collections</h1>

          <div className={styles.hotCollection_cardMainContainer}>
            {[1, 2, 3].map((v, i) => {
              return (
                <div className={styles.hotCollection_card} key={i}>
                  <div className={styles.hotCollection_body}>
                    <div className={styles.mainImage_container}>
                      <img src="img/content/photo-1.1.jpg" alt="img" />
                    </div>
                    <div className={styles.subImage_container}>
                      <img src="img/content/photo-1.3.jpg" alt="img" />
                      <img src="img/content/photo-1.3.jpg" alt="img" />
                      <img src="img/content/photo-1.3.jpg" alt="img" />
                    </div>
                  </div>
                  <div className={styles.hotCollection_footer}>
                    <div className={styles.hotCollection_footerHeading}>
                      <h3>Awesome Collection</h3>
                    </div>
                    <div className={styles.hotCollection_footerBody}>
                      <div className={styles.hotCollection_footerBody_left}>
                        <img src="img/content/avatar-1.jpg" />
                        <span>
                          By <strong>Kennith Olson</strong>
                        </span>
                      </div>
                      <div className={styles.hotCollection_footerBody_right}>
                        <span>28 ITEMS</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default HotCollection;
