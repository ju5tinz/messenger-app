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
  loginContentTop: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  loginContentTopText: {
    color: theme.palette.secondary.main,
    fontSize: "1rem"
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
  secondaryButton: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    color: theme.palette.primary.main,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: theme.palette.grey[100]
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1)
    }
  }
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
        <Grid className={classes.loginContentTop} container item>
          <Typography className={classes.loginContentTopText}>Don't have an account?</Typography>
          <Button className={classes.secondaryButton} variant="contained" size="large" onClick={() => history.push("/register")}>Create account</Button>
        </Grid>
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
