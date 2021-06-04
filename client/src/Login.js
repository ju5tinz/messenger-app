import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";

import Banner from "./components/misc/Banner"
import Header from "./components/misc/AuthHeader"

const useStyle = makeStyles((theme) => ({
  loginPage: {
    height: "100vh",
  },
  loginContentContainer: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      justifyContent: "flex-end"
    }
  },
  loginContentMain: {
    margin: theme.spacing(16),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4)
    },
  },
  loginContentTitle: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  loginForm: {
    textAlign: "center"
  },
  primaryButton: {
    padding: `${theme.spacing(2)}px ${theme.spacing(7)}px`,
    margin: theme.spacing(7),
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3)
    }
  },
}));

const Login = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.loginPage}>
      <Banner />
      <Grid className={classes.loginContentContainer} container item xs={12} sm={7}>
        <Header text="Don't have an account?" buttonText="Create account" onClick={() => history.push("/register")}/>
        <Box className={classes.loginContentMain}>
          <Typography className={classes.loginContentTitle}>Welcome back!</Typography>
          <form className={classes.loginForm} onSubmit={handleLogin}>
            <Grid>
              <Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" fullWidth required>
                <TextField
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid>
                <Button className={classes.primaryButton} type="submit" variant="contained" size="large">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
