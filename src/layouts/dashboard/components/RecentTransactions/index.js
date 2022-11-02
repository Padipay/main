import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import getTransactions from "utils/GetTransactions";
import TransactionData from "./data";

function RecentTransactions() {
  const [transactions, setTransactions] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const temp = [];
    getTransactions().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, data: doc.data() });
        setTransactions(temp);
        setLoading(false);
      });
    });
  }, []);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Recent Transactions
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>10 Most</strong> recent transactions
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>{!loading && <TransactionData data={transactions} />}</MDBox>
    </Card>
  );
}

export default RecentTransactions;
