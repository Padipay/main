/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// utils function
import fincraBalance from "utils";
import getBnbalance from "../../utils/GetBnbalance";
// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
import PayoutsOverview from "./components/PayoutsOverview";
import RecentTransactions from "./components/RecentTransactions";

// images
import BNB from "../../assets/images/bnb.png";
import ETH from "../../assets/images/eth.png";
import BTC from "../../assets/images/btc.png";
import USDT from "../../assets/images/usdt.png";
import BUSD from "../../assets/images/busd.png";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [fincraBlnce, setFincraBalance] = useState("");
  const [bnbBalance, setBnbBalance] = useState("");

  useEffect(() => {
    fincraBalance().then((res) => {
      setFincraBalance(res.data.ledgerBalance);
    });
    getBnbalance().then((res) => {
      setBnbBalance(res.result / 1000000000000000000);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="wallet"
                title="Fincra Balance"
                count={`₦${fincraBlnce.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                details={{
                  color: "success",
                  label: "Business ID:",
                  amount: "632b9f641fb7fff68e41052d",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="BNB Balance"
                count={bnbBalance}
                image={BNB}
                details={{
                  color: "success",
                  label: "Wallet Address",
                  amount: "0x78565af....9D31aeaA763b848",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="BTC Balance"
                count="2,300"
                image={BTC}
                details={{
                  color: "success",
                  label: "Wallet Address",
                  amount: "0x78565af....9D31aeaA763b848",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="ETH Balance"
                count="2,300"
                image={ETH}
                details={{
                  color: "success",
                  label: "Wallet Address",
                  amount: "0x78565af....9D31aeaA763b848",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="USDT Balance"
                count="2,300"
                image={USDT}
                details={{
                  color: "success",
                  label: "Wallet Address",
                  amount: "0x78565af....9D31aeaA763b848",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="BUSD Balance"
                count="2,300"
                image={BUSD}
                details={{
                  color: "success",
                  label: "Wallet Address",
                  amount: "0x78565af....9D31aeaA763b848",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Daily Transactions"
                  description="Transactions per day across each wallet address"
                  date="updated 2 min ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Monthly transactions"
                  description={
                    <>
                      (<strong>%</strong>) increase in monthly transactions.
                    </>
                  }
                  date="updated 1 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Monthly Payouts"
                  description="Successful payouts from fincra"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <RecentTransactions />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PayoutsOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
