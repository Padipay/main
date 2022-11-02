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
import TransactionData from "layouts/dashboard/components/RecentTransactions/data";
import getTransactions from "utils/GetTransactions";
import Spinner from "react-spinkit";

function Transactions() {
  const [transactions, setTransactions] = useState("");
  const [totalTransactions, setTotalTransactions] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const temp = [];
    getTransactions().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, data: doc.data() });
        setTransactions(temp);
        setTotalTransactions(temp.length);
        setLoading(false);
      });
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
            title="All Transactions"
            count={totalTransactions}
            details={{
              color: "success",
              label: "Total transactions",
              amount: `${totalTransactions}`,
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
                  Transactions
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
                  <TransactionData data={transactions} />
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

export default Transactions;
