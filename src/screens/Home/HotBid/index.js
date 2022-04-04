import React from "react";
import styles from "./HotBid.module.sass";
import { Container } from "react-bootstrap";
import cn from "classnames";

const CandleStick = (props) => {
  return (
    <svg
      className={props.class}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="145.000000pt"
      height="196.000000pt"
      viewBox="0 0 145.000000 196.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path d="M1072 1877 c-17 -18 -22 -36 -22 -80 0 -55 -1 -57 -39 -81 -50 -32 -95 -88 -110 -135 -14 -48 -15 -541 -1 -590 15 -52 55 -104 105 -135 l45 -29 0 -218 0 -218 26 -20 c34 -27 47 -26 81 3 l28 24 3 219 3 219 35 19 c38 21 78 68 100 120 21 52 21 570 -2 623 -17 43 -67 97 -106 118 -24 12 -28 21 -28 58 0 108 -63 162 -118 103z m105 -299 c23 -21 23 -22 23 -295 l0 -274 -26 -26 c-22 -22 -32 -25 -67 -20 -77 10 -77 12 -77 317 0 255 1 268 21 294 27 34 91 37 126 4z" />
        <path d="M293 1566 l-28 -24 -3 -301 c-2 -260 -5 -301 -18 -301 -26 0 -112 -94 -123 -136 -6 -22 -11 -91 -11 -155 0 -108 2 -121 28 -170 18 -36 42 -62 74 -83 l47 -31 0 -121 c1 -67 6 -135 12 -153 19 -54 70 -67 107 -28 20 22 22 33 22 158 l0 136 50 32 c31 20 61 51 77 79 26 43 28 57 31 173 4 112 2 131 -18 177 -23 53 -73 106 -116 122 l-24 10 0 299 0 300 -26 20 c-34 27 -47 26 -81 -3z m102 -771 c24 -23 25 -31 25 -135 0 -61 -4 -120 -10 -130 -13 -24 -70 -43 -104 -34 -47 11 -56 38 -56 162 0 107 1 114 25 137 16 17 35 25 60 25 25 0 44 -8 60 -25z" />
      </g>
    </svg>
  );
};

const HotBid = () => {
  return (
    <>
      <Container fluid className={styles.hotBid_container}>
        <div className={styles.hotBid_mainContainer}>
          <h1>Hot bid</h1>
          <div className={styles.hotBit__card_row}>
            {[1, 2, 3, 4].map((v, i) => {
              return (
                <div className={styles.hotBid_CardMainContainer}>
                  <div className={styles.hotBid_card}>
                    <div className={styles.hotBid_cardImg}>
                      <img src="img/content/card-pic-4.jpg" alt="img" />
                    </div>
                    <div className={styles.hotBit_cardBody}>
                      <div className={styles.hotBit_cardLine}>
                        <p>
                          <strong>Ribbon Hunter</strong>
                        </p>
                        <span>2.45 ETH</span>
                      </div>
                      <div className={styles.hotBit_cardLine}>
                        <div class={styles.hotBitCard_users}>
                          <div class={styles.hotBitCard_avatar}>
                            <img src="img/content/avatar-1.jpg" alt="Avatar" />
                          </div>
                          <div class={styles.hotBitCard_avatar}>
                            <img src="img/content/avatar-3.jpg" alt="Avatar" />
                          </div>
                          <div class={styles.hotBitCard_avatar}>
                            <img src="img/content/avatar-4.jpg" alt="Avatar" />
                          </div>
                        </div>
                        <div class={styles.hotBitCard_cunter}>3 in stock</div>
                      </div>
                    </div>
                    <hr />
                    <div className={styles.hotBit_footer}>
                      <div className={styles.hotBit_footerLeft}>
                        <p>
                          <CandleStick class={styles.candleStick_Svg} />
                          <span>
                            Highest Bid <strong>0.001 ETH</strong>
                          </span>
                        </p>
                      </div>
                      <div className={styles.hotBit_footerRight}>
                        <p>
                          New bid <span>🔥</span>
                        </p>
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

export default HotBid;
