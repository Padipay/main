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

import { useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Cookies from "universal-cookie";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { useForm } from "react-hook-form";
import login from "utils/login";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cookies = new Cookies();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    // const options = {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "content-type": "application/json",
    //     "api-key": "C2WwqRrycjgSgT9BIDS1Uhz5kMVlaY0R",
    //   },
    //   body: JSON.stringify({ email, password }),
    // };
    // await fetch("https://padipay-server.herokuapp.com/admin-login", options)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Email or password is wrong. Try again");
    //     }
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     cookies.set("TOKEN", res.token, {
    //       path: "/",
    //     });
    //     window.location.href = "/dashboard";
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     setError(e.message);
    //     setLoading(false);
    //   });
    login(email, password)
      .then((res) => {
        cookies.set("TOKEN", res.token, {
          path: "/",
        });
        setLoading(false);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Padipay Admin
          </MDTypography>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                // value={email}
                {...register("email", { required: true })}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            {errors.email && (
              <MDTypography variant="subtitle2" fontWeight="medium" color="error" mb={3}>
                Email is required
              </MDTypography>
            )}
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                // value={password}
                {...register("password", { required: true })}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            {error != null ? (
              <MDTypography variant="subtitle2" fontWeight="medium" color="error">
                {error}
              </MDTypography>
            ) : null}
            {errors.password && (
              <MDTypography variant="subtitle2" fontWeight="medium" color="error">
                Password is required
              </MDTypography>
            )}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" disabled={loading} fullWidth type="submit">
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
