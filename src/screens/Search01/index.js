import React, { useState } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import CardSearch from "../../components/CardSearch";
import Dropdown from "../../components/Dropdown";
import { BiGrid, BiFootball } from "react-icons/bi";
import { GiAmericanFootballHelmet } from "react-icons/gi";
// data
import { bids } from "../../mocks/search01";

//const navLinks = ["All items", "Football Art", "Football Game"];
const navLinks = [
  {
    text: "All Items",
    Icon: <BiGrid size={18} />,
  },
  {
    text: "Football Art",
    Icon: <GiAmericanFootballHelmet size={18} />,
  },
  {
    text: "Football Game",
    Icon: <BiFootball size={18} />,
  },
];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const statusOptions = ["Buy Now", "On Auction", "New", "Has Offers"];
const creatorOptions = ["Verified only", "All", "Most liked"];
const chainOptions = ["Ethereum", "Binance", "Polygon"];

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [chain, setChain] = useState(chainOptions[0]);

  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  const handleSubmit = (e) => {
    alert();
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
        {/* <div className={styles.top}>
          <div className={styles.title}>Type your keywords</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div> */}
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.map((x, index) => (
              <button
                className={cn(styles.link, styles.navLink, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={() => setActiveIndex(index)}
                key={index}
              >
                {x.Icon}
                <span>{x.text}</span>
              </button>
            ))}
          </div>

          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.range}>
              <div className={styles.label}>Price range</div>
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0.01 BNB</div>
                <div className={styles.number}>10 BNB</div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>Status</div>
                <Dropdown
                  className={styles.dropdown}
                  value={status}
                  setValue={setStatus}
                  options={statusOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Chain</div>
                <Dropdown
                  className={styles.dropdown}
                  value={chain}
                  setValue={setChain}
                  options={chainOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Price</div>
                <Dropdown
                  className={styles.dropdown}
                  value={likes}
                  setValue={setLikes}
                  options={likesOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Color</div>
                <Dropdown
                  className={styles.dropdown}
                  value={color}
                  setValue={setColor}
                  options={colorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Creator</div>
                <Dropdown
                  className={styles.dropdown}
                  value={creator}
                  setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
            </div>
            <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {bids.map((x, index) => (
                <CardSearch className={styles.card} item={x} key={index} />
              ))}
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke btn-square", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
