import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import getUserTransactions from "utils/GetUserTransactions";
import TransactionData from "layouts/dashboard/components/RecentTransactions/data";
import Spinner from "react-spinkit";

function UserInfo() {
  const location = useLocation();
  const { state } = location;
  const [transactions, setTransactions] = useState("");
  const [totalTransactions, setTotalTransactions] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const temp = [];
    getUserTransactions(state.id).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, data: doc.data() });
        setTransactions(temp);
        setTotalTransactions(temp.length);
        setLoading(false);
      });
    });
    return () => getUserTransactions();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} md={6} lg={3} mt={3} mb={10}>
        <MDBox mb={1.5}>
          <DefaultInfoCard
            icon="people"
            title={`${state.fname} ${state.lname}`}
            description={`${state.email}`}
            value={`Transactions ${totalTransactions}`}
          />
        </MDBox>
      </Grid>
      <Grid container spacing={6} mb={5}>
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
                <MDBox component={Spinner} name="line-scale-pulse-out" color="info" mt={2} mb={5} />
              </Grid>
            ) : (
              <MDBox pt={3}>
                <TransactionData data={transactions} />
              </MDBox>
            )}
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default UserInfo;
