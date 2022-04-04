import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import cn from "classnames";

import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import Toggle from "../../components/Toggle/Toggle";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import {
  BiPurchaseTag,
  BiDice6,
  BiLineChart,
  BiNote,
  BiHistory,
  BiCollection,
  BiHeart,
} from "react-icons/bi";
import {
  MdDescription,
  MdRemoveRedEye,
  MdContentCopy,
  MdFlag,
  MdMoreVert,
} from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import { CgDetailsMore } from "react-icons/cg";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { ImEmbed } from "react-icons/im";

const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];

const users = [
  // {
  //   name: "Julie P. Graves",
  //   position: "Owner",
  //   avatar: "./images/icons/icon10.png",
  //   reward: "./images/content/reward-1.svg",
  // },
  {
    name: "BoredApeYachtClub",
    position: "Creator",
    avatar: "./images/icons/icon2.png",
    check: true,
    //reward: "./images/content/reward-1.svg",
  },
];

const usersOwners = [
  {
    name: "21FAA7",
    position: "Owner",
    avatar: "./images/icons/icon3.png",
    reward: "./images/content/reward-1.svg",
  },
];

const usersHistory = [
  {
    name: "Julie P. Graves",
    position: "Place a bid: 1.46 BNB",
    avatar: "./images/icons/icon4.png",
    reward: "./images/content/reward-1.svg",
  },
  {
    name: "Lisa E. Lyles",
    position: "Put Closedsea Art on sale",
    avatar: "./images/icons/icon5.png",
    reward: "./images/content/reward-1.svg",
  },
  {
    name: "Donald I. Andrews",
    position: "Accepted Julie P. Graves's bid",
    avatar: "./images/icons/icon6.png",
    reward: "./images/content/reward-1.svg",
  },
];

const usersBids = [
  {
    position: "Highest bid: 1.46 BNB",
    name: "Julie P. Graves",
    avatar: "./images/icons/icon7.png",
    reward: "./images/content/reward-1.svg",
  },
  {
    position: "#2",
    name: "Darek L. Adams",
    avatar: "./images/icons/icon8.png",
    // reward: "./images/content/reward-1.svg",
  },
  {
    position: "#3",
    name: "Wade R. Walker",
    avatar: "./images/icons/icon9.png",
    // reward: "./images/content/reward-1.svg",
  },
];
const flagOptions = [{ id: 1, img: "/flags.png", title: "Report" }];

const Item = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownShow, setdropdownShow] = useState(false);
  const { address, tokenId } = useParams();

  return (
    <>
      <div className={cn("section container-1300", styles.section)}>
        <div className={cn(styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              {/* <div> */}
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>

              <img
                srcSet="./images/content/item.png 2x"
                src="./images/content/item.png"
                alt="Item"
              />
              {/* </div> */}
            </div>
            <Options className={styles.options} />
            <div className="acco">
              <Toggle isOpen={true} question="Description" Icon={MdDescription}>
                <p>
                  Created by <Link to="/profile"> BoredApeYachtClub </Link>
                </p>
              </Toggle>
              <Toggle
                isOpen={true}
                question="A Note from Forever"
                Icon={BiNote}
              >
                <p>
                  The Bored Ape Yacht Club is a collection of 10,000 unique
                  Bored Ape NFTs— unique digital collectibles living on the
                  Ethereum blockchain. Your Bored Ape doubles as your Yacht Club
                  membership card, and grants access to members-only benefits,
                  the first of which is access to THE BATHROOM, a collaborative
                  graffiti board. Future areas and perks can be unlocked by the
                  community through roadmap activation. Visit
                  www.BoredApeYachtClub.com for more details.
                </p>
              </Toggle>

              <Toggle isOpen={true} question="Details" Icon={CgDetailsMore}>
                <table
                  className="table"
                  style={{ textAlign: "left" }}
                  width="100%"
                >
                  <tr>
                    <th>Contract Address</th>
                    <td>0x495f...7b5e</td>
                  </tr>
                  <tr>
                    <th>Token ID</th>
                    <td>8857332921955606..</td>
                  </tr>
                  <tr>
                    <th>Token Standard</th>
                    <td>ERC - 115</td>
                  </tr>
                  <tr>
                    <th>BlockChain</th>
                    <td>Binance</td>
                  </tr>
                  <tr>
                    <th>Metadata</th>
                    <td>Centralized</td>
                  </tr>
                </table>
              </Toggle>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.nameshare}>
              <div className={styles.share}>
                <div className={styles.shareItemContainer}>
                  <a href="#asd" className={styles.shareItem}>
                    <MdContentCopy size={20} />
                    {/* <img src={process.env.PUBLIC_URL + "/link-page.png"} alt="" /> */}
                  </a>
                </div>

                <div>
                  <a
                    href="https://closedsea.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("insta", styles.shareItem)}
                  >
                    <AiOutlineInstagram size={22} />
                    {/* <img src={process.env.PUBLIC_URL + "/facebook.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a
                    href="https://closedsea.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("facebookColor", styles.shareItem)}
                    style={{ color: "#fff" }}
                  >
                    <FaFacebookF size={20} />
                    {/* <img src={process.env.PUBLIC_URL + "/facebook.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a
                    href="https://twitter.com/closedseanft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("twitter", styles.shareItem)}
                  >
                    <FaTwitter size={20} />
                    {/* <img src={process.env.PUBLIC_URL + "/twitter.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a href="#asd" className={styles.shareItem}>
                    <ImEmbed size={22} />
                    {/* <img src={process.env.PUBLIC_URL + "/embed.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a href="#asd" className={cn("flag", styles.shareItem)}>
                    <MdFlag size={22} />
                    {/* <img src={process.env.PUBLIC_URL + "/flags.png"} alt="" /> */}
                  </a>
                </div>
                <div className={styles.dropdown}>
                  <OutsideClickHandler
                    onOutsideClick={() => setdropdownShow(false)}
                  >
                    <button onClick={() => setdropdownShow(!dropdownShow)}>
                      <MdMoreVert size={24} />
                      {/* <img src={process.env.PUBLIC_URL + "/more.png"} alt="" /> */}
                    </button>

                    {dropdownShow && (
                      <div className={styles.dropdownMenu}>
                        <div className={styles.dropdownItemContainer}>
                          <a className={styles.dropdownItem} href="#asd">
                            <img
                              src={process.env.PUBLIC_URL + "/flags.png"}
                              alt=""
                            />
                            <p>Report</p>
                          </a>
                        </div>
                      </div>
                    )}
                  </OutsideClickHandler>
                </div>
              </div>
              <h1 className={cn("h3 f-30", styles.title)}>#4712</h1>
            </div>
            {/* <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                2.5 BNB
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>10 in stock</div>
            </div> */}
            {/* <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit
              <br />{" "}
              <a
                href="https://footie.plus/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://footie.plus/
              </a>
            </div> */}

            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
              <div className={cn(styles.stats)}>
                <MdRemoveRedEye size={24} style={{ marginRight: "6px" }} />
                <a className={cn(styles.statsLink)} href="#asd">
                  38k Views
                </a>
              </div>
              <div className={cn(styles.stats)}>
                <AiFillHeart size={24} style={{ marginRight: "6px" }} />
                <a className={cn(styles.statsLink)} href="#asd">
                  40k Likes
                </a>
              </div>
            </div>
            <div>
              {activeIndex === 1 && (
                <Users
                  className={cn(styles.users, "mb-5")}
                  items={usersOwners}
                  isOwner
                />
              )}
              {activeIndex === 2 && (
                <Users
                  className={cn(styles.users, "mb-5")}
                  items={usersHistory}
                />
              )}
              {activeIndex === 3 && (
                <Users className={cn(styles.users, "mb-5")} items={usersBids} />
              )}
              {activeIndex === 0 && (
                <Users
                  className={cn(styles.users, "mb-5")}
                  items={users}
                  isOwner
                />
              )}
            </div>

            {/* <Users className={styles.users, "mb-5"} items={users} /> */}
            <Control className={styles.control} />
          </div>
        </div>

        {/* <div className={cn(styles.container)}>
          <div>asdasdasd</div>
          <div>asdasdas</div>
          <div>asdasdasd</div>
        </div> */}

        <div className={cn(styles.containerColumn)}>
          <Toggle isOpen={true} question="Trading History" Icon={BiHistory}>
            <table className={cn(styles.table)} border="1">
              <thead>
                <td>Price</td>
                <td>USD Price</td>
                <td>Expiration</td>
                <td>@From</td>
              </thead>
              <tbody>
                <tr>
                  <td>0.1 BNB</td>
                  <td>$49.23</td>
                  <td> - </td>
                  <td>Julia P.Grave</td>
                </tr>
              </tbody>
            </table>
          </Toggle>

          <Toggle
            isOpen={true}
            question="More from this Collection"
            Icon={BiCollection}
          >
            <div className={styles.collection}>
              <div>
                <Link to="/item">
                  <img src={process.env.PUBLIC_URL + "/third/5.jpeg"} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/item">
                  <img src={process.env.PUBLIC_URL + "/third/7.jpeg"} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/item">
                  <img src={process.env.PUBLIC_URL + "/third/8.png"} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/item">
                  <img src={process.env.PUBLIC_URL + "/third/10.jpeg"} alt="" />
                </Link>
              </div>
            </div>
          </Toggle>
        </div>
      </div>
    </>
  );
};

export default Item;
