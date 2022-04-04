import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";
import {
  FaDiscord,
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";

const items = [
  {
    title: "ClosedSea",
    menu: [
      {
        title: "Discover",
        url: "/search01",
      },
      {
        title: "Connect wallet",
        url: "/connect-wallet",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "FAQ",
        url: "/faq",
      },
      {
        title: "Create item",
        url: "/upload-variants",
      },
      {
        title: "Privacy Policy",
        url: "#",
      },
      {
        title: "Terms & Conditions",
        url: "#",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container-fluid p-40", styles.container)}>
        <div className={styles.upper}>
          <div className={styles.row}>
            <div className={styles.col}>
              <Link className={styles.logo} to="/">
                <Image
                  className={styles.pic}
                  src="closedsea-logo123.svg"
                  srcDark="closed-white.png"
                  alt="Fitness Pro"
                />
              </Link>
              <div className={styles.info}>The New Creative Economy.</div>
              <div className={styles.version}>
                <div className={styles.details}>Dark theme</div>
                <Theme className="theme-big" />
              </div>
            </div>
            <div className={styles.col}>
              {items.map((x, index) => (
                <Group className={styles.group} item={x} key={index} />
              ))}
            </div>
            <div className={styles.col}>
              <div className={styles.community}>
                <div className={styles.category}>Join the Community</div>
                <div className={styles.icons}>
                  <a
                    href="https://twitter.com/closedseanft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <FaTwitter size={22} />
                  </a>
                  <a
                    href="https://closedsea.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <FaFacebookF size={22} />
                  </a>
                  <a
                    href="https://t.me/closedseanft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <FaTelegramPlane size={22} />
                  </a>
                  <a
                    href="https://www.instagram.com/closedseanft/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href="https://twitter.com/closedseanft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                  >
                    <FaDiscord size={22} />
                  </a>
                </div>
              </div>
              <div className={styles.category}>Join Newsletter</div>
              <div className={styles.text}>
                Subscribe our newsletter to get more free design course and
                resource
              </div>
              <Form
                className={styles.form}
                value={email}
                setValue={setEmail}
                onSubmit={() => handleSubmit()}
                placeholder="Enter your email"
                type="email"
                name="email"
              />
            </div>
          </div>

          {/* <div className={styles.community}>
            <div className={styles.communityLine}>Join the community</div>
            <div className={styles.icons}>
              <a
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaFacebookF size={22} />
              </a>
              <a
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaTelegramPlane size={22} />
              </a>
              <a
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://twitter.com/closedseanft"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaDiscord size={22} />
              </a>
            </div>
          </div> */}
        </div>

        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 Closedsea. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
