import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import {
  BiGrid,
  BiFootball,
  BiMusic,
  BiHeart,
  BiAperture,
  BiBox,
} from "react-icons/bi";
import cn from "classnames";
import axios from "axios";

// import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";

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
// new implementation using mongo db
import useFetchNftCountByCategoryMongo from "utils/newHooks/useFetchNftCountByCategoryMongo";
import useFetchNftByCategoryMongo from "utils/newHooks/useFetchNftByCategoryMongo";
import ReactPaginate from "react-paginate";
import useFetchSearchedNft from "utils/newHooks/useFetchSearchedNft";
import { BACKEND_URL } from "config";
import Web3 from "web3";
const navLinks = [
  {
    text: CATEGORY_NAMES[0],
    Icon: <BiBox size={18} />,
  },
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
  const searchQuery = new URLSearchParams(query).get("q") || "";

  // Start mongo db
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const { loadingCategoryNft, categoryNfts, totalPages } =
    useFetchNftByCategoryMongo({
      category: navLinks[activeIndex].text,
      page,
      size: 12,
      isMarketPlace: true,
    });

  useEffect(() => {
    setTotalPageCount(totalPages);
  }, [totalPages]);

  // const { categoryNftCount } = useFetchNftCountByCategoryMongo({
  //   category: navLinks[activeIndex].text,
  // });

  const handlePageClick = () => {
    setPage(page + 1);
  };

  // End mongo db

  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [chain, setChain] = useState(chainOptions[0]);

  const [search, setSearch] = useState("");
  // const [searchedNft, setSearchedNft] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [values, setValues] = useState([0, 100]);

  const [filternfts, setfilternfts] = useState([]);
  const [filternftsPage, setfilternftsPage] = useState();
  const [filteringNft, setFilteringNft] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filtersNftslikes, setfiltersNftslikes] = useState([]); //for likes filtering

  useEffect(() => {
    setPage(1);
    setFilteringNft(false);
  }, [activeIndex]);

  const filterInitialState = () => {
    setFilteringNft(false);
    setDate(dateOptions[0]);
    setLikes(likesOptions[0]);
    setColor(colorOptions[0]);
    setStatus(statusOptions[0]);
    setCreator(creatorOptions[0]);
    setChain(chainOptions[0]);
    setValues([0, 100]);
  };
  // const count = useFetchNftCountByCategory({
  //   category: navLinks[activeIndex].text,
  // });

  const { searchedLoadingNft, searchedNft, searchedNftPage } =
    useFetchSearchedNft({
      query: searchQuery,
      setSearched,
      searched,
      page,
      size: 12,
    });

  // working on Filters Start//
  useEffect(() => {
    if (values[0] != 0 || values[1] != 100) {
      setFilteringNft(true);
      setFilterLoading(true);
      let cancel;
      axios({
        method: "POST",
        url: `${BACKEND_URL}price-range-nft`,
        data: {
          startPrice: Web3.utils.toWei(values[0].toFixed(2), "ether"),
          endPrice: Web3.utils.toWei(values[1].toFixed(2), "ether"),
          size: 9,
          page,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          if (res?.data?.nft) {
            res.data.nft.sort((a, b) => (a.price > b.price ? 1 : -1));
          }

          setFilterLoading(false);
          setfilternftsPage(res.data.totalPage);
          setfilternfts(res.data.nft);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
        });
      return () => cancel();
    } else {
      setfilternftsPage();
      setFilteringNft(false);
      setFilterLoading(false);
      setfilternfts([]);
    }
  }, [values, page]);

  // working on Filters end//

  // const [nftsList, setNftsList] = useState([]);

  // let { nfts2 } = useFetchNftsByCategory({
  //   category: navLinks[activeIndex].text,
  //   page,
  //   size: 100,
  // });

  // useEffect(() => {

  //   setNftsList(nfts);
  // }, [nfts, page]);
  const onLoadMoreHandler = () => {
    // setPage(page + 1);
  };

  // const { loading: searchLoading, nfts: searchNfts } =
  //   useFetchListedNFTsByQuery({
  //     query: search,
  //     searched,
  //     setSearched,
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setFilteringNft(false);
    setSearched(true);

    if (search == "") {
      setIsSearching(false);
      history.push({
        pathname: `/marketplace`,
        search: `?index=${0}`,
      });
    } else {
      history.push({
        pathname: `/marketplace`,
        search: `?q=${search}`,
      });
    }

    //Submitter(search);
  };

  // useEffect(() => {
  //   fetchViewAndLike({
  //     tokenAddr: "0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
  //     tokenId: "23",
  //   }).then((data) => {

  //   });
  // }, []);

  const onNavClickHandler = (index) => () => {
    setIsSearching(false);

    history.push({
      pathname: `/marketplace`,
      search: `?index=${index}`,
    });
  };

  const STEP = 0.01;
  const MIN = 0;
  const MAX = 100;

  // const filterPrice = async (likesArg) => {
  //   const res = await axios.get(`${BACKEND_URL}nft-collector`);

  //   var getingAllNft = res.data;
  //   if (getingAllNft.length > 0) {
  //     const userLikesArr = getingAllNft.map(async (value, index) => {
  //       const data = await fetchViewAndLike({
  //         tokenAddr: value.tokenAddr.toLowerCase(),
  //         tokenId: value.tokenId,
  //       });

  //       return data;
  //       // userLikesArr.push(data);
  //     });
  //     Promise.all(userLikesArr).then((responses) => {
  //       var filerTemp = [];
  //       if (likesArg === "least") {
  //         const ascendingSort = []
  //           .concat(responses)
  //           .sort((a, b) => (a.likes > b.likes ? 1 : -1));

  //         ascendingSort.map(async (value, index) => {
  //           await getingAllNft.map((filering) => {
  //             if (value.tokenId === filering.tokenId) {
  //               filerTemp.push(filering);
  //             }
  //           });
  //         });
  //       } else if (likesArg === "most") {
  //         const descendingSort = []
  //           .concat(responses)
  //           .sort((a, b) => (a.likes < b.likes ? 1 : -1));

  //         descendingSort.map(async (value, index) => {
  //           await getingAllNft.map((filering) => {
  //             if (value.tokenId === filering.tokenId) {
  //               filerTemp.push(filering);
  //             }
  //           });
  //         });
  //       }
  //       console.log("filerTemp", filerTemp);
  //       setfilternfts(filerTemp);
  //       filerTemp = [];
  //       setFilterLoading(false);
  //     });
  //   }
  // };

  const filterPrice = async (likesArg) => {
    if (likesArg === "least") {
      try {
        const res = await axios.post(`${BACKEND_URL}least-liked-nft`, {
          page,
          size: 10,
        });
        if (res.status === 200) {
          setfilternfts(res.data.leastLikedNft);
          setfilternftsPage(res.data.totalPage);
        }
        console.log("res least nfts", res);
      } catch (err) {
        console.log("[least filter error marketplace]", err?.response?.data);
      }
      setFilterLoading(false);
    } else if (likesArg === "most") {
      try {
        const res = await axios.post(`${BACKEND_URL}most-liked-nft`, {
          page,
          size: 10,
        });
        if (res.status === 200) {
          setfilternfts(res.data.mostLikedNft);
          setfilternftsPage(res.data.totalPage);
        }
        console.log("res most nfts", res);
      } catch (err) {
        console.log("[least filter error marketplace]", err?.response?.data);
      }
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    if (likesOptions[0] == likes) {
      setFilteringNft(false);
      setFilterLoading(false);
      setfilternfts([]);
      setPage(1);
    }
    if (likesOptions[1] == likes) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterPrice("most");
    }
    if (likesOptions[2] == likes) {
      setFilteringNft(true);
      setFilterLoading(true);
      filterPrice("least");
    }
  }, [likes]);

  // const filterDate = (dates) => {
  //   if (nftsList.length > 0) {
  //     if (dates === "newest") {
  //       const newestSort = []
  //         .concat(nftsList)
  //         .sort((a, b) => (a.tokenId < b.tokenId ? 1 : -1));

  //       setfilternfts(newestSort);
  //       setFilterLoading(false);
  //     } else if (dates === "oldest") {
  //       const oldestSort = []
  //         .concat(nftsList)
  //         .sort((a, b) => (a.tokenId > b.tokenId ? 1 : -1));

  //       setfilternfts(oldestSort);
  //       setFilterLoading(false);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (dateOptions[0] == date) {
  //     setFilteringNft(false);
  //     setFilterLoading(false);
  //     setfilternfts([]);
  //   } else if (dateOptions[1] == date) {
  //     setFilteringNft(true);
  //     setFilterLoading(true);
  //     filterDate("newest");
  //   } else if (dateOptions[2] == date) {
  //     setFilteringNft(true);
  //     setFilterLoading(true);
  //     filterDate("oldest");
  //   }
  // }, [date, dateOptions, nftsList]);
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Range
                  values={values}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => {
                    setValues(values);
                  }}
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
                            colors: ["#ccc", "#548BF4", "#ccc"],
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
                      {/* <div
                        style={{
                          height: "16px",
                          width: "5px",
                          backgroundColor: isDragged ? "#548BF4" : "#CCC",
                        }}
                      /> */}
                    </div>
                  )}
                />
                {/* <output style={{ marginTop: "30px" }} id="output">
                  {values[0].toFixed(1)} - {values[1].toFixed(1)}
                </output> */}
              </div>
              <div className={styles.scale}>
                <div className={styles.number}>{values[0].toFixed(2)} BNB</div>
                <div className={styles.number}>{values[1].toFixed(2)} BNB</div>
              </div>

              {/* <Range
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
              /> */}
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
            <div className={styles.reset} onClick={filterInitialState}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>

          {/* {loadingCategoryNft ? (
            <Spinner />
          ) : ( */}

          {filteringNft ? (
            <div style={{ width: "100%" }}>
              <div className={styles.list}>
                {filterLoading ? (
                  <Spinner />
                ) : filternfts?.length ? (
                  filternfts.map((x, index) => (
                    <CardSearch className={styles.card} item={x} key={index} />
                  ))
                ) : (
                  <p style={{ textAlign: "center", width: "100%" }}>
                    Nft Not Found
                  </p>
                )}
              </div>
              <div className={styles.btns}>
                {filternfts?.length ? (
                  <ReactPaginate
                    className={cn({ [styles.hiddenBtn]: filterLoading })}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(e) => {
                      setPage(e.selected + 1);
                    }}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={filternftsPage}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                ) : null}
              </div>
            </div>
          ) : isSearching ? (
            <div style={{ width: "100%" }}>
              <div className={styles.list}>
                {searchedLoadingNft ? (
                  <Spinner />
                ) : searchedNft?.length ? (
                  searchedNft.map((x, index) => (
                    <CardSearch className={styles.card} item={x} key={index} />
                  ))
                ) : (
                  <p style={{ textAlign: "center", width: "100%" }}>
                    Nft Not Found
                  </p>
                )}
              </div>
              <div className={styles.btns}>
                {searchedNft?.length ? (
                  <ReactPaginate
                    className={cn({ [styles.hiddenBtn]: searchedLoadingNft })}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(e) => {
                      setPage(e.selected + 1);
                    }}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={searchedNftPage}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <div className={styles.list}>
                {loadingCategoryNft ? (
                  <Spinner />
                ) : categoryNfts?.length ? (
                  categoryNfts.map((x, index) => (
                    <CardSearch className={styles.card} item={x} key={index} />
                  ))
                ) : (
                  <p style={{ textAlign: "center", width: "100%" }}>
                    Nft Not Found in This Category
                  </p>
                )}
              </div>
              <div className={styles.btns}>
                {categoryNfts?.length ? (
                  <ReactPaginate
                    className={cn({ [styles.hiddenBtn]: loadingCategoryNft })}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(e) => {
                      setPage(e.selected + 1);
                    }}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* )} */}
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
          {/* here our previous code start */}
          {/* {isSearching || filteringNft ? (
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
          )} */}
          {/* here our previous code end */}
          {/* here our New code Start Manage with MongoDb */}
          {/* code.... */}
          {/* here our New code End Manage with MongoDb */}
        </div>
      </div>
    </div>
  );
};

export default Search;
