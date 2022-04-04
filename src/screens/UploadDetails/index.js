import React, { useState } from "react";
import cn from "classnames";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import Web3 from "web3";
import { useFormik } from "formik";
import * as yup from "yup";

import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import FolowSteps from "./FolowSteps";
import "./style.css";
import { useContracts } from "utils/hooks/use-connectors";
import uploadMedia from 'utils/helpers/apis/pinata-upload-media';
import uploadJson from "utils/helpers/apis/pinata-upload-json";
import useSeaBalance from "utils/hooks/use-sea-balance";
import { BLOCK_EXPLORER_URLS } from "utils/helpers/connectors";
import FILE_TYPES, {
  VIDEO_TYPES,
  AUDIO_TYPES,
  IMAGE_TYPES,
} from "utils/constants/file-types";

const validationSchema = yup.object({
  name: yup
    .string("Enter name")
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  description: yup
    .string("Enter description")
    .min(8, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

const Upload = () => {
  const [sale, setSale] = useState(false);
  const [selectedfile, setSelectedfile] = useState(null);
  const [mediaFile, setMediaFile] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  // const [royalties, setRoyalties] = useState(royaltiesOptions[0]);
  // const [locking, setLocking] = useState(false);
  // const [selecteditem, setSelectedItem] = useState(0);
  // const [size, setSize] = useState();
  // const [propertie, setPropertie] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      externalLink: "",
      price: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const fileHash = await uploadMedia(selectedfile);
      const metadata = {
        imageUrl: `https://gateway.pinata.cloud/ipfs/${fileHash}`,
        name: values.name,
        description: values.description,
        externalLink: values.externalLink,
      };

      if (!fileHash) {
        // error
        console.log("aj : ****** file upload error");
        setLoading(false);
        toast("File Upload Error", { type: "error" });
        return;
      }

      const json = {
        pinataMetadata: {
          name: `metadata-${values.name}`,
          keyvalues: {
            createdBy: account,
          },
        },
        pinataContent: metadata,
      };

      const jsonHash = await uploadJson(json);
      if (!jsonHash) {
        console.log("aj : ****** metadata upload error");
        setLoading(false);
        toast("Metadata Upload Error", { type: "error" });
      }

      if (!jsonHash) {
        toast("Metadata Upload Error", { type: "error" });
        setLoading(false);
      }

      mintNFT(jsonHash);
    },
  });

  const { contracts, web3 } = useContracts();
  const { account, chainId } = useWeb3React();
  const userSeaTokenBalance = useSeaBalance();

  const handleFile = (e) => {
    setSelectedfile(e.target.files[0]);
    if (VIDEO_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.VIDEO);
    } else if (IMAGE_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.IMAGE);
    } else if (AUDIO_TYPES.includes(e.target.files[0].type)) {
      setMediaType(FILE_TYPES.AUDIO);
    }
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {};

  const mintNFT = async (jsonHash) => {
    if (account && contracts.closedSeaNft) {
      let mintFee = await contracts.closedSeaNft.methods
        .mintPriceInETH()
        .call();
      const seaAmountForExemptFee = await contracts.closedSeaNft.methods
        .seaAmountForExemptFee()
        .call();
      if (
        parseFloat(userSeaTokenBalance) >=
        parseFloat(Web3.utils.fromWei(seaAmountForExemptFee, "ether"))
      ) {
        mintFee = "0";
      }
      const { transactionHash } = await contracts.closedSeaNft.methods
        .mintWithETH(jsonHash)
        .send({ from: account, value: mintFee });
      const tx = await web3.eth.getTransactionReceipt(transactionHash);
      if (tx) {
        toast(
          <a href={`${BLOCK_EXPLORER_URLS[chainId]}tx/${transactionHash}`}>
            Successfully Minted! Check transaction
          </a>,
          { type: "success" }
        );
        setLoading(false);
      }
    }
  };

  const onClearHandler = () => {
    formik.setValues({
      name: "",
      description: "",
      externalLink: "",
      price: "",
    });
    setSelectedfile(null);
    setMediaFile("");
    setMediaType("");
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container center-1200", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create single collectible
              </div>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.file}>
                    <input
                      className={styles.load}
                      type="file"
                      onChange={(e) => handleFile(e)}
                    />
                    <div className={styles.icon}>
                      <svg
                        class=""
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        fill="inherit"
                      >
                        <path d="M10.229.667c.707 0 1.386.281 1.886.781l1.105 1.105c.5.5.781 1.178.781 1.886v8.229c0 1.473-1.194 2.667-2.667 2.667H4.667C3.194 15.334 2 14.14 2 12.667V3.334C2 1.861 3.194.667 4.667.667h5.562zM9.333 2H4.667c-.693 0-1.263.529-1.327 1.205l-.006.128v9.333c0 .693.529 1.263 1.205 1.327l.128.006h6.667c.693 0 1.263-.529 1.327-1.205l.006-.128V5.334h-1.333a2 2 0 0 1-1.995-1.851l-.005-.149V2zM7.745 6.051c.242-.1.53-.052.727.145h0l2 2c.26.26.26.682 0 .943s-.682.26-.943 0h0l-.862-.862v3.057c0 .368-.298.667-.667.667s-.667-.298-.667-.667h0V8.276l-.862.862c-.26.26-.682.26-.943 0s-.26-.682 0-.943h0l2-2c.064-.064.138-.112.216-.145zm2.922-3.977v1.259c0 .368.298.667.667.667h1.259c-.065-.188-.173-.361-.317-.505l-1.105-1.105c-.144-.144-.317-.251-.505-.317z"></path>
                      </svg>
                    </div>
                    <div className={styles.format}>
                      {selectedfile
                        ? `${selectedfile.name} selected. Click to change the media.`
                        : "Choose one of PNG, GIF, WEBP, MP4 or MP3. Max 1Gb."}
                    </div>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="e. g. “Redeemable Bitcoin Card with logo”"
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      errorMsg={formik.touched.name && formik.errors.name}
                    />
                    <TextInput
                      className={styles.field}
                      label="Description"
                      name="description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      errorMsg={
                        formik.touched.description && formik.errors.description
                      }
                    />
                    <TextInput
                      className={styles.field}
                      label="External Link"
                      name="externalLink"
                      type="text"
                      value={formik.values.externalLink}
                      onChange={formik.handleChange}
                      placeholder="e. g. “https://yoursite.com/123”"
                    />

                    {/* <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={royalties}
                            setValue={setRoyalties}
                            options={royaltiesOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Size"
                          name="Size"
                          type="text"
                          onChange={(e) => setSize(e.target.value)}
                          placeholder="e. g. Size"
                          required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Propertie"
                          name="Propertie"
                          type="text"
                          onChange={(e) => setPropertie(e.target.value)}
                          placeholder="e. g. Propertie"
                          required
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={cn(styles.option, styles.sale)}>
                  <div className={styles.box}>
                    <div className={styles.category}>Put on sale</div>
                    <div className={styles.text}>
                      You’ll receive bids on this item
                    </div>
                  </div>
                  {/* <Switch value={sale} setValue={setSale} /> */}
                </div>
                {sale && (
                  <TextInput
                    className={cn(styles.field, styles.price)}
                    label="Price"
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    placeholder="price in WEI unit"
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    errorMsg={formik.touched.price && formik.errors.price}
                  />
                )}
                {/* <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Instant sale price</div>
                    <div className={styles.text}>
                      Enter the price for which the item will be instantly sold
                    </div>
                  </div>
                  <Switch value={price} setValue={setPrice} />
                </div> */}
                {/* <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Unlock once purchased</div>
                    <div className={styles.text}>
                      Content will be unlocked after successful transaction
                    </div>
                  </div>
                  <Switch value={locking} setValue={setLocking} />
                </div> */}
                {/* <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
                </div>
                <Cards
                  className={styles.cards}
                  items={items}
                  handleSelectItem={handleSelectItem}
                /> */}
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button btn-square", styles.button, {
                    [styles.disabled]: loading || !account || !selectedfile,
                  })}
                  onClick={handleUpload}
                  type="submit"
                >
                  {loading && <Loader className={styles.loader} />}
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
              </div>
            </form>
          </div>
          <Preview
            mediaFile={mediaFile}
            mediaType={mediaType}
            fileType={selectedfile?.type}
            data={formik.values}
            className={cn(styles.preview)}
            onClear={onClearHandler}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} />
      </Modal>
    </>
  );
};

export default Upload;
