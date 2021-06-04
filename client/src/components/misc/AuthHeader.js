import React from 'react';
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  headerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  headerText: {
    color: theme.palette.secondary.main,
    fontSize: "1rem"
  },
  headerButton: {
    width: "12em",
    padding: `${theme.spacing(2)}px 0px`,
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

const AuthHeader = (props) => {
  const classes = useStyle();

  return(
    <Grid className={classes.headerContainer} container item>
      <Typography className={classes.headerText}>{props.text}</Typography>
      <Button className={classes.headerButton} variant="contained" size="large" onClick={props.onClick}>{props.buttonText}</Button>
    </Grid>
  );
}

export default AuthHeader;