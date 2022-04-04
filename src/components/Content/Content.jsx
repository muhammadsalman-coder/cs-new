import React, { useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import cn from "classnames";

import styles from "./Content.module.sass";
import CardHero from "./CardHero/CardHero";
import useListedNFTsByPage from "utils/hooks/use-listed-nfts-by-page";
import { useState } from "react/cjs/react.development";

const Content = () => {
  const history = useHistory();
  const { list, outNft } = useListedNFTsByPage({ page: 1, size: 10 });
  // const [imageList, setimageList2] = useState([]);

  console.log("shan shaikh our NFT----> ", outNft);
  // const imageList2 = useMemo(async () => {
  //   let result = [];
  //   if (outNft) {
  //     // let sub1 = { images: outNft[0]?.metadata.imageUrl, avatars: outNft[], info: {} };
  //     // let sub2 = { images: outNft[1]?.metadata.imageUrl, avatars: outNft[], info: outNft[] };
  //     // let sub3 = { images: outNft[2]?.metadata.imageUrl, avatars: outNft[], info: outNft[] };

  //     return [
  //       {
  //         images: [],
  //         avatars: [],
  //         info: [
  //           {
  //             tokenAddr: outNft[0]?.tokenAddr,
  //             tokenId: outNft[0]?.tokenId,
  //             image: outNft[0]?.metadata?.imageUrl,
  //           },
  //         ],
  //       },
  //       {
  //         images: [],
  //         avatars: [],
  //         info: [
  //           {
  //             tokenAddr: outNft[1]?.tokenAddr,
  //             tokenId: outNft[1]?.tokenId,
  //             image: outNft[1]?.metadata?.imageUrl,
  //           },
  //         ],
  //       },
  //       {
  //         images: [],
  //         avatars: [],
  //         info: [
  //           {
  //             tokenAddr: outNft[2]?.tokenAddr,
  //             tokenId: outNft[2]?.tokenId,
  //             image: outNft[2]?.metadata?.imageUrl,
  //           },
  //         ],
  //       },
  //     ];
  //     //   let sub1 = {
  //     //     images: [],
  //     //     avatars: [],
  //     //     info: [
  //     //       {
  //     //         tokenAddr: outNft[0]?.tokenAddr,
  //     //         tokenId: outNft[0]?.tokenId,
  //     //         image: outNft[0]?.metadata?.imageUrl,
  //     //       },
  //     //     ],
  //     //   };
  //     //   let sub2 = {
  //     //     images: [],
  //     //     avatars: [],
  //     //     info: [
  //     //       {
  //     //         tokenAddr: outNft[1]?.tokenAddr,
  //     //         tokenId: outNft[1]?.tokenId,
  //     //         image: outNft[1]?.metadata?.imageUrl,
  //     //       },
  //     //     ],
  //     //   };
  //     //   let sub3 = {
  //     //     images: [],
  //     //     avatars: [],
  //     //     info: [
  //     //       {
  //     //         tokenAddr: outNft[2]?.tokenAddr,
  //     //         tokenId: outNft[2]?.tokenId,
  //     //         image: outNft[2]?.metadata?.imageUrl,
  //     //       },
  //     //     ],
  //     //   };

  //     //   result = [(sub1, sub2, sub3)];
  //   }

  //   // return result;
  // }, [outNft]);

  // useEffect(async () => {
  //   const resmine = await imageList2;
  //   setimageList2(resmine);
  //   console.log("imageList2imageList2----->", resmine);
  // }, [outNft]);

  const imageList = useMemo(() => {
    const div = parseInt(list.length / 3);
    let result = [];
    let sub1 = { images: [], avatars: [], info: [] };
    let sub2 = { images: [], avatars: [], info: [] };
    let sub3 = { images: [], avatars: [], info: [] };
    for (let i = 0; i < div + 2; i++) {
      const index = i * 3;
      if (list[index]) {
        sub1 = {
          info: [
            ...sub1.info,
            {
              tokenAddr: list[index]?.tokenAddr,
              tokenId: list[index]?.tokenId,
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
          {imageList.length > 0 &&
            imageList.map((item) => {
              const random = Math.random() * 100000000;

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
