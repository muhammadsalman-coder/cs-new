import { useCallback, useEffect, useState } from "react";

import { useContracts } from "./use-connectors";

const useFetchNftCountByCategory = ({ category }) => {
  console.log("shan useFetchNftCountByCategory", category);
  const [count, setCount] = useState(0);
  const { contracts } = useContracts();

  const fetchNftCountByCategory = useCallback(async () => {
    console.log("shan-----------------------", category);
    if (contracts.nftController) {
      console.log(
        "-------------------shanshaikh-----------------------",
        contracts.nftController
      );
      const result = await contracts.nftController.methods
        .getAskByCategoryLength(category)
        .call();

      console.log("-------------------shan-----------------------", result);
      setCount(result);
    }
  }, [contracts, category]);

  useEffect(() => {
    fetchNftCountByCategory();
  }, [fetchNftCountByCategory]);

  return count;
};

export default useFetchNftCountByCategory;
