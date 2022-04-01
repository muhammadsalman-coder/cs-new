import React, { useState } from "react";
import styles from "./NftGames.module.sass";
import cn from "classnames";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";
const NftGames = () => {
  const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
  const directionOptions = ["Upcoming", "Live"];
  const [direction, setDirection] = useState(directionOptions[0]);
  const [isActive, setActive] = useState(false);
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
        {/* <h3 className={cn("h3", styles.title)}>NFT Gaming</h3> */}

        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Top Trending NFT Gaming</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
        </div>
        <Row className={cn("g-0")}>
          <Col lg={6} md={12} sm={12}>
            <div className={styles.nftGames_left}>
              <h1 className={cn("h3", styles.heading_title)}>
                Jungle <br /> Rules
              </h1>
              <p>
                JUNGLE RULES: A FIGHTING GAME; In this game RABP NFT holders
                earn bananas through fighting sequences, where people can buy
                rudimentary weapons strength and more as in-game purchases by
                spending $SEA tokens. For example each banana may be worth 1
                $SEA, once you connect your wallet if you have 100 $SEA you have
                100 Bananas. Every time you lose a fight you lose 10 $SEA if you
                win you gain 10 $SEA. The game also allows staking through a
                virtual bank where you can stake your $SEA for bananas.{" "}
                <span
                  className={cn(
                    isActive ? styles.moreText_span : null,
                    styles.moreText_span_default
                  )}
                >
                  It also goes without saying an NFT avatar that owns more
                  weapons will be able to win more matches and also be more
                  valuable at the time of sale as its gaming assets will be tied
                  to that particular NFT. This game will also be able to offer
                  social networking, and entertainment value with live voice
                  connectivity as you make alliances and friends in JUNGLE RULES
                </span>
                <span
                  onClick={() => {
                    setActive(!isActive);
                  }}
                  className={cn(
                    styles.moreTextBtn_span
                    // isActive ? styles.moreText_span_default : null
                  )}
                >
                  {isActive ? "less.." : "More..."}
                </span>
              </p>
              <div className={styles.btns}>
                <Link
                  className={cn("button btn-square", styles.button)}
                  to="/marketplace"
                >
                  Coming Soon
                </Link>
              </div>
            </div>
          </Col>
          <Col md={12} lg={6} sm={12}>
            <div className={styles.imgContainer_main}>
              <img src="junglePLay.png" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NftGames;
