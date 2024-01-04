import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

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
  const { data, refetch } = useQuery("dashboardData", fetchData(limit, openedPrograms));
  const { data: data1 } = useQuery("dashboardData", fetchData(20000, openedPrograms));
  console.log("data1", data1);
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      refetch();
    }, 100);

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
      data1?.length) *
    100;
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
                  cluster1 > 50 ? `${cluster1 || 0} % Tireness` : `${cluster1 || 0} % Not Tireness`
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container xs={12} md={12} lg={12}>
          <Grid item xs={4} md={4} lg={4}>
            <label>Opened Programs</label>
            <TextField
              value={openedPrograms}
              type="number"
              sx={{ marginLeft: 5 }}
              onChange={(event) => handleChange(event.target.value, setOpenedPrograms)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <label>Limit</label>
            <TextField
              type="number"
              value={limit}
              sx={{ marginLeft: 5 }}
              onChange={(event) => handleChange(event.target.value, setLimit)}
            />
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
