import React from "react";
import { connect } from "react-redux";
import { Grid, Menu, MenuItem, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { updatePhotoUrl } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5
  }
}));

const MenuItemText = {
  setProfilePhoto: "Set Profile Photo"
};

const UserOptions = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dispPhotoUrlField, setDispPhotoUrlField] = React.useState(false);

  const handleOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleOptionClose = () => {
    setAnchorEl(null);
  }

  const handleOptionItemClick = (event) => {
    if (event.target.innerText === MenuItemText.setProfilePhoto) {
      setDispPhotoUrlField(true);
    }
  }

  const handleSubmitPhotoUrl = async (event) => {
    event.preventDefault();
    await props.updatePhotoUrl({photoUrl: event.target.photoUrl.value});
    handleOptionClose();
    setDispPhotoUrlField(false);
  }

  return (
    <>
    <MoreHorizIcon classes={{ root: classes.ellipsis }} onClick={ handleOptionClick }/>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleOptionClose}
    >
      {!dispPhotoUrlField 
        ? <MenuItem onClick={handleOptionItemClick}>{MenuItemText.setProfilePhoto}</MenuItem>
        : <MenuItem>
            <form onSubmit={handleSubmitPhotoUrl}>
              <Grid container>
                <TextField
                  aria-label="Photo URL"
                  label="Photo URL"
                  type="text"
                  name="photoUrl"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </MenuItem>
      }
    </Menu>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhotoUrl: (photoUrl) => {
      dispatch(updatePhotoUrl(photoUrl));
    }
  }
}

export default connect(null, mapDispatchToProps)(UserOptions);