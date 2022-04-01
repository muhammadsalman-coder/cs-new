import axios from "axios";

import { PINATA_BASE_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY } from "config";

const uploadJson = async (jsonData) => {
  const url = `${PINATA_BASE_URL}pinning/pinJSONToIPFS`;
  // const url = `${PINATA_BASE_URL}pinning/pinFileToIPFS/QmTLTvtcHYTaEFQzvKvPBTTVM9rHbBNTcBU3Y4tYT4GBVs`;

  return axios
    .post(url, jsonData, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    })
    .then((response) => {
      const y = response.data.IpfsHash;
      console.log("uploadJson_pinJSONToIPFS", response);
      return y;
    })
    .catch((error) => {
      console.log("[uploadMedia] error => ", error);
      return null;
    });
};

export default uploadJson;
