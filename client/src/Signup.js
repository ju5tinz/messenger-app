import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";

import Banner from "./components/misc/Banner"
import Header from "./components/misc/AuthHeader"

const useStyle = makeStyles((theme) => ({
  registerPage: {
    height: "100vh",
  },
  registerContentContainer: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      justifyContent: "flex-end"
    }
  },
  registerContentMain: {
    margin: `${theme.spacing(10)}px ${theme.spacing(16)}px`,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4)
    },
  },
  registerContentTitle: {
    fontSize: "2rem",
    fontWeight: "600",
  },
  registerForm: {
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.registerPage} container >
      <Banner />
      <Grid className={classes.registerContentContainer} container item xs={12} sm={7}>
        <Header text="Already have an account?" buttonText="Login" onClick={() => history.push("/login")} />
        <Box className={classes.registerContentMain}>
          <Typography className={classes.registerContentTitle}>Create an account.</Typography>
          <form className={classes.registerForm} onSubmit={handleRegister}>
            <Grid>
              <Grid>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl margin="normal" fullWidth error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl margin="normal" fullWidth error={!!formErrorMessage.confirmPassword}>
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Button className={classes.primaryButton} type="submit" variant="contained" size="large">
                Create
              </Button>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
