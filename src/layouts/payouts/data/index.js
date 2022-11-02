// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import DataTable from "examples/Tables/DataTable";

import MDTypography from "components/MDTypography";

function PayoutsData({ data }) {
  const payouts = data.map((item) => ({
    id: item.id,
    beneficiary: item.beneficiaryName,
    sent: `₦ ${item.amountSent}`,
    receive: `₦${item.amountReceived}`,
    fee: `₦${item.fee}`,
    ref_id: item.reference,
    date: new Date(item.updatedAt).toGMTString(),
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
                BENEFICIARY NAME
              </MDTypography>
            ),
            accessor: "beneficiary",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                AMOUNT SENT
              </MDTypography>
            ),
            accessor: "sent",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                AMOUNT RECEIVED
              </MDTypography>
            ),
            accessor: "receive",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                FEE
              </MDTypography>
            ),
            accessor: "fee",
            width: "5%",
          },
          {
            Header: (
              <MDTypography variant="p" fontWeight="bold">
                REF_ID
              </MDTypography>
            ),
            accessor: "ref_id",
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
        ],
        rows: payouts,
      }}
    />
  );
}
PayoutsData.defaultProps = {
  data: [],
};

PayoutsData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      beneficiaryName: PropTypes.string,
      amountSent: PropTypes.number,
      amountReceived: PropTypes.number,
      fee: PropTypes.number,
      updatedAt: PropTypes.string,
      reference: PropTypes.string,
    })
  ),
};
export default PayoutsData;
