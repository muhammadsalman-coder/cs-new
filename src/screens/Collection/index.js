import React, { useRef, useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router";
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
import { MORALIS_API_URI, MORALIS_CHAIN_IDS, REACT_APP_MORALIS_API_KEY } from 'config';
import axios from 'axios';
import erc721Abi from "utils/abis/erc721";
import { connectContract } from "utils/helpers/connectors";



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

const Collection = () => {
  // useSelector
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collectionInfo.collection);
  const [tokens, setTokens] = useState([]);
  const [isCalled, setIsCalled] = useState(false);
  console.log('got collection', collection)
  // console.log(
  //   "collection info Comment by Muhammad salman collectionInfo=>",
  //   collection
  // );
  const [visible, setVisible] = useState(false);
  // const [collection, setCollection] = useState(); // muhammad salman geting collection using redux
  const [loading, setLoading] = useState(false);
  const { name, nftAddress } = useParams();
  const [loadingTokens, setIsLoading] = useState(true)
  // console.log("name collection name", name);
  const fetchCollectionTokens = async () => {
        let tokens = [];
        console.log('tokens', collection.tokens)
        for(let token of collection.tokens) {
          const url = `${MORALIS_API_URI}nft/${account}/${token}?chain=${
            MORALIS_CHAIN_IDS[
              chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
            ]
          }&format=decimal`
          console.log('querying', url, process.env.REACT_APP_MORALIS_API_KEY)
          const { data } = await axios({
            method: 'get', 
            url: `${MORALIS_API_URI}nft/${nftAddress}/${token}?chain=${
              MORALIS_CHAIN_IDS[
                chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
              ]
            }&format=decimal`,
            headers: {
              accept: "application/json",
              "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
            },
          })
          console.log('got data', data)
          if (data.token_uri) {
            const contract = await connectContract(nftAddress, erc721Abi);
            const uri = await contract.methods.tokenURI(data.token_id).call();
            const result = await axios.get(uri);
            tokens = [
              ...tokens,
              { ...data, metadata: result.data, token_uri: uri },
            ];
          }
        }
        setTokens(tokens)
        setIsCalled(true)
        setIsLoading(false)
  }
  const history = useHistory();

  const { account, chainId } = useWeb3React();
  const account2 = "0x5aa030ab4ae40a8d1304590bf11089e0d98b8f52";
  const { hasItem, isOwner } = useMemo(() => {
    const hasItem = !!tokens.find(
      (t) => t.owner_of?.toLowerCase() === account2?.toLowerCase()
    );
    const isOwner =
      collection?.owner?.toLowerCase() === account2?.toLowerCase();
    return { hasItem, isOwner };
  }, [account2, collection, tokens]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCollection(name));
    if(collection.tokens.length > 0)
      fetchCollectionTokens()
    if (collection) {
      setLoading(false);
    }
    // fetchCollection(name).then((data) => {
    //   // salman comment
    //   setLoading(false);
    //   setCollection(data);
    // });
  }, [name]);

  const collectibles = useMemo(() => {
    return convertTokens(tokens);
  }, [tokens]);

  if (loading) {
    return <Spinner />;
  }

  const onEditHandler = () => {
    history.push({
      pathname: `/edit-collection/${name}`,
    });
  };

  const onAddItemHandler = () => {
    history.push({
      pathname: "/mint",
      state: { collection: name },
    });
  };

  return (
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
    </div>
  );
};

export default Collection;
