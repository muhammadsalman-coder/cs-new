import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router";
import cn from "classnames";

import styles from "./Content.module.sass";
import CardHero from "./CardHero/CardHero";
import useListedNFTsByPage from "utils/hooks/use-listed-nfts-by-page";
import axios from "axios";
const Content = () => {
  const history = useHistory();
  const [list, setlist] = useState([]);
  // const [checking, setChecking] = useState(true);
  // const getingList = JSON.parse(localStorage.getItem("list"));

  // const { lists } = useListedNFTsByPage({ page: 0, size: 10 });
  // useEffect(() => {
  //   setTimeout(() => {
  //     setChecking(false);
  //   }, 8000);

  //   if (lists == undefined || lists.length == 0) {
  //     if (getingList) {
  //       setlist(getingList);
  //     }
  //   }
  // }, [checking]);
  console.log("sssshan list", list);
  useEffect(async () => {
    const res = await axios.get(
      "https://closedsea262.herokuapp.com/feature-nft"
    );
    if (res.status == 200) {
      setlist(res.data);
    }
    console.log("sssshan response", res.data);
  }, []);

  const imageList = useMemo(() => {
    const div = parseInt(list?.length / 3);

    let result = [];
    let sub1 = { images: [], avatars: [], info: [] };
    let sub2 = { images: [], avatars: [], info: [] };
    let sub3 = { images: [], avatars: [], info: [] };
    for (let i = 0; i < div + 2; i++) {
      const index = i * 3;
      // console.log("index", index, "list[index] shan hsaikh ->", list[index]);
      if (list[index]) {
        sub1 = {
          info: [
            ...sub1.info,
            {
              tokenAddr: list[index]?.tokenAddr,
              tokenId: list[index]?.tokenId,
              price: list[index]?.price,
              image: list[index]?.metadata?.imageUrl,
            },
          ],
        };
      }
      if (list[index + 1]) {
        sub2 = {
          info: [
            ...sub2.info,
            {
              tokenAddr: list[index + 1]?.tokenAddr,
              tokenId: list[index + 1]?.tokenId,
              price: list[index + 1]?.price,
              image: list[index + 1]?.metadata?.imageUrl,
            },
          ],
        };
      }
      if (list[index + 2]) {
        sub3 = {
          info: [
            ...sub3.info,
            {
              tokenAddr: list[index + 2]?.tokenAddr,
              tokenId: list[index + 2]?.tokenId,
              price: list[index + 2]?.price,
              image: list[index + 2]?.metadata?.imageUrl,
            },
          ],
        };
      }
    }
    result = [sub1, sub2, sub3];

    return result;
  }, [list]);

  const onItemClickHandler = (info) => (currentIndex) => {
    const item = info[currentIndex];
    if (item) {
      history.push(`asset/${item.tokenAddr}/${item.tokenId}`);
    }
  };

  return (
    <div className={styles.section}>
      <div className={cn("container-fluid", styles.container)}>
        <div className={styles.content}>
          {imageList.map((item) => {
            const random = Math.random() * 100000000;
            console.log("checkingitem", item.info);
            return (
              <div key={random} className={styles.content__container}>
                <CardHero
                  info={item.info}
                  onClick={onItemClickHandler(item.info)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
