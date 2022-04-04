import axios from "axios";

import { BACKEND_URL } from 'config';

const searchNftsByName = async (name) => {
  console.log('searching nfts by name', name)
  try{
    const result = await axios({
      url: `${BACKEND_URL}nfts/search`,
      method: 'GET',
      params: {name}
    });
    return result;
  }
  catch(err) {
    console.log('error fetching nfts from rest api', err)
  }
  
  
};

export default searchNftsByName;
