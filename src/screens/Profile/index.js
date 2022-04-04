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

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "./images/icons/icon49.png",
    // url: "",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "./images/icons/icon54.png",
    // url: "",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "./images/icons/icon53.png",
    // url: "",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "./images/icons/icon52.png",
    // url: "",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "./images/icons/icon51.png",
    // url: "",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "./images/icons/icon48.png",
    // url: "",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "./images/icons/icon47.png",
    // url: "",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "./images/icons/icon46.png",
    // url: "",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "./images/icons/icon45.png",
    // url: "",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "./images/icons/icon44.png",
    // url: "",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "./images/content/pic1.png",
      "./images/content/pic2.png",
      "./images/content/pic3.png",
      "./images/content/pic4.png",
    ],
  },
];

const convertTokens = (tokens) => {
  return tokens.map((token) => {
    return {
      title: token.metadata?.name || "",
      image: token.metadata?.imageUrl || "",
      url: `/asset/${token.token_address}/${token.token_id}`,
      description: token.metadata?.description || "",
    };
  });
};

const Profile = () => {
  const { contracts } = useContracts();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [background, setBackground] = useState("");
  const [loadingBackgroundSave, setLoadingBackgroundSave] = useState(true);
  const userBackgroundFile = useRef(null);
  const { account } = useWeb3React();
  const [_collectibles, set_collectibles] = useState([]);
  const [myLikesCollection, setMyLikesCollection] = useState([]);
  const [myNftLoading, setMyNftLoading] = useState(false);
  //const { user, reload } = useGetUser({ account });
  let { address } = useParams();
  const history = useHistory();

  const { user, reload } = useGetUser({ account: address });

  const { collectibles: mycollectibles, loadingCollectibles } = Collectibles(
    user.userName
  );
  // console.log("my collectibles ->", mycollectibles);

  const getingLikedNft = async () => {
    setMyNftLoading(true);
    const res = await axios.get(`${BACKEND_URL}views_and_likes`);
    // console.log("resshan", res);
    // let likedNft = [];
    let myLikedNft = [];

    res?.data.forEach((element) => {
      // console.log("xshan", element);
      if (element?.likedAccounts.length > 0) {
        element?.likedAccounts.forEach(async (elem) => {
          if (elem.toLowerCase() == user?.address) {
            const uri = await contracts.closedSeaNft.methods
              .tokenURI(element.tokenId)
              .call();
            const res = await axios.get(uri);
            myLikedNft.push({
              description: res.data.description,
              image: res.data.imageUrl,
              title: res.data.name,
              url: `/asset/${element.tokenAddr}/${element.tokenId}`,
            });

            // likedNft.push(element);
            // console.log("elem", elem);
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
  }, [user]);
  // console.log("myLikesCollection", myLikesCollection);
  const onSaveHandler = async () => {
    if (account) {
      if (userBackgroundFile.current.files[0]) {
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

  const { loading: loadingMyTokens, myTokens } = useFetchMyTokens(address.toLowerCase());

  const { userNfts } = useNftsListedByUser({ account: address });

  const collectibles = useMemo(() => {
    return convertTokens(myTokens);
  }, [myTokens]);

  // useEffect(() => {
  //   // set_collectibles(..._collectibles, mycollectibles);
  //   _collectibles.push(mycollectibles);
  // }, [mycollectibles]);
  useEffect(() => {
    set_collectibles([...mycollectibles, ...collectibles]);
    // let arr = [];
    // arr.push(mycollectibles);
    // arr.push(_collectibles);
    // set_collectibles(arr);
    // _collectibles.push(collectibles);

    getingLikedNft();
  }, [activeIndex]);
  // console.log("collectibles----------->", _collectibles);

  const onSales = useMemo(() => {
    let result = userNfts.map((nft) => {
      const token = myTokens.find(
        (t) =>
          String(t.token_address).toUpperCase() ===
            String(nft.tokenAddr).toUpperCase() && t.token_id === nft.tokenId
      );
      return {
        title: token?.metadata?.name || "",
        image: token?.metadata?.imageUrl || "",
        url: `/asset/${nft.tokenAddr}/${nft.tokenId}`,
        description: token?.metadata?.description || "",
      };
    });
    return result;
  }, [myTokens, userNfts]);

  const onBackgroundChangeHandler = (event) => {
    if (IMAGE_TYPES.includes(event.target.files[0].type)) {
      if (event.target.files.length !== 0) {
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
                {activeIndex === 1 && _collectibles.length > 0 && (
                  <Items
                    class={styles.items}
                    items={_collectibles}
                    loading={loadingCollectibles}
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
                  <Followers className={styles.followers} items={following} />
                )}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
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
