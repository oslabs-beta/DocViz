// import { useEffect, useState } from 'react';

// const useDockerData = (containerId, endpoint) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = `/api/${endpoint}/${containerId}`; // Construct the correct API URL
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         console.error(`Error fetching ${endpoint} data:`, err);
//         setError(err);
//       }
//     };

//     fetchData(); // Fetch immediately
//     const interval = setInterval(fetchData, 10000); // Poll every 10 seconds

//     return () => clearInterval(interval); // Cleanup interval
//   }, [containerId, endpoint]); // Re-run effect if containerId or endpoint changes

//   return { data, error };
// };

// export default useDockerData;
