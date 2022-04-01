import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import cn from "classnames";
import { useContracts } from "utils/hooks/use-connectors";
import { artifacts } from "config";
import closedSeaNFTABI from "utils/abis/closedSeaNFT";
import Web3 from "web3";
import { Container } from "react-bootstrap";
import { MORALIS_CHAIN_IDS } from "config";
import { MORALIS_API_URI } from "config";
import CardSearch from "./CardSearch";
import styles from "./ImportNFT.module.sass";
import Spinner from "components/Spinner/Spinner";
import erc721Abi from "../../utils/abis/erc721";
import { PINATA_BASE_URL_FREE } from "config";
import { PINATA_BASE_URL_GATEWAY } from "config";
import Button from "components/Button";
import { Tabs, Tab } from "react-bootstrap";
import { BACKEND_URL } from "config";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";
import TextInput from "components/TextInput";
import Dropdown from "components/Dropdown";
import CATEGORY_NAMES from "utils/constants/category-names";
import Loader from "components/Loader";
import { postCollectionData } from "utils/helpers/apis/save-collection-data";

// import axios from "axios";
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
  const history = useHistory();
  const { account, chainId } = useWeb3React();
  const [myTokens, setMyTokens] = useState([]);
  const [chain, setChain] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [nftLoading, setNftLoading] = useState(false);
  const { contracts } = useContracts();
  const [importNftModal, setImportNftModal] = useState(false);
  const [collectionNameInput, setCollectionNameInput] = useState("");
  const [selectCategoryNFT, setSelectCategoryNFT] = useState(CATEGORY_NAMES[0]);
  const [loadingModal, setLoadingModal] = useState(false);
  // console.log("contracts: ", contracts);
  // console.log("chainId in ImportNFT: ", chainId);
  // console.log("REACT_APP_MORALIS_API_KEY: ", REACT_APP_MORALIS_API_KEY);

  // const {} = contracts()
  // useEffect(()=>{
  //   let contract = new
  // },[])

  const fetchTokens = useCallback(async () => {
    ///@notice creating instance of entered nftAddress 11-Feb
    const web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(erc721Abi, nftAddress);
    // console.log("contract: ", contract);

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
        // console.log("data: ", data);

        let tokens = [];

        if (data.result) {
          for (let item of data.result) {
            if (
              item.owner_of &&
              account &&
              String(item.owner_of).toUpperCase() === account?.toUpperCase()
            ) {
              if (contract) {
                try {
                  var uri = await contract.methods
                    .tokenURI(item.token_id)
                    .call();
                  var result = await axios.get(uri);
                  // console.log("myreasultabc", result.data);
                  result.data.imageUrl = result?.data?.image
                    ? result.data.image
                    : result.data.imageUrl;
                  tokens = [
                    ...tokens,
                    {
                      ...item,
                      metadata: result.data,
                      token_uri: uri,
                      tokenAddr: item.token_address,
                      tokenId: item.token_id,
                      selected: false,
                      importedNFT: true,
                    },
                  ];
                } catch (err) {
                  console.log("[fetchTokensURi import NFT] error => ", err);
                }
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
      console.log("[fetchTokens  import NFT] error => ", error);
    }
  }, [account, chainId, contracts, nftAddress]);
  // useEffect(() => {
  //   fetchTokens();
  // }, [fetchTokens]);
  const [selectAll, setSelectAll] = useState(false);
  // console.log("selectAll", selectAll);
  useEffect(() => {
    if (myTokens.length > 0) {
      setMyTokens([
        ...myTokens.map((tokn) => {
          return { ...tokn, selected: selectAll };
        }),
      ]);
    }
  }, [selectAll]);

  const handleSelected = (tokenId, selectKey) => {
    // alert("working Selected", tokenId, selectKey);
    let selection = myTokens.map((selecting) =>
      selecting.tokenId === tokenId
        ? { ...selecting, selected: !selectKey }
        : selecting
    );
    setMyTokens(selection);
    // console.log("working Selected", tokenId, selectKey);
  };

  // console.log("chainId: ", chainId);
  // console.log("nftAddress", nftAddress);
  // console.log("chain", chain);
  // console.log("myTokens: ", myTokens);
  // console.log("chainId", chainId);
  // console.log("chainId", MORALIS_CHAIN_IDS[chainId]);
  const saveSelectedNft = async () => {
    if (myTokens.length > 0) {
      setLoadingModal(true);
      var tempSelectedToken = [];
      var collectionTokensArr = [];
      myTokens.map((v, i) => {
        console.log("mTokens ", v);
        if (v.selected) {
          tempSelectedToken.push(v);
          v.selectedCat = "All NFTs";
          v.ownerOf = v.owner_of;
          v.tokenAddr = v.token_address;
          v.chainId = { decimal: chainId, hexa: MORALIS_CHAIN_IDS[chainId] };
          // console.log("tempSelectedToken", v);
          // console.log("saveSelectedNft", v);
          collectionTokensArr.push({
            tokenId: Number(v.token_id),
            tokenAddress: v.token_address,
          });
        }
      });
      console.log(" saveSelectedNft2 selectedTokens", tempSelectedToken);
      console.log(" saveSelectedNft2 collectionTokensArr", collectionTokensArr);
      try {
        const res = await axios.post(`${BACKEND_URL}insert-multiple-nft`, {
          nfts: tempSelectedToken,
        });
        if (!collectionNameInput == "") {
          const collectionData = {
            name: collectionNameInput,
            owner: account,
            nftAddress: nftAddress,
            tokens: collectionTokensArr,
          };
          await postCollectionData(collectionData);
        }
        if (res.status == 200) {
          history.push(`/profile/${account}`);
        }
        setLoadingModal(false);
        // console.log("selectedTokens res", res);
        // console.log(" saveSelectedNft selectedTokens", tempSelectedToken);
      } catch (error) {
        console.log(" selectedTokens error while saving import nfts", error);
        setLoadingModal(false);
      }
    }
  };
  // console.log("collectionNameInput", collectionNameInput);
  console.log("myTokens", myTokens);

  const createImportedNFTCollection = async () => {
    if (!collectionNameInput == "") {
      const collectionData = {
        name: collectionNameInput,
        owner: account,
        nftAddress: nftAddress,
        // tokens: [],
      };
      // await postCollectionData(collectionData);
    }
  };
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
          <h4 style={{ margin: 20 }}>View your NFTs here</h4>
          <input
            value={nftAddress}
            placeholder="Enter contract address..."
            onChange={(e) => {
              setNftAddress(e.target.value);
            }}
            className={styles.contractInputs}
          />

          <Button
            className={styles.collectionBtn}
            onClick={async () => {
              await fetchTokens();
            }}
            // style={{ margin: "20px 0" }}
          >
            Submit
          </Button>

          {/* <button
            onClick={async () => {
              await fetchTokens();
            }}
            className={styles.submitBtn}
            style={{ margin: "20px 0" }}
          >
            Submit
          </button> */}
        </div>
        <div className={styles.headingTab}>
          <div className={styles.headingTab_inner}>
            <ul style={{ display: "flex" }}>
              <li>
                <input
                  type="checkbox"
                  id="selectAll"
                  name="selectAll"
                  value={selectAll}
                  onChange={() => {
                    setSelectAll(!selectAll);
                  }}
                />
                <label
                  for="selectAll"
                  style={{ paddingLeft: "5px" }}
                  className={styles.btnstyling}
                >
                  Select All
                </label>
              </li>
              <li>
                {/* <button onClick={saveSelectedNft}>Save</button> */}
                <button
                  className={styles.btnstyling}
                  onClick={() => {
                    setImportNftModal(true);
                  }}
                >
                  Save
                </button>
              </li>
            </ul>
          </div>
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
                    <CardSearch
                      item={v}
                      key={i}
                      handleSelected={handleSelected}
                    />
                  </div>
                );
              })
            ) : (
              <div className={styles.nftCard_container}>No data</div>
            )}
          </div>
        </div>
      </Container>
      <Modal
        visible={importNftModal}
        onClose={() => {
          setImportNftModal(false);
          setCollectionNameInput("");
        }}
      >
        <div className={styles.importNftModal}>
          <div className={cn("h4", styles.title)}>Import NFT</div>
          <div className={styles.details}>
            {!myTokens.length > 0 && (
              <div className={styles.text}>Import NFT First</div>
            )}
          </div>
          <div className={styles.table}>
            <div className={styles.row}>
              <TextInput
                className={styles.col}
                value={collectionNameInput}
                onChange={(e) => {
                  setCollectionNameInput(e.target.value);
                }}
                error={collectionNameInput == "" ? true : false}
                errorMsg={
                  collectionNameInput == "" ? "Enter Collection Name" : null
                }
                placeholder="Enter the Collection Name"
              />
              <div className={styles.col}>
                <Dropdown
                  options={CATEGORY_NAMES}
                  value={selectCategoryNFT}
                  setValue={setSelectCategoryNFT}
                />
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <button
              className={cn("button", styles.button, {
                [styles.disabled]: loadingModal,
              })}
              onClick={saveSelectedNft}
            >
              {loadingModal && <Loader className={styles.loader} />}
              Confirm
            </button>
            <button
              className={cn("button-stroke", styles.button, {
                [styles.disabled]: loadingModal,
              })}
              onClick={() => {
                setImportNftModal(false);
              }}
            >
              Cancel
            </button>
          </div>
          {/* <div>
            <div>
              <TextInput
                className={styles.col}
                value={collectionNameInput}
                onChange={(e) => {
                  setCollectionNameInput(e.target.value);
                }}
                placeholder="Enter the Collection Name"
              />
            </div>
          </div> */}
        </div>
      </Modal>
    </>
  );
};
export default ImportNFT;
