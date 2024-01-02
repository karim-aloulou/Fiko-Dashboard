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
import { useEffect } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { data, isLoading, refetch } = useQuery("dashboardData", fetchData);
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      // Manually trigger a refetch to simulate an update
      refetch();
    }, 1000); // 10 seconds

    // Clean up the timeout to avoid triggering the update after unmounting
    return () => clearTimeout(updateTimeout);
  }, [refetch]);
  console.log("data", data);

  return (
    <DashboardLayout>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="dark" icon="weekend" title="Cluster" count={0} />
            </MDBox>
          </Grid>
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
                    chart={sales}
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
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Eye Pupil"
                  date="updated 1s ago"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="secondary"
                  title="Head Tilt Degree"
                  date="updated 1s ago"
                  chart={tasks}
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
