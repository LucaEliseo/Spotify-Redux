export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const GET_SONGS = "GET_SONGS";
export const GET_SONGS_ERROR = "GET_SONGS_ERROR";
export const GET_SONGS_LOADING_ON = "GET_SONGS_LOADING_ON";
export const GET_SONGS_LOADING_OFF = "GET_SONGS_LOADING_OFF";
export const PLAY_SONGS = "PLAY_SONGS";

export const addToFav = (props) => ({
  type: ADD_TO_FAVOURITE,
  payload: props
});

export const removeFromFav = (props) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: props
});

export const playSongs = (props) => ({
  type: PLAY_SONGS,
  payload: props
});
