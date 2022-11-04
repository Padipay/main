// prop-types is a library for typechecking of props
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import DataTable from "examples/Tables/DataTable";

// import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

function UsersData({ data }) {
  const users = data.map((item) => ({
    fname: (
      // <NavLink
      //   to={`/userinfo/${item.data.FirstName}`}
      //   state={{
      //     id: item.id,
      //     fname: item.data.FirstName,
      //     lname: item.data.LastName,
      //     email: item.data.Email,
      //   }}
      // >
      //   {item.data.FirstName}
      // </NavLink>
      <MDTypography
        component={NavLink}
        to={`/userinfo/${item.data.FirstName}`}
        state={{
          id: item.id,
          fname: item.data.FirstName,
          lname: item.data.LastName,
          email: item.data.Email,
        }}
        fontWeight="bold"
        fontSize={14}
      >
        {item.data.FirstName}
      </MDTypography>
    ),
    lname: item.data.LastName,
    email: item.data.Email,
    verify: (
      <MDBadge
        badgeContent={String(item.data.verify)}
        color="success"
        variant="gradient"
        size="md"
      />
    ),
    date: item.data.createdAt.toDate().toLocaleDateString(),
  }));
  return (
    <DataTable
      isSorted={false}
      canSearch
      table={{
        columns: [
          { Header: "First name", accessor: "fname", width: "25%" },
          { Header: "Last Name", accessor: "lname", width: "15%" },
          { Header: "Email", accessor: "email", width: "15%" },
          { Header: "Created At", accessor: "date", width: "15%" },
          { Header: "Verify", accessor: "verify", width: "12%" },
        ],
        rows: users,
      }}
    />
  );
}

UsersData.defaultProps = {
  data: [],
};

UsersData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      FirstName: PropTypes.string,
      LastName: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.objectOf(PropTypes.number),
      verify: PropTypes.bool,
    })
  ),
};
export default UsersData;
