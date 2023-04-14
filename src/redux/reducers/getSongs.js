import {
  GET_SONGS,
  GET_SONGS_ERROR,
  GET_SONGS_LOADING_ON,
  GET_SONGS_LOADING_OFF,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  PLAY_SONGS
} from "./../actions/index";

const initialState = {
  favourite: [],
  player: [],
  rock: ["queen", "u2", "thepolice", "eagles"],
  pop: ["maroon5", "coldplay", "onerepublic", "jamesblunt"],
  hiphop: ["eminem", "snoopdogg", "lilwayne", "drake"],
  hasError: false,
  isLoading: false,
  errorMsg: ""
};

const getSongs = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        artists: [...state.artists, action.payload]
      };
    case GET_SONGS_ERROR:
      return {
        ...state,
        hasError: true,
        errorMsg: action.payload
      };
    case GET_SONGS_LOADING_ON:
      return {
        ...state,
        isLoading: true
      };
    case GET_SONGS_LOADING_OFF:
      return {
        ...state,
        isLoading: false
      };
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        favourite: [...state.favourite, action.payload]
      };
    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        favourite: [...state.favourite, action.payload]
      };
    case PLAY_SONGS:
      return {
        ...state,
        player: action.payload
      };
    default:
      return state;
  }
};

export default getSongs;
