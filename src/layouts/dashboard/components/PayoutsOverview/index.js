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
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import getPayouts from "utils/GetPayouts";

function PayoutsOverview() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPayouts(7).then((res) => {
      // console.log(res.data.results);
      const beneficiary = res.data.results;
      const data = beneficiary.map(({ beneficiaryName, amountSent, updatedAt }) => ({
        beneficiaryName,
        amountSent,
        date: new Date(updatedAt),
      }));
      setPayouts(data);
      setLoading(false);
      // console.log(new Date(data[0].updatedAt));
    });
  }, []);
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Payouts Overview
        </MDTypography>
        <MDTypography variant="caption" fontWeight="light" fontSize="sm">
          Recent payouts
        </MDTypography>
        {/* <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox> */}
      </MDBox>
      {!loading && (
        <MDBox p={2}>
          {payouts.map((item) => (
            <TimelineItem
              color="success"
              icon="notifications"
              title={`${item.beneficiaryName}, ₦${item.amountSent}`}
              dateTime={String(item.date.toGMTString())}
              key={item.date}
            />
          ))}
          {/* <TimelineItem
          color="error"
          icon="inventory_2"
          title="New payout #PP_1577316478"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */}
          <TimelineItem color="primary" icon="vpn_key" title="End" dateTime="" lastItem />
        </MDBox>
      )}
    </Card>
  );
}

export default PayoutsOverview;
