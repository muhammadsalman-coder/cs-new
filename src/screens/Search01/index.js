import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import {
  BiGrid,
  BiFootball,
  BiMusic,
  BiHeart,
  BiAperture,
} from "react-icons/bi";
import cn from "classnames";
import axios from "axios";
//import cn from "classnames";

import styles from "./Search01.module.sass";
import Icon from "../../components/Icon";
import CardSearch from "../../components/CardSearch";
import Dropdown from "../../components/Dropdown";
import CATEGORY_NAMES from "utils/constants/category-names";
import useFetchNftsByCategory from "utils/hooks/use-fetch-nfts-by-category";
import Spinner from "components/Spinner/Spinner";
import useFetchNftCountByCategory from "utils/hooks/use-fetch-nft-count-by-category";

//import Submitter from "utils/hooks/use-submit";
import useFetchListedNFTsByQuery from "utils/hooks/use-fetch-listed-nft-by-query";
import { PINATA_BASE_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY } from "config";

import { fetchViewAndLike } from "utils/helpers/apis/view-and-like";

const navLinks = [
  {
    text: CATEGORY_NAMES[1],
    Icon: <BiAperture size={18} />,
  },
  {
    text: CATEGORY_NAMES[2],
    Icon: <BiFootball size={18} />,
  },
  {
    text: CATEGORY_NAMES[3],
    Icon: <BiMusic size={18} />,
  },
  {
    text: CATEGORY_NAMES[4],
    Icon: <BiGrid size={18} />,
  },
  {
    text: CATEGORY_NAMES[0],
    Icon: <BiHeart size={18} />,
  },
];

const dateOptions = ["Featured", "Newest", "Oldest"];
const likesOptions = ["All NFTs", "Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const statusOptions = ["Purchase Now", "New", "Has Offers"];
const creatorOptions = ["Verified only", "All", "Most liked"];
const chainOptions = ["Binance", "Ethereum", "Polygon"];

const Search = () => {
  const { search: query } = useLocation();
  const history = useHistory();

  const activeIndex = parseInt(new URLSearchParams(query).get("index") || 0);

  const searchQuery = parseInt(new URLSearchParams(query).get("q") || "");

  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [chain, setChain] = useState(chainOptions[0]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [values, setValues] = useState([5]);

  const [filternfts, setfilternfts] = useState([]);
  const [filteringNft, setFilteringNft] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filtersNftslikes, setfiltersNftslikes] = useState([]); //for likes filtering

  const count = useFetchNftCountByCategory({
    category: navLinks[activeIndex].text,
  });
  const [nftsList, setNftsList] = useState([]);
  // console.log("shan shaikh count", count);

  // console.log("category useFetchNftCountByCategory", nfts);
  let { loading, nfts } = useFetchNftsByCategory({
    category: navLinks[activeIndex].text,
    page,
    size: 10,
  });

  useEffect(() => {
    console.log("nftsshan", nfts);

    setNftsList(nfts);
  }, [nfts, page]);
  const onLoadMoreHandler = () => {
    setPage(page + 1);
  };

  const { loading: searchLoading, nfts: searchNfts } =
    useFetchListedNFTsByQuery({
      query: search,
      searched,
      setSearched,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(true);
    history.push({
      pathname: `/marketplace`,
      search: `?q=${search}`,
    });
    //Submitter(search);
  };

  // useEffect(() => {
  //   fetchViewAndLike({
  //     tokenAddr: "0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
  //     tokenId: "23",
  //   }).then((data) => {
  //     console.log("I AM THE FETCHED DATA", data);
  //   });
  // }, []);

  const onNavClickHandler = (index) => () => {
    setIsSearching(false);

    history.push({
      pathname: `/marketplace`,
      search: `?index=${index}`,
    });
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  const filterPrice = (likesArg) => {
    if (nftsList.length > 0) {
      const userLikesArr = nftsList.map(async (value, index) => {
        const data = await fetchViewAndLike({
          tokenAddr: value.tokenAddr.toLowerCase(),
          tokenId: value.tokenId,
        });

        return data;
        // userLikesArr.push(data);
      });
      Promise.all(userLikesArr).then((responses) => {
        var filerTemp = [];
        if (likesArg === "least") {
          const ascendingSort = []
            .concat(responses)
            .sort((a, b) => (a.likes > b.likes ? 1 : -1));

          console.log("sorting", ascendingSort);
          ascendingSort.map(async (value, index) => {
            await nftsList.map((filering) => {
              if (value.tokenId === filering.tokenId) {
                filerTemp.push(filering);
              }
            });
          });
        } else if (likesArg === "most") {
          const descendingSort = []
            .concat(responses)
            .sort((a, b) => (a.likes < b.likes ? 1 : -1));

          console.log("sorting", descendingSort);
          descendingSort.map(async (value, index) => {
            await nftsList.map((filering) => {
              if (value.tokenId === filering.tokenId) {
                filerTemp.push(filering);
              }
            });
          });
        }

        setfilternfts(filerTemp);
        filerTemp = [];
        setFilterLoading(false);
        console.log("filerTemp", filerTemp);
      });
    }
  };

  useEffect(() => {
    if (likesOptions[0] == likes) {
      setFilteringNft(false);
      setFilterLoading(false);
      setfilternfts([]);
      console.log("LIKES UZAIR 1 ->", likes);
    }
    if (likesOptions[1] == likes) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterPrice("most");
      console.log("LIKES UZAIR 1 ->", likes);
    }
    if (likesOptions[2] == likes) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterPrice("least");
      console.log("LIKES UZAIR 2 ->", likes);
    }
  }, [likes, nftsList]);

  const filterDate = (dates) => {
    if (nftsList.length > 0) {
      if (dates === "newest") {
        const newestSort = []
          .concat(nftsList)
          .sort((a, b) => (a.tokenId < b.tokenId ? 1 : -1));

        setfilternfts(newestSort);
        setFilterLoading(false);
      } else if (dates === "oldest") {
        const oldestSort = []
          .concat(nftsList)
          .sort((a, b) => (a.tokenId > b.tokenId ? 1 : -1));

        setfilternfts(oldestSort);
        setFilterLoading(false);
      }
    }
  };
  useEffect(() => {
    if (dateOptions[0] == date) {
      setFilteringNft(false);
      setFilterLoading(false);
      setfilternfts([]);
    } else if (dateOptions[1] == date) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterDate("newest");
    } else if (dateOptions[2] == date) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterDate("oldest");
    }
  }, [date, dateOptions, nftsList]);
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container-fluid", styles.container)}>
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
                onClick={onNavClickHandler(index)}
                key={index}
              >
                {x.Icon}
                <span>{x.text}</span>
              </button>
            ))}
          </div>

          <form className={styles.search} action="" onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              //onChange={
              //handleInputChange
              //(e) => {
              //setSearch(e.target.value);
              // }
              //}
              name="search"
              placeholder="Search ..."
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

          {/* 
          {isSearching && searchLoading ? (
              <Spinner />
            ) : (
              <>
                <div className={styles.list}>
                  {searchNfts.map((x, index) => (
                    <CardSearch className={styles.card} item={x} key={index} />
                  ))}
                </div>

                {!searchLoading &&
                  (searchNfts.length ? (
                    !!searchNfts.length + 10 < count && (

                      <div className={styles.btns}>
                        <button
                          className={cn(
                            "button-stroke btn-square",
                            styles.button
                          )}
                          onClick={onLoadMoreHandler}
                        >
                          <span>Load more</span>
                        </button>
                      </div>
                    )
                  ) : (
                    <div className={styles.btns}>No Data</div>
                  ))}
              </>
            )} */}

          {isSearching || filteringNft ? (
            <div className={styles.wrapper}>
              {searchLoading || filterLoading ? (
                <Spinner />
              ) : (
                <>
                  <div className={styles.list}>
                    {filternfts.length > 0
                      ? filternfts.map((x, index) => (
                          <CardSearch
                            className={styles.card}
                            item={x}
                            key={index}
                          />
                        ))
                      : searchNfts.map((x, index) => (
                          <CardSearch
                            className={styles.card}
                            item={x}
                            key={index}
                          />
                        ))}
                  </div>
                  {(!searchLoading || !filterLoading) &&
                    (searchNfts.length || filternfts.length ? (
                      !!searchNfts.length + 10 < count ||
                      (filternfts.length > 0 && (
                        <div className={styles.btns}>
                          <button
                            className={cn(
                              "button-stroke btn-square",
                              styles.button
                            )}
                            onClick={onLoadMoreHandler}
                          >
                            <span>Load more</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className={styles.btns}>No Data</div>
                    ))}
                </>
              )}
            </div>
          ) : (
            <div className={styles.wrapper}>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <div className={styles.list}>
                    {nftsList.map((x, index) => (
                      <CardSearch
                        className={styles.card}
                        item={x}
                        key={index}
                      />
                    ))}
                  </div>
                  {!loading && nftsList.length ? (
                    (console.log(
                      "shan shaikh ",
                      !!nftsList.length + 10 < count
                    ),
                    !!nftsList.length + 10 < count && (
                      <div className={styles.btns}>
                        <button
                          className={cn(
                            "button-stroke btn-square",
                            styles.button
                          )}
                          onClick={onLoadMoreHandler}
                        >
                          <span>Load more</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className={styles.btns}>No Data</div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
