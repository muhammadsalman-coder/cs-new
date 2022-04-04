const artifacts = {
  closedSeaNft: {
    56: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
    97: "0x69536bdf4B18499181EB386B0E4019a28C4Fb096",
  },
  seaToken: {
    56: "0x5b31d474dcadc1c2a1dfc7d4562b2268b0feea43",
    97: "0xA4fb840986B10aC44aA893793cfe755c81c3740D",
  },
  nftController: {
    56: "0xA84ABA462A3dc12A5874c8D0D61d757256C905a5",
    97: "0xBec98ca675EE0099E7eaF0d626a38abAE42Ef24D",
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
const PINATA_API_KEY = "740038461f20a21ef1cd";
const PINATA_SECRET_API_KEY =
  "0a49179ceeb1869082937014e6f74ba051a2f0915845fd7557aaa8c1e2526cef";
// const BACKEND_URL = "https://closedsea.herokuapp.com/"; // live backend
// const BACKEND_URL = "https://closedsea21.herokuapp.com/"; // test 6 test  backend
const BACKEND_URL = "https://closedsea262.herokuapp.com/";
//const BACKEND_URL = 'http://localhost:4000/';
const MORALIS_API_URI = "https://deep-index.moralis.io/api/v2/";
console.log("testing deply");
const MORALIS_CHAIN_IDS = {
  56: "0x38",
  97: "0x61",
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
  MORALIS_CHAIN_IDS,
  S3_CONFIG,
};
