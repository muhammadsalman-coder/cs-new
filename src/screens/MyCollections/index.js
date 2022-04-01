import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { useWeb3React } from "@web3-react/core";

import Button from "components/Button";
import CollectionCard from "./CollectionCard";
import styles from "./MyCollections.module.sass";
import WalletConnection from "components/WalletConnection";
// import { fetchMyCollectionData } from "utils/helpers/apis/fetch-collection-data";
import { fetchingCollectionData } from "redux/action/apis/collections/fetchCollectionDataActions";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineStatusOnline } from "react-icons/hi";
const MyCollections = () => {
  const dispatch = useDispatch();
  const [moreOpen, setMoreOpen] = useState(false);
  // const [myCollection, setMyCollections] = useState([]);

  const { account } = useWeb3React();

  // call, dispatch redux function
  const myCollections = useSelector((state) => state.collection.myCollection);
  // console.log("redux geting collection by shan myCollection123", myCollections);
  // console.log(" myCollections by shan myCollections", myCollections);

  const onCreateCollectionHandler = () => {
    setMoreOpen(true);
  };
  useEffect(() => {
    if (account) {
      dispatch(fetchingCollectionData(account));
      // fetchMyCollectionData({ address: account }).then((data) => {
      //   setMyCollections(data);
      // });
    }
  }, [account]);

  const onDeletedCollectionHandler = () => {
    if (account) {
      dispatch(fetchingCollectionData(account));
      // fetchMyCollectionData({ address: account }).then((data) => {
      //   setMyCollections(data);
      // });
    }
  };

  if (!account) {
    return <WalletConnection />;
  }

  return (
    <div className={styles.root}>
      <h2 className={cn("h2", styles.bottomMargin)}>My Collections</h2>
      <div className={styles.subtitle}>
        Create, manage collections of unique NFTs to share and sell.
      </div>
      <div className={cn(styles.flex, styles.bottomMargin)}>
        <OutsideClickHandler onOutsideClick={() => setMoreOpen(false)}>
          <Button
            className={styles.collectionBtn}
            onClick={onCreateCollectionHandler}
          >
            Create a Collection
            {moreOpen && (
              <div className={styles.dropdown}>
                <Link to={"/create-collection"} className={styles.menuItem}>
                  Create new collection <HiOutlineStatusOnline />
                </Link>
                <Link to={"/import-collection"} className={styles.menuItem}>
                  Import an existing smart contract
                </Link>
              </div>
            )}
          </Button>
        </OutsideClickHandler>
      </div>
      <div className={styles.collections}>
        {myCollections.map((collection, index) => {
          // console.log(
          //   "render my collection map function collection card shan log"
          // );
          return (
            <CollectionCard
              key={`${collection.name}-${index}`}
              collection={collection}
              deletedCollection={onDeletedCollectionHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyCollections;
