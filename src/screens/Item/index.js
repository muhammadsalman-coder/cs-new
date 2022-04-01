import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import cn from "classnames";
import { BiHistory, BiCollection } from "react-icons/bi";
import {
  MdDescription,
  MdRemoveRedEye,
  MdFlag,
  MdMoreVert,
} from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import { CgDetailsMore } from "react-icons/cg";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { ImEmbed } from "react-icons/im";
import { useWeb3React } from "@web3-react/core";
import styles from "./Item.module.sass";

import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import Toggle from "../../components/Toggle/Toggle";
import useTokenOwner from "utils/hooks/use-token-owner";
import useGetUser from "utils/hooks/use-get-user";
import useIsBannedNFT from "utils/hooks/use-is-banned-nft";
import { getEllips, getChainNames } from "utils/helpers/common";
import ReactSkeleton from "components/ReactSkeleton";
import WalletConnectionModal from "components/WalletConnectionModal";
import { useEagerConnect } from "utils/hooks/use-connectors";
import CONNECTOR_NAMES from "utils/constants/connectorNames";
import Spinner from "components/Spinner/Spinner";
import LazyImage from "components/LazyImage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CardSearch from "components/CardSearch";
// import useFetchNftsByCategory from "utils/hooks/use-fetch-nfts-by-category";
// import { addView, fetchViewAndLike } from "utils/helpers/apis/view-and-like";
import {
  addView,
  fetchViewAndLike,
  updateLikeInfo,
} from "utils/helpers/apis/view-and-like";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL, PINATA_BASE_URL_GATEWAY, PINATA_BASE_URL } from "config";

import { useContracts } from "utils/hooks/use-connectors";
import useFetchNftTransactionHistory from "../../utils/hooks/use-fetch-nfttransaction-history";
import Web3 from "web3";
import { PINATA_BASE_URL_FREE } from "config";
// import { fetchCollection } from "utils/helpers/apis/fetch-collection-data";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCollection } from "redux/action/apis/collections/fetchCollectionAction";

const navLinks = ["Info"];

const usersHistory = [
  {
    name: "Julie P. Graves",
    position: "Place a bid: 1.46 BNB",
    avatar: "./images/icons/icon4.png",
    reward: "./images/content/reward-1.svg",
  },
  {
    name: "Lisa E. Lyles",
    position: "Put ChainCollection Art on sale",
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

const Item = () => {
  // const collectionData = useSelector(
  //   (state) => state.collectionInfo.collection
  // );
  // const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownShow, setdropdownShow] = useState(false);
  const [viewAndLikeInfo, setViewAndLikeInfo] = useState();
  const [openWalletConnectionModal, setOpenWalletConnectionModal] =
    useState(false);
  const [selectedConnectorName, setSelectedConnectorName] = useState(
    CONNECTOR_NAMES.injected
  );

  const { address, tokenId } = useParams();
  const { tokenInfo: tInfo, reload } = useTokenOwner({
    address: address.toLowerCase(),
    tokenId,
  });
  const { transactionHistory, loadingTransactionHistory } =
    useFetchNftTransactionHistory({
      address,
      tokenId,
    });

  console.log("tInfo---ss", tInfo);
  const isBannedNft = useIsBannedNFT({
    tokenAddr: tInfo.token_address,
    tokenId: tInfo.token_id,
  });

  var metadata = tInfo.metadata ? JSON.parse(tInfo.metadata) : {};
  metadata.imageUrl = metadata?.imageUrl?.replace(
    PINATA_BASE_URL_FREE,
    PINATA_BASE_URL_GATEWAY
  );

  // const metadata = tInfo.metadata ? tInfo.metadata : {};

  const { account, chainId } = useWeb3React();

  const { user } = useGetUser({ account: tInfo.owner_of });

  const { login } = useEagerConnect(
    parseInt(localStorage.getItem("chainId")) ||
      parseInt(parseInt(process.env.REACT_APP_DEFAULT_CHAINID)),
    selectedConnectorName
  );

  const [collectionData, setCollectionData] = useState();
  const { contracts } = useContracts();
  const [nfts, setNfts] = useState([]);
  const [nftsLoading, setNftsLoading] = useState(false);
  // const getingCollection = async () => {
  //   if (tInfo?.owner_of) {
  //     const res = await axios.get(
  //       `${BACKEND_URL}my-collections?owner=${tInfo?.owner_of}`
  //     );

  //   }
  // };
  // const collectionData = fetchCollection(metadata?.name);

  useEffect(async () => {
    if (collectionData) {
      setNftsLoading(true);
      var temp = [];

      var tokensArr = collectionData.tokens;
      console.log("tokensArr-testing", tokensArr);
      // if (collectionData?.tokens.length <= 4 || !false) {
      //   // collectionData?.tokens?.forEach(async (tokens) => {

      //   //   const uri = await contracts.closedSeaNft.methods
      //   //     .tokenURI(tokens)
      //   //     .call();
      //   //   const result = await axios.get(uri);

      //   //   let tItem = { tokenId: tokens, metadata: result.data, tokenUri: uri };

      //   //   temp = [...temp, tItem];
      //   // });

      //   for (const tokens of tokensArr) {
      //     if (tokens.tokenId != tokenId) {
      //       const uri = await contracts.closedSeaNft.methods
      //         .tokenURI(tokens?.tokenId)
      //         .call();
      //       const result = await axios.get(uri);

      //       let tItem = {
      //         tokenId: tokens?.tokenId,
      //         metadata: result.data,
      //         tokenUri: uri,
      //         tokenAddr: "0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
      //       };

      //       temp = [...temp, tItem];
      //     }
      //   }
      // } else {
      if (collectionData?.tokens.length > 0) {
        tokensArr = tokensArr.slice(0, 4).map((v, i) => {
          let altersss = { id: v.tokenId, address: v.tokenAddress };
          return altersss;
        });

        const res = await axios.post(
          `${BACKEND_URL}nfts-wrt-tokenaddr-and-id`,
          {
            nftToken: tokensArr,
          }
        );
        if (res.status == 200) {
          temp = res.data;
        }

        // for (let v = 0; v < 4; v++) {
        //   let tokens = collectionData?.tokens[v];
        //   console.log("tokens123 inloops", tokens);
        //   const uri = await contracts.closedSeaNft.methods
        //     .tokenURI(tokens?.tokenId)
        //     .call();

        //   // console.log(
        //   //   "maishanshaikh2 PINATA_BASE_URL_GATEWAY",
        //   //   PINATA_BASE_URL_GATEWAY
        //   // );
        //   // console.log("maishanshaikh2 PINATA_BASE_URL", PINATA_BASE_URL);
        //   const result = await axios.get(uri);

        //   let tItem = {
        //     tokenAddr: "0xb2d4c7affa1b01fa33c82a8ac63075bd366df4b0",
        //     tokenId: tokens?.tokenId,
        //     metadata: result.data,
        //     tokenUri: uri,
        //   };

        //   temp = [...temp, tItem];
        // }
      } else {
        console.log("no nfts collectionData");
      }

      setNfts(temp);
      setNftsLoading(false);

      // const res2 = await contracts.nftController.methods
      //   .getAsksByUser(tInfo?.owner_of)
      //   .call();

      // const checkingsss = await res2.filter((element) =>
      //   collectionData.tokens.includes(element[1])
      // );

      // for (let item of res2) {
      //   let tItem = { tokenAddr: item[0], tokenId: item[1], price: item[2] };
      //   if (contracts.closedSeaNft) {
      //     const uri = await contracts.closedSeaNft.methods
      //       .tokenURI(tItem.tokenId)
      //       .call();
      //     // var uriSplit = uri.split("/");
      //     // var uriResult =
      //     //   "https://closedsea.mypinata.cloud/ipfs/" +
      //     //   uriSplit[uriSplit.length - 1];

      //     const result = await axios.get(uri);
      //     tItem = { ...tItem, metadata: result.data, tokenUri: uri };
      //     temp = [...temp, tItem];
      //   }
      // }
    }
  }, [collectionData, tInfo]);

  useEffect(async () => {
    if (tInfo.owner_of) {
      console.log("tInfotInfo", tInfo);
      const res = await axios.get(
        `${BACKEND_URL}my-collections/v2?owner=${tInfo?.owner_of?.toLowerCase()}&tokenId=${
          tInfo?.token_id
        }&tokenAddress=${tInfo?.token_address}`
      );
      console.log("rescollection", res);
      setCollectionData(res.data[0]);
    } else {
      console.log("collectionData not Find Any Colleciton");
    }
  }, [tInfo]);
  console.log("collectionData123", collectionData);
  // let { loading, nfts, reloadComp } = useFetchNftsByCategory({
  //   category: "Collectibles",
  //   page: 1,
  //   size: 4,
  // });
  // useEffect(async () => {
  //   await reloadComp();
  // }, [tokenId, address]);

  useEffect(() => {
    if (!chainId) {
      setOpenWalletConnectionModal(true);
    }
  }, [chainId]);

  useEffect(() => {
    if (tInfo?.token_address && account) {
      fetchViewAndLike({
        tokenAddr: tInfo.token_address,
        tokenId: tInfo.token_id,
      }).then((data) => {
        setViewAndLikeInfo(data);

        if (
          !data.viewedAddresses?.find((v) => v === account?.toLowerCase()) ||
          tInfo.owner_of?.toLowerCase() === account.toLowerCase()
        ) {
          addView({
            tokenAddr: tInfo.token_address,
            tokenId: tInfo.token_id,
            address: account,
            views: 1,
            // views: data.views + 1,
            likes: 0,
          });
          fetchViewAndLike({
            tokenAddr: tInfo.token_address,
            tokenId: tInfo.token_id,
          }).then((d) => {
            setViewAndLikeInfo(d);
          });
        }
      });
    }
  }, [tInfo, account]);

  const onWalletConnectHandler = (connectorName) => () => {
    setSelectedConnectorName(connectorName);
    setOpenWalletConnectionModal(false);
    login();
  };

  const onCloseHandler = () => {
    window.location.href = "/";
    setOpenWalletConnectionModal(false);
  };

  if (!chainId) {
    return (
      <div
        className={cn("section container-1300", styles.section, styles.fill)}
      >
        <Spinner />
        <WalletConnectionModal
          open={openWalletConnectionModal}
          chainId={
            localStorage.getItem("chainId") ||
            parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
          }
          onConfirm={onWalletConnectHandler}
          onClose={onCloseHandler}
          ignoreBodyScroll
        />
      </div>
    );
  }

  if (isBannedNft) {
    return (
      <div className={styles.ban}>
        This NFT has been banned due to the violation of our policy.
      </div>
    );
  }

  // const cardObj = {
  //   metadata: {
  //     imageUrl:
  //       "https://gateway.pinata.cloud/ipfs/QmTjsaz42pK751sHhRD671m1KoTdh5oyHct3NfS2dyRbsQ",
  //     name: "testing obj",
  //   },
  //   price: "1",
  // };
  return (
    <>
      <div className={cn("section container-1300", styles.section)}>
        <div className={cn(styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}></div>
              {metadata.imageUrl ? (
                <LazyImage src={metadata.imageUrl} alt="Item" />
              ) : (
                <ReactSkeleton height="300px" />
              )}
            </div>
            <Options
              className={styles.options}
              user={user}
              viewAndLikeInfo={viewAndLikeInfo}
              isOwner={
                tInfo?.owner_of?.toLowerCase() === account?.toLowerCase()
              }
              tokenAddr={tInfo.token_address}
              tokenId={tInfo.token_id}
              account={account}
              setViewAndLikeInfo={setViewAndLikeInfo}
            />
            <div className="acco">
              <Toggle isOpen={true} question="Description" Icon={MdDescription}>
                {metadata.description ? (
                  <p>{metadata.description}</p>
                ) : (
                  <ReactSkeleton
                    containerClassName={styles.fullWidth}
                    width="100%"
                    height="40px"
                  />
                )}
              </Toggle>
              <Toggle isOpen={true} question="Details" Icon={CgDetailsMore}>
                {tInfo?.token_address ? (
                  <table
                    className={cn("table", styles.tableColor)}
                    style={{ textAlign: "left" }}
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <th>Contract Address</th>
                        <td>{getEllips(tInfo.token_address || "")}</td>
                      </tr>
                      <tr>
                        <th>Token ID</th>
                        <td>{tInfo.token_id}</td>
                      </tr>
                      <tr>
                        <th>Token Standard</th>
                        <td>{tInfo.contract_type}</td>
                      </tr>
                      <tr>
                        <th>BlockChain</th>
                        <td>{getChainNames(chainId)}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <ReactSkeleton
                    containerClassName={styles.fullWidth}
                    width="100%"
                    height="100px"
                  />
                )}
              </Toggle>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.nameshare}>
              <div className={styles.share}>
                <div>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
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
                    href={`https://twitter.com/intent/tweet?text=Check out this Item on ClosedSea&url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("twitter", styles.shareItem)}
                  >
                    <FaTwitter size={20} />
                    {/* <img src={process.env.PUBLIC_URL + "/twitter.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a href="#" className={styles.shareItem}>
                    <ImEmbed size={22} />
                    {/* <img src={process.env.PUBLIC_URL + "/embed.png"} alt="" /> */}
                  </a>
                </div>
                <div>
                  <a href="#" className={cn("flag", styles.shareItem)}>
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
                          <a className={styles.dropdownItem} href="#">
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
              {tInfo.token_id ? (
                <h4 className={cn("h4 f-30", styles.title)}>
                  #{tInfo.token_id} {metadata?.name}
                </h4>
              ) : (
                <ReactSkeleton
                  width="250px"
                  containerClassName={cn("h5 f-30", styles.title)}
                />
              )}
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <div>
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
                  {collectionData && (
                    <Link
                      to={`/collection/${collectionData.name}/${collectionData.nftAddress}`}
                    >
                      {collectionData.name}
                    </Link>
                  )}
                </div>
              ))}
              <div style={{ flexGrow: 1 }} />
              <div className={cn(styles.stats)}>
                <MdRemoveRedEye size={24} style={{ marginRight: "6px" }} />
                <div className={cn(styles.statsLink)}>
                  {viewAndLikeInfo?.views || 0} Views
                </div>
              </div>
              <div className={cn(styles.stats)}>
                <AiFillHeart size={24} style={{ marginRight: "6px" }} />
                <div className={cn(styles.statsLink)}>
                  {viewAndLikeInfo?.likes || 0} Likes
                </div>
              </div>
            </div>
            <div>
              {activeIndex === 1 && (
                <Users
                  className={cn(styles.users, "mb-5")}
                  items={[user]}
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
                  items={[user]}
                  isOwner
                />
              )}
            </div>
            {/* <Users className={styles.users, "mb-5"} items={users} /> */}
            <Control
              className={styles.control}
              tokenInfo={tInfo}
              reloadTokenInfo={reload}
            />
          </div>
        </div>

        <div className={cn(styles.containerColumn)}>
          <Toggle isOpen={true} question="Trading History" Icon={BiHistory}>
            <table className={cn(styles.table)} border="1">
              <thead>
                <tr>
                  <td>Amount</td>
                  <td>Price</td>
                  <td>@From</td>
                  <td>@To</td>
                  <td>Date, Time</td>
                  <td>BlockNumber</td>
                </tr>
              </thead>
              <tbody>
                {loadingTransactionHistory ? (
                  <tr>Loading...</tr>
                ) : transactionHistory.length ? (
                  transactionHistory.map((v, i) => {
                    return (
                      <tr>
                        <td>{v?.amount}</td>
                        <td>
                          {v?.value ? Web3.utils.fromWei(v.value, "ether") : 0}{" "}
                          BNB
                        </td>
                        <td>{getEllips(v?.from_address)}</td>
                        <td>{getEllips(v?.to_address)}</td>
                        <td>{v?.block_timestamp}</td>
                        <td>{v?.block_number}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr> No Data</tr>
                )}
              </tbody>
            </table>

            {/* <table width="100%" className={cn(styles.table)} border="1">
              <thead>
                <tr>
                  <td>Price</td>
                  <td>USD Price</td>
                  <td>Expiration</td>
                  <td>@From</td>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <BidRow
                    key={bid.bidder}
                    bid={bid}
                    tokenInfo={tokenInfo}
                    reload={reloadBidInfo}
                  />
                ))}
              </tbody>
            </table> */}
            {/* No Data */}
          </Toggle>

          <Toggle
            isOpen={true}
            question="Related Collection"
            Icon={BiCollection}
            className={styles.relatedCollection_togle}
          >
            <div className={styles.collection}>
              {nftsLoading ? (
                <div className={styles.wrapperSpinner}>
                  <Spinner />
                </div>
              ) : nfts?.length > 0 ? (
                nfts.map((v, i) => {
                  return (
                    <div className={styles.nftCard_container}>
                      <CardSearch item={v} key={i} />
                    </div>
                  );
                })
              ) : (
                <div className={styles.nftCard_container}>No Data</div>
              )}

              {/* <div>
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
              </div> */}
            </div>
          </Toggle>
        </div>
      </div>
    </>
  );
};

export default Item;
