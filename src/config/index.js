const artifacts = {
  closedSeaNft: {
    56: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
    97: "0x69536bdf4B18499181EB386B0E4019a28C4Fb096",
    // ammar Rinkeby testnet address
    4: "0xDB753bacDFb788c4d70CEc237F898db21017B11d",
  },
  seaToken: {
    56: "0x5b31d474dcadc1c2a1dfc7d4562b2268b0feea43",
    97: "0xA4fb840986B10aC44aA893793cfe755c81c3740D",
    //ammar Rinkeby testnet address
    4: "0x848655Ccc2E571cA9470954BF08C4Eab3436830B",
  },
  nftController: {
    56: "0xA84ABA462A3dc12A5874c8D0D61d757256C905a5",
    97: "0xBec98ca675EE0099E7eaF0d626a38abAE42Ef24D",
    //ammar Rinkeby testnet address
    4: "0x8A36a5395CAa70da6545f030BFB659Fc8e820A59",
  },
  ethPriceChainlink: {
    56: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
    97: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
  },
  seaPair: {
    56: "0x69903cd9dBBEC1bcaB81E1ffe003260e9e487Ca4",
    97: "0x51c19275686d84c1553f3edd2945dba6ec0c7de4",
  },
  busd: {
    56: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    97: "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47",
  },
};

const PINATA_BASE_URL = "https://api.pinata.cloud/";
const PINATA_BASE_URL_GATEWAY = "https://closedsea.mypinata.cloud/";
const PINATA_BASE_URL_FREE = "https://gateway.pinata.cloud/";

const PINATA_API_KEY = "c027b0a0eebda0cf01e4";
const PINATA_SECRET_API_KEY =
  "52b7362f9e862f879aad5d87121a018a262ffb1346ef6f67be955f92fe55ac03";

// const BACKEND_URL = "https://closedsea.herokuapp.com/"; // official url
// const BACKEND_URL = "https://closedsea21.herokuapp.com/"; // test url
const BACKEND_URL = "https://closedsea262.herokuapp.com/"; // test url
// const BACKEND_URL = "http://localhost:5000/";
const MORALIS_API_URI = "https://deep-index.moralis.io/api/v2/";

// const MORALIS_CHAIN_IDS = {
//   56: "0x38",
//   97: "0x61",
//   4: "0x4",
// };
const MORALIS_CHAIN_IDS = {
  56: "0x38",
  97: "0x61",
  1: "0x1",
  4: "0x4",
  137: "0x89",
  80001: "0x13881",
};

const S3_CONFIG = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
};

export {
  artifacts,
  PINATA_BASE_URL,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  BACKEND_URL,
  MORALIS_API_URI,
  PINATA_BASE_URL_GATEWAY,
  PINATA_BASE_URL_FREE,
  MORALIS_CHAIN_IDS,
  S3_CONFIG,
};
