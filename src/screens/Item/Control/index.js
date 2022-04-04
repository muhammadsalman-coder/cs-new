import React, { useMemo, useState, useCallback } from "react";
import cn from "classnames";
import { BiPurchaseTag, BiDice6, BiLineChart, BiListUl } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import Web3 from "web3";

import styles from "./Control.module.sass";
import Checkout from "./Checkout";
// import ConfirmObject from "./Confirm";
import Bid from "components/ConnectBid";
import Accept from "./Accept";
import PutSale from "./PutSale";
import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Toggle from "components/Toggle/Toggle";
import Modal from "components/Modal";
import Button from "components/Button";
import useNftsListedByUser from "utils/hooks/use-nfts-listed-by-user";
import Unlist from "./Unlist";
import UpdateBid from "./UpdateBid";
import CancelBid from "./CancelBid";
import CancelBidAlert from "./CancelBidAlert";
import useEthPrice from "utils/hooks/use-eth-price";
import { useWeb3React } from "@web3-react/core";
import ReactSkeleton from "components/ReactSkeleton";
import {
  convertNumber,
  convertNumberToCurrencyFormat,
  getEllips,
} from "utils/helpers/common";
import useGetUser from "utils/hooks/use-get-user";
import useGetBids from "utils/hooks/use-get-bids";
import useSeaTokenPrice from "utils/hooks/use-sea-token-price";

// import React, { useCallback, useState } from "react";
// import cn from "classnames";

import styles2 from "./Confirm/Confirm.module.sass";
import { useContracts } from "utils/hooks/use-connectors";
// import { useWeb3React } from "@web3-react/core";
// import useSeaTokenPrice from "utils/hooks/use-sea-token-price";
import useSeaApprove from "utils/hooks/use-sea-approve";
import useEthBalance from "utils/hooks/use-eth-balance";
import useSeaBalance from "utils/hooks/use-sea-balance";
import { useSelector } from "react-redux";
// import { useMemo } from "react/cjs/react.development";
// import Button from "components/Button";
// import Web3 from "web3";

const Confirm = ({ className, tokenInfo = {}, listedInfo = {}, onConfirm }) => {
  const { contracts } = useContracts();
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const seaTokenPrice = useSeaTokenPrice();
  const { approved, onApprove } = useSeaApprove();
  const ethBalance = useEthBalance();
  const seaBalance = useSeaBalance();
  // console.log("on Confirm component ->");
  // console.log("onConfirm className Propes ->", className);
  // console.log("onConfirm tokenInfo propes->", tokenInfo);
  // console.log("onConfirm listedInfo props ->", listedInfo);
  // console.log("onConfirm onConfirm props ->", listedInfo);
  const hasSuffientBalance = useMemo(() => {
    if (listedInfo.withEther) {
      // return true;
      return (
        parseFloat(ethBalance) >=
        parseFloat(Web3.utils.fromWei(listedInfo.price, "ether"))
      );
    } else {
      return (
        parseFloat(seaBalance) >=
        parseFloat(Web3.utils.fromWei(listedInfo.price, "ether"))
      );
    }
  }, [ethBalance, listedInfo, seaBalance]);

  const onPurchaseHandler = useCallback(async () => {
    // console.log("onPurchaseHandler method call =", account);
    try {
      if (account) {
        // account && contracts.nftcontroller
        console.log("in with ether condition--=", contracts.nftController);
        if (listedInfo.withEther) {
          setLoading(true);
          const { transactionHash } = await contracts.nftController.methods
            .buyToken(tokenInfo.token_address, tokenInfo.token_id)
            .send({ from: account, value: listedInfo.price, gas: 400000   });
          onConfirm(transactionHash);
        } else {
          if (seaTokenPrice > 0) {
            setLoading(true);
            const { transactionHash } = await contracts.nftController.methods
              .buyToken(tokenInfo.token_address, tokenInfo.token_id)
              .send({ from: account,gas: 400000   });
            onConfirm(transactionHash);
          }
        }
      } else {
        // onError();
      }
    } catch (error) {
      console.log("[buyNFT] error => ", error);
      // onError(error);
      setLoading(false);
    }
  }, [account, contracts, listedInfo, tokenInfo, seaTokenPrice, onConfirm]);

  const onApproveHandler = async () => {
    setLoading(true);
    await onApprove();
    setLoading(false);
  };
  // console.log("Checking Loading state => ", loading);
  // console.log("Checking hasSuffientBalance method => ", hasSuffientBalance);
  return (
    <div className={cn(className, styles2.checkout)}>
      <div className={cn("h4", styles2.title)}>Purchase</div>
      <div className={styles2.line}>
        {!listedInfo.withEther && !approved ? (
          <button
            onClick={onApproveHandler}
            className={cn("button btn-square", styles2.button, {
              [styles2.disabled]: loading,
            })}
          >
            {loading ? "Approving..." : "Approve"}
          </button>
        ) : (
          <div className={styles2.purchase}>
            {!hasSuffientBalance && (
              <span>You have insuffient funds to purchase this NFT.</span>
            )}
            <Button
              onClick={onPurchaseHandler}
              disabled={loading || !hasSuffientBalance}
              className={cn("button btn-square", styles2.button, {
                [styles2.disabled]: loading,
              })}
            >
              {loading ? "Purchasing..." : "Purchase"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
// Confirm component End

// control component start

// import { useSelector } from "react-redux";
const Control = ({ className, tokenInfo = {}, reloadTokenInfo }) => {
  // console.log("call Control and working");
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalPurchaseInner, setVisibleModalPurchaseInner] = useState({
    firstScreen: false,
    secondScreen: false,
    thirdScreen: false,
  });

  const [visibleCancelBidAlert, setVisibleCancelBidAlert] = useState(null);

  const {
    userNfts,
    reload,
    loading: loadingUserNfts,
  } = useNftsListedByUser({ account: tokenInfo.owner_of });
  const { account } = useWeb3React();
  const { user } = useGetUser({ account: tokenInfo.owner_of });
  const { bids, reload: reloadBidInfo } = useGetBids({
    tokenAddr: tokenInfo.token_address,
    tokenId: tokenInfo.token_id,
  });
  const ethPrice = useEthPrice();
  const seaPrice = useSeaTokenPrice();

  const listedInfo = useMemo(() => {
    return userNfts.find(
      (nft) =>
        parseInt(nft.tokenId) === parseInt(tokenInfo.token_id) &&
        String(nft.tokenAddr).toUpperCase() ===
          String(tokenInfo.token_address).toUpperCase()
    );
  }, [userNfts, tokenInfo]);

  const isMyToken = useMemo(() => {
    return (
      String(tokenInfo.owner_of).toUpperCase() === String(account).toUpperCase()
    );
  }, [account, tokenInfo]);

  const haveBid = useMemo(() => {
    return !!bids.find(
      (bid) => String(bid.bidder).toUpperCase() === account?.toUpperCase()
    );
  }, [bids, account]);

  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const testing = () => {
    setVisibleModalBid(false);
  };

  const [visibleModalSale, setVisibleModalSale] = useState(false);
  const [visibleModalUnsale, setVisibleModalUnsale] = useState(false);
  const [buyTxHash, setBuyTxHash] = useState();

  const onUnsellHandler = () => {
    setVisibleModalUnsale(true);
  };

  const onSellHandler = () => {
    setVisibleModalSale(true);
  };

  const onConfirmHandler = () => {
    reload();
    setVisibleModalSale(false);
    setVisibleModalUnsale(false);
  };

  const onPurchaseHandler = () => {
    if (haveBid) {
      setVisibleCancelBidAlert({ isForPurchase: true });
      return;
    }
    setVisibleModalPurchase(true);
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: true,
    });
  };

  const onBidHandler = () => {
    if (haveBid) {
      setVisibleCancelBidAlert({ isForPurchase: false });
      return;
    }
    setVisibleModalBid(true);
  };

  const onBidModalCloseHandler = () => {
    setVisibleModalBid(false);
  };

  const onPurchaseModalCloseHandler = () => {
    setVisibleModalPurchase(false);
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: false,
      secondScreen: false,
      thirdScreen: false,
    });
  };

  const onConfirmPurchasingHandler = () => {
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: false,
      secondScreen: true,
      thirdScreen: false,
    });
  };

  const onPurchasedHandler = (txHash) => {
    // console.log("txHash onPurchasedHandler", txHash);
    setBuyTxHash(txHash);
    reload();
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: false,
      secondScreen: false,
      thirdScreen: true,
    });
  };

  const onBuySuccessModalCloseHandler = () => {
    reloadTokenInfo();
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: false,
      secondScreen: false,
      thirdScreen: false,
    });
  };

  const onPurchaseInnerCloseHandler = () => {
    setVisibleModalPurchaseInner({
      ...visibleModalPurchaseInner,
      firstScreen: false,
      secondScreen: false,
      thirdScreen: false,
    });
  };

  const onBidSuccessHandler = () => {
    setVisibleModalBid(false);
    reload();
  };

  const priceInUSD = useMemo(() => {
    if (listedInfo) {
      // console.log("listeed info shan ", listedInfo);
      return convertNumberToCurrencyFormat(
        Number(
          Web3.utils.fromWei(listedInfo.price, "ether") *
            (listedInfo.withEther ? ethPrice : seaPrice)
        )
      );
    }
    return 0;
  }, [listedInfo, ethPrice, seaPrice]);

  if (!tokenInfo || loadingUserNfts) {
    return <ReactSkeleton height="480px" style={{ marginTop: "16px" }} />;
  }

  return (
    <>
      {isMyToken ? (
        <div className={cn(styles.control, className)}>
          {!!listedInfo ? (
            <>
              <div className={styles.info}>Current Price</div>
              <div className={styles.head}>
                <div className={styles.avatar}>
                  <img
                    src={
                      listedInfo.withEther
                        ? "./Binance.png"
                        : "https://s2.coinmarketcap.com/static/img/coins/64x64/13716.png"
                    }
                    alt="Avatar"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.cost}>
                    <div className={styles.price}>
                      {convertNumber(
                        Number(Web3.utils.fromWei(listedInfo.price, "ether"))
                      )}
                      {listedInfo.withEther ? "BNB" : "SEA"}
                    </div>
                    <div className={styles.price}>({priceInUSD})</div>
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <Button
                  className={cn("btn-square", styles.button, styles.sellButton)}
                  onClick={onUnsellHandler}
                >
                  Cancel Listing
                </Button>
              </div>
            </>
          ) : (
            <Button
              className={cn("btn-square", styles.button, styles.sellButton)}
              onClick={onSellHandler}
            >
              Sell
            </Button>
          )}
        </div>
      ) : (
        <div className={cn(styles.control, className)}>
          <div className={styles.info}>Current Price</div>
          <div className={styles.head}>
            <div className={styles.avatar}>
              {listedInfo && (
                <img
                  src={
                    listedInfo.withEther
                      ? "./bsc.png"
                      : "https://s2.coinmarketcap.com/static/img/coins/64x64/13716.png"
                  }
                  alt="Avatar"
                />
              )}
            </div>
            <div className={styles.details}>
              <div className={styles.cost}>
                {!!listedInfo && (
                  <div className={styles.price}>
                    {convertNumber(
                      Web3.utils.fromWei(listedInfo.price, "ether")
                    )}{" "}
                    {listedInfo.withEther ? "BNB" : "SEA"}
                  </div>
                )}
                {listedInfo && (
                  <div className={styles.price}>({priceInUSD})</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <Button
              className={cn("btn-square", styles.button)}
              disabled={!listedInfo}
              onClick={onPurchaseHandler}
            >
              <BiPurchaseTag size={28} />
              Purchase now
            </Button>
            <Button
              variant="stroke"
              className={cn("btn-square", styles.button)}
              disabled={!listedInfo}
              onClick={onBidHandler}
            >
              <BiDice6 size={28} />
              Place a bid
            </Button>
          </div>
        </div>
      )}
      <div className={cn(styles.container)}>
        <Toggle isOpen={true} question="Price History" Icon={BiLineChart}>
          {/* <table className={cn(styles.table)} border="1">
            <thead>
              <tr>
                <td>Price</td>
                <td>USD Price</td>
                <td>Expiration</td>
                <td>@By</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0.1 BNB</td>
                <td>$49.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
              <tr>
                <td>0.01 BNB</td>
                <td>$29.23</td>
                <td> - </td>
                <td>Julia P.Grave</td>
              </tr>
            </tbody>
          </table> */}
          No Data
        </Toggle>

        <Toggle isOpen={true} question="Listings" Icon={BiListUl}>
          <table className={cn(styles.table)} border="1">
            <thead>
              <tr>
                <td>Price</td>
                <td>USD Price</td>
                <td>Expiration</td>
                <td>@From</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {listedInfo
                    ? Web3.utils.fromWei(listedInfo.price, "ether")
                    : 0}{" "}
                  {listedInfo?.withEther ? "BNB" : "SEA"}
                </td>
                <td>{priceInUSD}</td>
                <td> - </td>
                <td>{user?.userName || getEllips(tokenInfo.owner_of)}</td>
              </tr>
            </tbody>
          </table>
        </Toggle>

        <Toggle isOpen={true} question="Bids" Icon={MdLocalOffer}>
          <table width="100%" className={cn(styles.table)} border="1">
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
          </table>
        </Toggle>
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={onPurchaseModalCloseHandler}
      >
        {visibleModalPurchaseInner.firstScreen && (
          <Checkout
            tokenInfo={tokenInfo}
            listedInfo={listedInfo}
            onConfirm={onConfirmPurchasingHandler}
            onClose={() => {
              onPurchaseInnerCloseHandler();
              setVisibleModalPurchase(false);
            }}
          />
        )}

        {visibleModalPurchaseInner.secondScreen && (
          <Confirm
            listedInfo={listedInfo}
            tokenInfo={tokenInfo}
            onConfirm={onPurchasedHandler}
            onClose={onPurchaseInnerCloseHandler}
          />
        )}
        {visibleModalPurchaseInner.thirdScreen && (
          <SuccessfullyPurchased buyTxHash={buyTxHash} />
        )}
      </Modal>
      <Modal
        visible={visibleModalPurchaseInner.thirdScreen}
        onClose={onBuySuccessModalCloseHandler}
      >
        <SuccessfullyPurchased buyTxHash={buyTxHash} />
      </Modal>
      <Modal visible={visibleModalBid} onClose={onBidModalCloseHandler}>
        <Bid
          setVisibleModalBid={testing}
          visibleModalBid={visibleModalBid}
          tokenInfo={tokenInfo}
          onConfirm={onBidSuccessHandler}
        />
      </Modal>
      <Modal
        visible={visibleModalSale}
        onClose={() => setVisibleModalSale(false)}
      >
        <PutSale
          tokenId={tokenInfo.token_id}
          tokenAddress={tokenInfo.token_address}
          onConfirm={onConfirmHandler}
          onClose={() => setVisibleModalSale(false)}
        />
      </Modal>
      <Modal
        visible={visibleModalUnsale}
        onClose={() => setVisibleModalUnsale(false)}
      >
        <Unlist
          tokenId={tokenInfo.token_id}
          tokenAddress={tokenInfo.token_address}
          onConfirm={onConfirmHandler}
          onClose={() => setVisibleModalUnsale(false)}
        />
      </Modal>
      <Modal
        visible={visibleCancelBidAlert}
        onClose={() => setVisibleCancelBidAlert(null)}
      >
        <CancelBidAlert isForPurchase={visibleCancelBidAlert?.isForPurchase} />
      </Modal>
    </>
  );
};

const BidRow = ({ bid, tokenInfo, reload }) => {
  const [openUpdateBidModal, setOpenUpdateBidModal] = useState(false);
  const [openCancelBidModal, setOpenCancelBidModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const ethPrice = useEthPrice();
  const seaPrice = useSeaTokenPrice();
  const { user } = useGetUser({ account: bid.bidder });
  const { account } = useWeb3React();

  const currency = bid.withEther ? "BNB" : "SEA";

  const bidPriceInUSD = bid.withEther
    ? parseFloat(Web3.utils.fromWei(bid.price, "ether")) * ethPrice
    : parseFloat(Web3.utils.fromWei(bid.price, "ether")) * seaPrice;

  const onBidUpdateHandler = async () => {
    setOpenUpdateBidModal(true);
  };

  const onUpdatedBidHandler = () => {
    setOpenUpdateBidModal(false);
    reload();
  };

  const onBidCancelHandler = () => {
    setOpenCancelBidModal(true);
  };

  const onCanceledBidHandler = () => {
    setOpenCancelBidModal(false);
    reload();
  };

  const onAcceptBidHandler = () => {
    setOpenAcceptModal(true);
  };

  const onAcceptConfirmHandler = () => {
    setOpenAcceptModal(false);
    reload();
  };

  return (
    <>
      <tr key={bid.bidder}>
        <td>
          {Web3.utils.fromWei(bid.price, "ether")} {currency}
        </td>
        <td>{convertNumberToCurrencyFormat(bidPriceInUSD || 0)}</td>
        <td> - </td>
        <td className={styles.flex}>
          {user.userName || getEllips(bid.bidder)}
          {account?.toLowerCase() === bid.bidder.toLowerCase() ? (
            <div className={styles.bidButtons}>
              <Button
                className={styles.bidRowButton}
                onClick={onBidUpdateHandler}
              >
                Update
              </Button>
              <Button
                variant="stroke"
                className={styles.bidRowButton}
                onClick={onBidCancelHandler}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className={styles.bidButtons}>
              <Button
                className={styles.bidRowButton}
                onClick={onAcceptBidHandler}
              >
                Accept
              </Button>
            </div>
          )}
        </td>
      </tr>
      <Modal
        visible={openUpdateBidModal}
        onClose={() => setOpenUpdateBidModal(false)}
      >
        <UpdateBid
          bid={bid}
          tokenInfo={tokenInfo}
          onConfirm={onUpdatedBidHandler}
          onClose={() => setOpenUpdateBidModal(false)}
        />
      </Modal>
      <Modal
        visible={openCancelBidModal}
        onClose={() => setOpenCancelBidModal(false)}
      >
        <CancelBid
          bid={bid}
          tokenInfo={tokenInfo}
          onConfirm={onCanceledBidHandler}
          onClose={() => setOpenCancelBidModal(false)}
        />
      </Modal>
      <Modal
        visible={openAcceptModal}
        onClose={() => setOpenAcceptModal(false)}
      >
        <Accept
          bid={bid}
          tokenInfo={tokenInfo}
          onConfirm={onAcceptConfirmHandler}
          onClose={() => setOpenAcceptModal(false)}
        />
      </Modal>
    </>
  );
};

export default Control;
