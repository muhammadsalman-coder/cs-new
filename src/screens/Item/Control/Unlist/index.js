import { useState } from "react";
import axios from "axios";
import cn from "classnames";
import { useWeb3React } from "@web3-react/core";

import styles from "./Unlist.module.sass";
import { useContracts } from "utils/hooks/use-connectors";
import Loader from "components/Loader";
import { BACKEND_URL } from "config";
import { toast } from "react-toastify";

const Unlist = ({
  className = "",
  tokenId,
  tokenAddress,
  onClose,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);
  const { web3, contracts } = useContracts();
  const { account } = useWeb3React();

  const onUnlistHandler = async () => {
    if (contracts.nftController) {
      try {
        setLoading(true);
        const { transactionHash } = await contracts.nftController.methods
          .cancelSellToken(tokenAddress, tokenId)
          .send({ from: account });
        const resTrans = await web3.eth.getTransactionReceipt(transactionHash);

        if (resTrans) {
          const res = await axios.post(`${BACKEND_URL}nft-collector`, {
            tokenAddr: tokenAddress,
            tokenId,
            isOnSell: false,
          });

          if (res.status == 200) {
            toast.success(res?.data?.message ? res.data.message : "updated");
          }
        }
        setTimeout(async () => {
          setLoading(false);
          onConfirm();
        }, 3000);
      } catch (err) {
        console.log("onUnlistHandler", err);
      }
    }
  };

  return (
    <div className={cn(className, styles.root)}>
      <div className={cn("h4", styles.title)}>Cancel Listing</div>
      <div className={styles.line}>
        Are you sure you want to cancel listing your NFT?
      </div>
      <button
        className={cn("button", styles.button, { [styles.disabled]: loading })}
        onClick={onUnlistHandler}
      >
        {loading && <Loader className={styles.loader} />}
        Confirm
      </button>
      <button
        className={cn("button button-stroke", styles.button, {
          [styles.disabled]: loading,
        })}
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default Unlist;
