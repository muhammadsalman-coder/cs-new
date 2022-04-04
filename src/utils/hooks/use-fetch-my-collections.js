// import { useState, useEffect } from "react";
// import { useWeb3React } from "@web3-react/core";

// // import { fetchMyCollectionData } from "utils/helpers/apis/fetch-collection-data";
// import { useSelector } from "react-redux";

// ------------comment by salman and use this functionality using redux ----------

// const useFetchMyCollections = () => {
//   // const dispatch = useDispatch();
//   const myCollections = useSelector((state) => state.collection.myCollection);
//   // const [myCollections, setMyCollections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { account } = useWeb3React();

//   // console.log("this is shan shaikh loading ",);

//   useEffect(() => {
//     if (account) {
//       setLoading(true);
//       if (myCollections) {
//         setLoading(false);
//       }
//       // fetchMyCollectionData({ address: account }).then(data => {
//       //   setLoading(false);
//       //   setMyCollections(data);
//       // });
//     }
//   }, [account]);

//   return { myCollections, loading };
// };

// export default useFetchMyCollections;

// ------------comment by salman and use this functionality using redux ----------
