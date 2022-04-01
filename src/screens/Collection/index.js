import React, { useRef, useMemo, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import cn from "classnames";
import { useWeb3React } from "@web3-react/core";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

import styles from "./Collection.module.sass";
import Items from "./Items";
import useGetUser from "utils/hooks/use-get-user";
import useFetchCollectionTokens from "utils/hooks/use-fetch-collection-tokens";
// import { fetchCollection } from "utils/helpers/apis/fetch-collection-data";
import Spinner from "components/Spinner/Spinner";
import LazyImage from "components/LazyImage";
import Button from "components/Button";
import { fetchCollection } from "../../redux/action/apis/collections/fetchCollectionAction";
import { useSelector, useDispatch } from "react-redux";
import { useContracts } from "../../utils/hooks/use-connectors";

//search 1 import
import { Range, getTrackBackground } from "react-range";
import {
  BiGrid,
  BiFootball,
  BiMusic,
  BiHeart,
  BiAperture,
} from "react-icons/bi";

// import styles from "./Search01.module.sass";
import Icon from "../../components/Icon";
import CardSearch from "../../components/CardSearch";
import Dropdown from "../../components/Dropdown";
import CATEGORY_NAMES from "utils/constants/category-names";
import useFetchNftsByCategory from "utils/hooks/use-fetch-nfts-by-category";
// import Spinner from "components/Spinner/Spinner";
import useFetchNftCountByCategory from "utils/hooks/use-fetch-nft-count-by-category";
import useSearchAny from "utils/newHooks/useSearchAny";
import Web3 from "web3";

//import Submitter from "utils/hooks/use-submit";
// import useFetchListedNFTsByQuery from "utils/hooks/use-fetch-listed-nft-by-query";
// import { PINATA_BASE_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY } from "config";

// import { fetchViewAndLike } from "utils/helpers/apis/view-and-like";
const navLinks = [
  {
    text: CATEGORY_NAMES[1],
    Icon: <BiAperture size={18} />,
  },
  {
    text: "Activity",
    Icon: <BiFootball size={18} />,
  },
  // {
  //   text: CATEGORY_NAMES[3],
  //   Icon: <BiMusic size={18} />,
  // },
  // {
  //   text: CATEGORY_NAMES[4],
  //   Icon: <BiGrid size={18} />,
  // },
  // {
  //   text: CATEGORY_NAMES[0],
  //   Icon: <BiHeart size={18} />,
  // },
];

const dateOptions = ["Featured", "Newest", "Oldest"];
const likesOptions = ["All NFTs", "Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const statusOptions = ["Purchase Now", "New", "Has Offers"];
const creatorOptions = ["Verified only", "All", "Most liked"];
const chainOptions = ["Binance", "Ethereum", "Polygon"];

const Collection = () => {
  // useSelector
  const { contracts } = useContracts();

  const dispatch = useDispatch();
  const history = useHistory();
  const { account } = useWeb3React();
  const collection = useSelector((state) => state.collectionInfo.collection);
  const [loading, setLoading] = useState(false);
  const { name, nftAddress } = useParams();
  const [visible, setVisible] = useState(false);

  // import from serach 1 start
  const { search: query } = useLocation();

  const activeIndex = parseInt(new URLSearchParams(query).get("index") || 0);

  const searchQuery = new URLSearchParams(query).get("q") || "";

  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [chain, setChain] = useState(chainOptions[0]);
  // const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [values, setValues] = useState([5]);

  // const [filternfts, setfilternfts] = useState([]);
  // const [filteringNft, setFilteringNft] = useState(false);
  // const [filterLoading, setFilterLoading] = useState(false);
  // const [filtersNftslikes, setfiltersNftslikes] = useState([]); //for likes filtering

  const onNavClickHandler = (index) => () => {
    setIsSearching(false);

    history.push({
      pathname: `/collection/${name}/${nftAddress}`,
      search: `?index=${index}`,
    });
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(true);
    history.push({
      pathname: `/collection/${name}/${nftAddress}`,
      search: `?q=${search}`,
    });
    //Submitter(search);
  };
  // import from serach 1 end
  // useEffect(async () => {
  //   if (contracts.nftController) {
  //     const tokenRes = await contracts.nftController.methods.getAsks().call();
  //     console.log("tokenRes", tokenRes);
  //   }
  // }, [contracts]);

  // console.log(
  //   "collection info Comment by Muhammad salman collectionInfo=>",
  //   collection
  // );
  // const [collection, setCollection] = useState(); // muhammad salman geting collection using redux
  // console.log("name collection name", name);
  const { loading: loadingTokens, tokens } = useFetchCollectionTokens({
    name,
    nftAddress,
  });

  const { searchedNFT, searchLoading } = useSearchAny({
    isSearching,
    tokens,
    searchQuery,
    setSearched,
  });
  console.log(
    "----------fetchCollection reload call tokens tokens",
    searchedNFT
  );

  const { hasItem, isOwner } = useMemo(() => {
    const hasItem = !!tokens.find(
      (t) => t.owner_of?.toLowerCase() === account?.toLowerCase()
    );
    const isOwner = collection?.owner?.toLowerCase() === account?.toLowerCase();
    return { hasItem, isOwner };
  }, [account, collection, tokens]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCollection(name));
    // console.log("fetched ", collection);
    if (collection) {
      setLoading(false);
    }
    // fetchCollection(name).then((data) => {
    //   // salman comment
    //   setLoading(false);
    //   setCollection(data);
    // });
  }, [name, nftAddress, account]);

  // const convertTokens = (tokens) => {
  //   return tokens.map((token) => {
  //     return {
  //       title: token.metadata?.name || "",
  //       image: token.metadata?.imageUrl || "",
  //       url: `/asset/${token.token_address}/${token.token_id}`,
  //       description: token.metadata?.description || "",
  //     };
  //   });
  // };

  // const collectibles = useMemo(() => {
  //   console.log("tokenstokens", tokens);
  //   return convertTokens(tokens);
  // }, [tokens]);

  if (loading) {
    return <Spinner />;
  }

  const onEditHandler = () => {
    history.push({
      pathname: `/edit-collection/${name}/true`,
    });
  };

  const onAddItemHandler = () => {
    history.push({
      pathname: "/mint",
      state: { collection: name },
    });
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        {/* collection code  start */}
        <div className={styles.root}>
          <div className={cn(styles.head, { [styles.active]: visible })}>
            {isOwner ? (
              <div className={styles.editOptions}>
                <Button
                  className={cn("button", styles.rightMargin, styles.btnOption)}
                  onClick={onEditHandler}
                >
                  <AiOutlineEdit /> Edit
                </Button>
                <Button
                  className={cn("button", styles.rightMargin, styles.btnOption)}
                  onClick={onAddItemHandler}
                >
                  <AiOutlinePlus /> Add Item
                </Button>
              </div>
            ) : (
              hasItem && (
                <div className={styles.editOptions}>
                  <Button
                    className={cn(
                      "button",
                      styles.rightMargin,
                      styles.btnOption
                    )}
                    onClick={onAddItemHandler}
                  >
                    <AiOutlinePlus /> Add Item
                  </Button>
                </div>
              )
            )}
            {!!collection?.background && (
              <LazyImage src={collection.background} />
            )}
          </div>
          <div className={styles.avatar}>
            {!!collection?.avatar && <LazyImage src={collection.avatar} />}
          </div>
          <h2 className={cn("h2", styles.topMargin)}>{collection?.name}</h2>
          <div className={styles.noItemBoxContainer}>
            <div className={styles.noItemBox}>
              {tokens?.length > 0 ? (
                <div className={styles.length}>
                  <h5>{tokens.length}</h5>
                  <p>Items</p>
                </div>
              ) : null}
            </div>
            <div className={styles.noItemBox}>
              <div className={styles.length}>
                <h5>--</h5>
                <p>Owners</p>
              </div>
            </div>
            <div className={styles.noItemBox}>
              <div className={styles.length}>
                <h5>--</h5>
                <p>Floor Price </p>
              </div>
            </div>
            <div className={styles.noItemBox}>
              <div className={styles.length}>
                <h5>--</h5>
                <p>Volume Traded</p>
              </div>
            </div>
          </div>
          <span className={cn(styles.topMargin, styles.descroption)}>
            {collection?.description}
          </span>
        </div>
        {/* collection code  end */}
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
              {/* <div className={styles.range}>
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
              </div> */}
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
            {isSearching ? (
              <Items
                class={styles.items}
                items={searchedNFT}
                loading={searched}
              />
            ) : (
              <Items
                class={styles.items}
                items={tokens}
                loading={loadingTokens}
              />
            )}
          </div>
        </div>
      </div>
      {/*  
    <div className={styles.root}>
      <div className={cn(styles.head, { [styles.active]: visible })}>
        {isOwner ? (
          <div className={styles.editOptions}>
            <Button
              className={cn("button", styles.rightMargin, styles.btnOption)}
              onClick={onEditHandler}
            >
              <AiOutlineEdit /> Edit
            </Button>
            <Button
              className={cn("button", styles.rightMargin, styles.btnOption)}
              onClick={onAddItemHandler}
            >
              <AiOutlinePlus /> Add Item
            </Button>
          </div>
        ) : (
          hasItem && (
            <div className={styles.editOptions}>
              <Button
                className={cn("button", styles.rightMargin, styles.btnOption)}
                onClick={onAddItemHandler}
              >
                <AiOutlinePlus /> Add Item
              </Button>
            </div>
          )
        )}
        {!!collection?.background && <LazyImage src={collection.background} />}
      </div>
      <div className={styles.avatar}>
        {!!collection?.avatar && <LazyImage src={collection.avatar} />}
      </div>
      <h2 className={cn("h2", styles.topMargin)}>{collection?.name}</h2>
      <span className={styles.topMargin}>{collection?.description}</span>
      <Items
        class={styles.items}
        items={collectibles}
        loading={loadingTokens}
      />
    </div> */}
    </>
  );
};

export default Collection;
