import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { artifacts } from 'config';
import axios from 'axios';
import { useContracts } from './use-connectors';

const useFetchMyTokens = () => {
  const [myTokens, setMyTokens] = useState([]);
  const [isCalled, setIsCalled] = useState(false);
  const { account, chainId, active } = useWeb3React();
  const { isAuthenticated } = useMoralis();
  const { contracts } = useContracts();
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    if (isAuthenticated) {
      setIsCalled(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (account) {
      setIsCalled(false);
    }
  }, [account]);

  const fetchTokens = useCallback(async () => {
    if (active && isAuthenticated && !isCalled) {
      const nftAddress = artifacts.closedSeaNft[chainId];

      try {
        const tokenIds = await Web3Api.token.getNFTOwners({ chain: `0x${chainId.toString(16)}`, address: nftAddress });
        let tokens = [];

        if (tokenIds) {
          for (let item of tokenIds.result) {
            if (String(item.owner_of).toUpperCase() === account.toUpperCase()) {
              if (contracts.closedSeaNft) {
                const uri = await contracts.closedSeaNft.methods.tokenURI(item.token_id).call();
                const result = await axios.get(uri);
                tokens = [...tokens, { ...item, metadata: result.data, token_uri: uri }];
              }
            }
          }
          setMyTokens(tokens);
          setIsCalled(true);
        }
      } catch (error) {
        console.log('[fetchTokens] error => ', error);
      }
    }
  }, [account, active, chainId, Web3Api, isAuthenticated, isCalled, contracts]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens])
  
  return myTokens;
};

export default useFetchMyTokens;
