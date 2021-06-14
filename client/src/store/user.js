// ACTIONS

const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const SET_PHOTO_URL = "SET_PHOTO_URL";

// ACTION CREATORS

export const gotUser = (user) => {
  return {
    type: GET_USER,
    user
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching
});

export const setPhotoUrl = (photoUrl) => ({
  type: SET_PHOTO_URL,
  photoUrl
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        photoUrl: action.photoUrl
      }
    default:
      return state;
  }
};

export default reducer;
