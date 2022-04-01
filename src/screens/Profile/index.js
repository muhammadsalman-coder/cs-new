import React, { useRef, useMemo, useState, useEffect } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { BiGrid, BiCollection, BiHeart } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { GiShadowFollower } from "react-icons/gi";
import { useHistory } from "react-router";

import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Loader from "components/Loader";
import Followers from "./Followers";
import useGetUser from "utils/hooks/use-get-user";
import { bids } from "../../mocks/profile";
import useFetchMyTokens from "utils/hooks/use-fetch-my-tokens";
import uploadFileToS3 from "utils/helpers/apis/s3-upload-file";
import { IMAGE_TYPES } from "utils/constants/file-types";
import { postUserData, putUserData } from "utils/helpers/apis/save-user-data";
import useNftsListedByUser from "utils/hooks/use-nfts-listed-by-user";
import UPLOAD_CATEGORIES from "utils/constants/upload-categories";
import Collectibles from "./Collectibles";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useContracts } from "../../utils/hooks/use-connectors";
import useFetchMyTokensByMongo from "utils/hooks/use-fetch-my-tokens-bymongo";
const navLinks = [
  {
    text: "On Sale",
    Icon: <BiGrid size={18} />,
  },
  {
    text: "Collectibles",
    Icon: <BiCollection size={18} />,
  },
  {
    text: "Created",
    Icon: <BiHeart size={18} />,
  },
  {
    text: "Likes",
    Icon: <AiOutlineLike size={18} />,
  },
  {
    text: "Following",
    Icon: <RiUserFollowLine size={18} />,
  },
  {
    text: "Followers",
    Icon: <GiShadowFollower size={18} />,
  },
];

// const following = [
//   {
//     name: "Sally Fadel",
//     counter: "161 followers",
//     avatar: "./images/icons/icon49.png",
//     // url: "",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Aniya Harber",
//     counter: "161 followers",
//     avatar: "./images/icons/icon54.png",
//     // url: "",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Edwardo Bea",
//     counter: "161 followers",
//     avatar: "./images/icons/icon53.png",
//     // url: "",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Reymundo",
//     counter: "161 followers",
//     avatar: "./images/icons/icon52.png",
//     // url: "",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Jeanette",
//     counter: "161 followers",
//     avatar: "./images/icons/icon51.png",
//     // url: "",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
// ];

// const followers = [
//   {
//     name: "Sally Fadel",
//     counter: "161 followers",
//     avatar: "./images/icons/icon48.png",
//     // url: "",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Aniya Harber",
//     counter: "161 followers",
//     avatar: "./images/icons/icon47.png",
//     // url: "",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Edwardo Bea",
//     counter: "161 followers",
//     avatar: "./images/icons/icon46.png",
//     // url: "",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Reymundo",
//     counter: "161 followers",
//     avatar: "./images/icons/icon45.png",
//     // url: "",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
//   {
//     name: "Jeanette",
//     counter: "161 followers",
//     avatar: "./images/icons/icon44.png",
//     // url: "",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "./images/content/pic1.png",
//       "./images/content/pic2.png",
//       "./images/content/pic3.png",
//       "./images/content/pic4.png",
//     ],
//   },
// ];

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

const Profile = () => {
  const { contracts } = useContracts();
  const { chainId } = useWeb3React();

  const [activeIndex, setActiveIndex] = useState(0);
  const [myProfileCollectibleLoading, setMyProfileCollectibleLoading] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [background, setBackground] = useState("");
  const [loadingBackgroundSave, setLoadingBackgroundSave] = useState(false);
  const userBackgroundFile = useRef(null);
  const { account } = useWeb3React();
  const [_collectibles, set_collectibles] = useState([]);
  const [myLikesCollection, setMyLikesCollection] = useState([]);
  const [myNftLoading, setMyNftLoading] = useState(false);
  //const { user, reload } = useGetUser({ account });
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followTabsLoading, setFollowTabsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState({ msg: "", error: false });

  var { address } = useParams();
  const history = useHistory();

  const { user, reload } = useGetUser({ account: address });
  const { collectibles: mycollectibles, loadingCollectibles } = Collectibles(
    user.userName
  );
  useEffect(() => {
    set_collectibles([]);
  }, [address, user]);

  //for profile changing
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   if (count > 0) {
  //     if (account?.toLowerCase() != address?.toLowerCase()) {
  //       history.push(`/profile/${account}`);
  //     }
  //   }
  //   setCount(count + 1);
  // }, [account]);
  //end

  useEffect(async () => {
    if (activeIndex === 4) {
      setFollowTabsLoading(true);
      try {
        const res = await axios.post(`${BACKEND_URL}get-following`, {
          userAddress: address.toLowerCase(),
        });
        if (res.status == 200) {
          setFollowings(res.data.followings);
        }
      } catch (err) {
        if (err?.response?.status == 400) {
          setFollowings([]);
          setErrMessage({ msg: err.response.data.msg, error: true });
        }
      }
      setFollowTabsLoading(false);
    }
    if (activeIndex === 5) {
      setFollowTabsLoading(true);
      const res = await axios.post(`${BACKEND_URL}get-followers`, {
        userAddress: address.toLowerCase(),
      });
      if (res.status == 200) {
        setFollowers(res.data.followers);
      }

      setFollowTabsLoading(false);
    }
  }, [activeIndex, address, account, user, history]);

  const getingLikedNft = async () => {
    setMyNftLoading(true);
    const res = await axios.get(`${BACKEND_URL}views_and_likes`);

    // let likedNft = [];
    let myLikedNft = new Array();

    res?.data.forEach((element) => {
      if (element?.likedAccounts.length > 0) {
        element?.likedAccounts.forEach(async (elem) => {
          if (elem?.toLowerCase() == user?.address?.toLowerCase()) {
            try {
              let res = await axios.post(`${BACKEND_URL}single-nft`, {
                tokenId: element.tokenId,
                tokenAddr: element.tokenAddr,
              });

              let nftData = res.data.metadata;

              myLikedNft.push({
                description: nftData.description,
                image: nftData.imageUrl,
                title: nftData.name,
                url: `/asset/${element.tokenAddr}/${element.tokenId}`,
              });
              // const uri = await contracts?.closedSeaNft?.methods
              //   .tokenURI(element.tokenId)
              //   .call();
              // const res = await axios.get(uri);
            } catch (err) {
              console.log("element?.likedAccounts [err]", err);
            }
            // likedNft.push(element);
          }
        });
      }
    });

    setMyLikesCollection(myLikedNft);
    setTimeout(() => {
      setMyNftLoading(false);
    }, 2000);
  };
  useEffect(() => {
    getingLikedNft();
  }, [user, activeIndex]);

  const onSaveHandler = async () => {
    if (account) {
      if (userBackgroundFile.current.files[0]) {
        // console.log(
        //   "event---onsavehandler userBackgroundFile.current.files[0]",
        //   userBackgroundFile.current.files[0]
        // );
        setLoadingBackgroundSave(true);
        const result = await uploadFileToS3(
          userBackgroundFile.current.files[0],
          UPLOAD_CATEGORIES.PROFILE_BACKGROUND
        );

        if (result.isSuccess) {
          let isSuccess = false;
          if (!!user.address) {
            isSuccess = await putUserData({
              address: account,
              background: result.data.location,
            });
          } else {
            isSuccess = await postUserData({
              address: account,
              background: result.data.location,
            });
          }
          if (isSuccess) {
            setBackground("");
            await reload();
          }
        }
        setLoadingBackgroundSave(false);
      }
    }
    setVisible(false);
  };

  // const { loading: loadingMyTokens, myTokens } = useFetchMyTokens(
  //   address?.toLowerCase()
  // );
  const { loading: loadingMyTokens, myTokens } = useFetchMyTokensByMongo(
    address?.toLowerCase()
  );

  const { userNfts } = useNftsListedByUser({ account: address });

  // const collectibles = useMemo(() => {
  //   setMyProfileCollectibleLoading(true);
  //   return convertTokens(myTokens);
  // }, [myTokens]);

  const [mongoCollectible, setMongoCollectible] = useState([]);
  const gettingCollectiblesFromMongoDb = async (chainId, owner) => {
    let res = await axios.post(`${BACKEND_URL}external-nft`, {
      chainId,
      owner,
    });
    if (res.status == 200) {
      res?.data?.map((v, i) => {
        v.title = v?.metadata?.name;
        v.description = v?.metadata?.description;
        v.image = v?.metadata?.imageUrl;
        v.url = `/asset/${v?.tokenAddr}/${v?.tokenId}`;
      });
      setMongoCollectible(res.data);
    }
  };
  useEffect(() => {
    gettingCollectiblesFromMongoDb(chainId, address.toLowerCase());
  }, [myTokens, activeIndex, address, chainId]);

  // useEffect(() => {
  //   // set_collectibles(..._collectibles, mycollectibles);
  //   _collectibles.push(mycollectibles);
  // }, [mycollectibles]);
  useEffect(() => {
    // set_collectibles([...mycollectibles, ...collectibles]);

    set_collectibles([...myTokens, ...mongoCollectible]);
    setMyProfileCollectibleLoading(false);
    // let arr = [];
    // arr.push(mycollectibles);
    // arr.push(_collectibles);
    // set_collectibles(arr);
    // _collectibles.push(collectibles);
  }, [activeIndex, myTokens, address, mongoCollectible]);

  const onSales = useMemo(() => {
    var nftResult = [];

    // let result = userNfts.filter((nft) => {
    //   let token = myTokens.find(
    //     (t) =>
    //       String(t.tokenAddr).toUpperCase() ==
    //         String(nft.tokenAddr).toUpperCase() && t.tokenId == nft.tokenId
    //   );

    myTokens.filter((v, i) => {
      if (v?.isOnSell) {
        nftResult.push({
          title: v?.metadata?.name,
          image: v?.metadata?.imageUrl,
          url: `/asset/${v?.tokenAddr}/${v?.tokenId}`,
          description: v?.metadata?.description,
        });
      }
    });

    // if (token) {
    //   nftResult.push({
    //     title: token?.metadata?.name,
    //     image: token?.metadata?.imageUrl,
    //     url: `/asset/${token?.tokenAddr}/${token?.tokenId}`,
    //     description: token?.metadata?.description,
    //   });
    // }
    // });

    return nftResult;
  }, [myTokens, userNfts]);

  const onBackgroundChangeHandler = (event) => {
    if (IMAGE_TYPES.includes(event.target.files[0]?.type)) {
      if (event.target.files.length != 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackground(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };
  const goToEditProfile = () => {
    history.push("/profile-edit");
  };

  return (
    <div className={styles.profile}>
      <div className={cn(styles.head, { [styles.active]: visible })}>
        {user.background ? (
          <img src={user.background} alt="user background" />
        ) : (
          !!background && <img src={background} alt="user background" />
        )}

        {account && account == address ? (
          <div
            className={cn("container center-1200", styles.container, {
              [styles.relativePos]: !visible,
            })}
          >
            <div className={styles.btns}>
              <button
                className={cn("button btn-square button-small", styles.button)}
                onClick={() => setVisible(true)}
              >
                <span>Edit cover photo</span>
                <Icon name="edit" size="16" />
              </button>
              <button
                className={cn("button btn-square button-small", styles.button)}
                onClick={goToEditProfile}
              >
                <span>Edit profile</span>
                <Icon name="image" size="16" />
              </button>
            </div>
            <div className={styles.file}>
              <input
                type="file"
                ref={userBackgroundFile}
                onChange={onBackgroundChangeHandler}
              />
              <div className={styles.wrap}>
                <Icon name="upload-file" size="48" />
                <div className={styles.info}>Drag and drop your photo here</div>
                <div className={styles.text}>or click to browse</div>
              </div>
              <button
                className={cn("button-small", styles.button, styles.cancelBtn, {
                  [styles.disabled]: loadingBackgroundSave,
                })}
                onClick={() => {
                  setVisible(false);
                }}
              >
                cancel
              </button>
              <button
                className={cn("button-small", styles.button, {
                  [styles.disabled]: loadingBackgroundSave,
                })}
                onClick={onSaveHandler}
              >
                {loadingBackgroundSave && <Loader className={styles.loader} />}
                Save photo
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.body}>
        <div className={cn("container-fluid", styles.container)}>
          <User className={styles.user} user={user} />
          <div className={styles.wrapper}>
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
                  {/* <x.Icon size={16} /> */}
                  {/* <Icon name="edit" size="16" /> */}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items
                    class={styles.items}
                    items={onSales}
                    loading={loadingMyTokens}
                  />
                )}
                {activeIndex === 1 && (
                  <Items
                    class={styles.items}
                    items={_collectibles}
                    loading={loadingMyTokens}
                  />
                )}
                {activeIndex === 2 && <Items class={styles.items} items={[]} />}
                {activeIndex === 3 && (
                  <Items
                    class={styles.items}
                    items={myLikesCollection}
                    loading={myNftLoading}
                  />
                )}
                {activeIndex === 4 && (
                  <Followers
                    className={styles.followers}
                    items={followings}
                    loading={followTabsLoading}
                    errMessage={errMessage}
                  />
                )}
                {activeIndex === 5 && (
                  <Followers
                    className={styles.followers}
                    items={followers}
                    loading={followTabsLoading}
                    errMessage={errMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
