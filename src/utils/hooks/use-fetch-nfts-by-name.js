import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import searchNftsByName from '../helpers/apis/searchNftsByName';

import { BACKEND_URL } from 'config';

const useFetchNftsByName = ({ name, page = 0, size = 10 }) => {
  console.log('searchNftsByName hook', name)
  const [nfts, setNfts] = useState([]);
 
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    console.log('use effect running useFetchNftsByName',)
    setLoading(true)
    const result = await searchNftsByName(name);
    console.log('fetch nfts by name returned', result)
    setNfts(result.data.data.nfts)
    setLoading(false)
  }, [name]);

  return {
    loading,
    nfts,
  };
};

export default useFetchNftsByName;
