import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useContracts } from "utils/hooks/use-connectors";
import { artifacts } from "config";
import closedSeaNFTABI from "utils/abis/closedSeaNFT";
import Web3 from "web3";
import { Container } from "react-bootstrap";
import { MORALIS_CHAIN_IDS } from "config";
import { MORALIS_API_URI } from "config";
import CardSearch from "components/CardSearch";
import styles from "./ImportNFT.module.sass";
import Spinner from "components/Spinner/Spinner";
// import { artifacts } from "./artifacts";
// import ClosedSeaNFTABI from "./ClosedSeaNFTABI";
// import { useContracts } from "./use-connectors";
// const MORALIS_API_URI = "https://deep-index.moralis.io/api/v2/";
// const MORALIS_CHAIN_IDS = {
//   56: "0x38",
//   97: "0x61",
//   // 1-Feb
//   4: "0x4",
//   // 2-Feb
//   80001: "0x13881"
// };
const ImportNFT = () => {
  const { account, chainId } = useWeb3React();
  const [myTokens, setMyTokens] = useState([]);
  const [chain, setChain] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [nftLoading, setNftLoading] = useState(false);
  const { contracts } = useContracts();
  // console.log("contracts: ", contracts);
  console.log("chainId in ImportNFT: ", chainId);
  // console.log("REACT_APP_MORALIS_API_KEY: ", REACT_APP_MORALIS_API_KEY);

  // const {} = contracts()
  // useEffect(()=>{
  //   let contract = new
  // },[])

  const fetchTokens = useCallback(async () => {
    // const web3 = new Web3(window.ethereum);
    // let contract = new web3.eth.Contract(ClosedSeaNFTABI,"0x69536bdf4B18499181EB386B0E4019a28C4Fb096");
    // console.log("contract: ", contract)

    // const nftAddress =
    //   artifacts.closedSeaNft[
    //     chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
    //   ];
    // const nftAddress =
    try {
      if (nftAddress) {
        setNftLoading(true);
        const { data } = await axios({
          method: "get",
          url: `${MORALIS_API_URI}nft/${nftAddress}/owners?chain=${
            MORALIS_CHAIN_IDS[
              chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
            ]
          }&format=decimal`,
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
          },
        });
        console.log("data: ", data);

        let tokens = [];

        if (data.result) {
          for (let item of data.result) {
            if (
              item.owner_of &&
              account &&
              String(item.owner_of).toUpperCase() === account?.toUpperCase()
            ) {
              if (contracts.closedSeaNft) {
                const uri = await contracts.closedSeaNft.methods
                  .tokenURI(item.token_id)
                  .call();
                const result = await axios.get(uri);
                console.log("myreasultabc", result.data);
                tokens = [
                  ...tokens,
                  { ...item, metadata: result.data, token_uri: uri },
                ];
              }
            }
          }
          setMyTokens(tokens);
          setNftLoading(false);
        }
        // console.log("tokens: ", tokens);
      } else {
        console.log("enter NFT contract address");
      }
    } catch (error) {
      console.log("[fetchTokens] error => ", error);
    }
  }, [account, chainId, contracts, nftAddress]);
  // useEffect(() => {
  //   fetchTokens();
  // }, [fetchTokens]);

  // console.log("chainId: ", chainId);
  console.log("nftAddress", nftAddress);
  // console.log("chain", chain);
  console.log("myTokens: ", myTokens);
  return (
    <>
      <Container>
        <div
          style={{
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: 20 }}>Import NFT here</h4>
          <input
            value={nftAddress}
            placeholder="Enter contract address..."
            onChange={(e) => {
              setNftAddress(e.target.value);
            }}
            style={{ margin: "20px 0" }}
          />

          <button
            onClick={async () => {
              await fetchTokens();
            }}
            className={styles.submitBtn}
            style={{ margin: "20px 0" }}
          >
            Submit
          </button>
        </div>
        <div className={styles.myCollection}>
          <div className={styles.collection}>
            {nftLoading ? (
              <div className={styles.wrapperSpinner}>
                <Spinner />
              </div>
            ) : myTokens?.length > 0 ? (
              myTokens.map((v, i) => {
                v.tokenAddr = v.token_address;
                v.tokenId = v.token_id;
                return (
                  <div className={styles.nftCard_container} key={i}>
                    <CardSearch item={v} key={i} />
                  </div>
                );
              })
            ) : (
              <div className={styles.nftCard_container}>No DAta</div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default ImportNFT;
