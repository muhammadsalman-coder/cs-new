const artifacts = {
  closedSeaNft: {
    56: '',
    97: '0x69536bdf4B18499181EB386B0E4019a28C4Fb096'
  },
  seaToken: {
    56: '',
    97: '0xA4fb840986B10aC44aA893793cfe755c81c3740D'
  },
  nftController: {
    56: '',
    97: '0x4932d8fFF2cAB6A17a978980a6b1E81f441B18EC'
  }
};

const PINATA_BASE_URL = 'https://api.pinata.cloud/';
const PINATA_API_KEY = '740038461f20a21ef1cd';
const PINATA_SECRET_API_KEY = '0a49179ceeb1869082937014e6f74ba051a2f0915845fd7557aaa8c1e2526cef';
const BACKEND_URL = 'https://closedsea-backend.herokuapp.com/';

const S3_CONFIG = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY
};

export {
  artifacts,
  PINATA_BASE_URL,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  BACKEND_URL,
  S3_CONFIG
};
