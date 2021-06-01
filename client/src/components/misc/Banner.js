import React from "react";
import {
  Grid,
  Box,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import bannerImage from "../../assets/images/bg-img.png";
import { ReactComponent as Logo } from "../../assets/images/bubble.svg"

const useStyle = makeStyles((theme) => ({
  bannerContainer: {
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  bannerOverlay: {
    height: "100%",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    opacity: "0.85",
    flexDirection: "column",
    justifyContent: "center"
  },
  logoContainer: {
    textAlign: "center",
    margin: theme.spacing(3),
  },
  bannerText: {
    color: "white",
    textAlign: "center",
    fontSize: "1.5em"
  }
}));

const Banner = (props) => {
  const classes = useStyle();

  return (
    <Grid container item xs={false} sm={5} className={classes.bannerContainer}>
      <Grid container item className={classes.bannerOverlay}>
        <Box className={classes.logoContainer}>
          <Logo />
        </Box>
        <Typography className={classes.bannerText}>
          Converse with anyone 
          <br/> with any language
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Banner;