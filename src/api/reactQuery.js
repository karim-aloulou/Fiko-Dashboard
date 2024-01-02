import axios from "axios";

export const fetchData = async () => {
  const { data } = await axios.get("http://localhost:8080/api/data/");
  console.log(data);
  return data?.data?.data;
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
