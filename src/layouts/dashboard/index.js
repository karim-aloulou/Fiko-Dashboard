// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import { useQuery } from "react-query";
import { fetchData } from "api/reactQuery";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

function Dashboard() {
  const [openedPrograms, setOpenedPrograms] = useState(2);
  const [limit, setLimit] = useState(100);

  const handleChange = (value, setChange) => {
    setChange(value);
  };
  const { data, isLoading, refetch } = useQuery("dashboardData", fetchData(limit, openedPrograms));
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      // Manually trigger a refetch to simulate an update
      refetch();
    }, 100); // 10 seconds

    // Clean up the timeout to avoid triggering the update after unmounting
    return () => clearTimeout(updateTimeout);
  }, [refetch, openedPrograms, limit]);

  const createdAt = data?.map((el) => {
    const dateObject = new Date(el.createdAt);
    return dateObject.getSeconds();
  });
  const cluster = data?.map((el) => el.cluster);
  const cluster1 =
    (cluster
      ?.filter((el) => el === 1)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
      createdAt?.length) *
    100;
  console.log(typeof cluster1 === NaN);
  console.log(createdAt?.length);

  return (
    <DashboardLayout>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Cluster"
                count={
                  !typeof cluster1 === NaN
                    ? `There is opened program equal to ${openedPrograms}, Please verify your account `
                    : cluster1 > 50
                    ? `${cluster1 || 0} % Tireness`
                    : `${cluster1 || 0} % Not Tireness`
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <label>Opened Programs</label>
          <TextField
            value={openedPrograms}
            type="number"
            onChange={(event) => handleChange(event.target.value, setOpenedPrograms)}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <label>Limit</label>
          <TextField
            type="number"
            value={limit}
            onChange={(event) => handleChange(event.target.value, setLimit)}
          />
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="primary"
                    title="Eye Aspect Ratio"
                    date="updated 1s ago"
                    chart={{
                      labels: createdAt?.reverse(),
                      datasets: {
                        label: "Eye Aspect Ratio",
                        data: data?.map((el) => el.eyeAspectRatio)?.reverse(),
                      },
                    }}
                  />
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Mouth Aspect Ratio"
                  date="updated 1s ago"
                  chart={{
                    labels: createdAt,
                    datasets: {
                      label: "Eye Aspect Ratio",
                      data: data?.map((el) => el.mouthAspectRatio),
                    },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Eye Pupil"
                  date="updated 1s ago"
                  chart={{
                    labels: createdAt,
                    datasets: {
                      label: "Eye Aspect Ratio",
                      data: data?.map((el) => el.eyePupil),
                    },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="secondary"
                  title="Head Tilt Degree"
                  date="updated 1s ago"
                  chart={{
                    labels: createdAt,
                    datasets: {
                      label: "Eye Aspect Ratio",
                      data: data?.map((el) => el.headTiltDegree),
                    },
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
