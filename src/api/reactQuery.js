import axios from "axios";

export const fetchData = (limit, openedPrograms) => async () => {
  console.log(openedPrograms);
  const { data } = await axios.get(
    `http://localhost:8080/api/data?limit=${limit}&openedPrograms=${openedPrograms}`
  );
  console.log(data?.data);
  return data?.data;
};

// function Dashboard() {
//   const { data, isLoading } = useQuery('dashboardData', fetchData);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   // Render your dashboard using the fetched data
//   return (
//     <div>
//       {/* Render your dashboard components using data */}
//     </div>
//   );
// }
