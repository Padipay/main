// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import DataTable from "examples/Tables/DataTable";

import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

function TransactionData({ data }) {
  const transactions = data.map((item) => ({
    id: item.id,
    pay_ref: item.data.payment_ref,
    date: item.data.date.toDate().toLocaleDateString(),
    sent: item.data.send,
    receive: `₦${Number(item.data.receive).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`,
    token: item.data.token,
    status: (
      <MDBadge badgeContent={item.data.status} color="success" variant="gradient" size="md" />
    ),
  }));
  return (
    <DataTable
      showTotalEntries={false}
      isSorted={false}
      noEndBorder
      entriesPerPage={false}
      table={{
        columns: [
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                ID
              </MDTypography>
            ),
            accessor: "id",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                PAYMENT REF
              </MDTypography>
            ),
            accessor: "pay_ref",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                SENT
              </MDTypography>
            ),
            accessor: "sent",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                RECEIVE
              </MDTypography>
            ),
            accessor: "receive",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                TOKEN
              </MDTypography>
            ),
            accessor: "token",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                DATE
              </MDTypography>
            ),
            accessor: "date",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                STATUS
              </MDTypography>
            ),
            accessor: "status",
            width: "5%",
          },
        ],
        rows: transactions,
      }}
    />
  );
}
TransactionData.defaultProps = {
  data: [],
};

TransactionData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      payment_ref: PropTypes.string,
      account_name: PropTypes.string,
      account_number: PropTypes.number,
      bankName: PropTypes.string,
      date: PropTypes.objectOf(PropTypes.number),
      sent: PropTypes.number,
      receive: PropTypes.number,
      token: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};
export default TransactionData;
