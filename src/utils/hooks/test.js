useEffect(async () => {
  console.log("closedSeaNft useEffect outer");
  if (contracts.nftController) {
    for (let i = 89; i < 150; i++) {
      const result = await contracts.closedSeaNft.methods
        .tokenURI(String(i))
        .call();

      try {
        const res = await axios.get(
          result.replace(
            "https://gateway.pinata.cloud",
            " https://closedsea.mypinata.cloud"
          )
        );
        res.data.imageUrl = res?.data?.imageUrl
          ? res.data.imageUrl.replace(
              "https://gateway.pinata.cloud",
              "https://closedsea.mypinata.cloud"
            )
          : res.data.imageUrl;

        if (res.status == 200) {
          var pinataObj = {
            tokenAddr: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
            tokenId: String(i),
            tokenUri: result.replace(
              "https://gateway.pinata.cloud",
              " https://closedsea.mypinata.cloud"
            ),
            metadata: res.data,
            status: "pending",
            isOnSell: "false",
          };
          try {
            const resM = await axios.post(
              `${BACKEND_URL}nft-collector`,
              pinataObj
            );
            console.log("SAve Mongos", resM);
          } catch (err) {
            console.log("error in mongos", err.response, "----i---", i);
          }

          console.log("pinataObj ready to go", pinataObj);
        }
      } catch (err) {
        console.log("error", err.response, "----i---", i);
      }
    }
  }
}, [activeIndex, contracts]);
