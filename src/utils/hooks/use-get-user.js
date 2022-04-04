import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

import { BACKEND_URL } from 'config';

const useGetUser = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { account } = useWeb3React();

  const getUserInfo = useCallback(async () => {
    const result = await axios.get(`${BACKEND_URL}profile?address=${account}`);
    if (result.status === 200) {
      setUser(result.data);
    } else {
      setError(result.body.message);
    }
    setLoading(false);
  }, [account]);

  const reload = useCallback(async () => {
    await getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    setLoading(true);
    getUserInfo();
  }, [getUserInfo]);

  return { user, error, loading, reload };
}

export default useGetUser;
