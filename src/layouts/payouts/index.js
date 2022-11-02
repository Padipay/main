import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import getPayouts from "utils/GetPayouts";
import Spinner from "react-spinkit";

import PayoutsData from "./data";

function Payouts() {
  const [payouts, setPayouts] = useState("");
  const [totalPayouts, setTotalPayouts] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const temp = [];
    getPayouts(40).then((res) => {
      temp.push(res.data.results);
      setPayouts(res.data.results);
      setTotalPayouts(temp[0].length);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} md={6} lg={3} mt={5}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="info"
            icon="leaderboard"
            title="Payouts"
            count={totalPayouts}
            details={{
              color: "success",
              label: "Recent payouts",
              amount: `${totalPayouts}`,
            }}
          />
        </MDBox>
      </Grid>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Payouts
                </MDTypography>
              </MDBox>

              {loading === true ? (
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <MDBox
                    component={Spinner}
                    name="line-scale-pulse-out"
                    color="info"
                    mt={2}
                    mb={5}
                  />
                </Grid>
              ) : (
                <MDBox pt={3}>
                  <PayoutsData data={payouts} />
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Payouts;
