import { createContext, useReducer } from "react";

export const ACTIONS = {
  UPDATE_SEARCH_RESULTS: "UPDATE_SEARCH_RESULTS",
  ADD_MOVIE: "ADD_MOVIE",
  REMOVE_MOVIE: "REMOVE_MOVIE",
};

const INITIAL_STATE = {
  nominees: [],
  searchResults: [],
};

export const MovieStore = createContext(INITIAL_STATE);

function movieReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_SEARCH_RESULTS:
      //console.log(action.payload, "results");
      console.log(
        {
          ...state,
          searchResults: [...action.payload],
        },
        "New state"
      );
      return {
        ...state,
        searchResults: [...action.payload],
      };
    case ACTIONS.ADD_MOVIE:
      fetch(
        `https://api.themoviedb.org/3/find/${action.payload.imdbID}?api_key=72099f54bc09fe83bc5b888cfee69c02$external_source=imdb_id`
      )
        .then((response) => response.json())
        .then((data) => console.log(data, "response from TMDB"));
      return {
        ...state,
        nominees: [...state.nominees, { ...action.payload }],
      };
    case ACTIONS.REMOVE_MOVIE:
      return {
        ...state,
        nominiees: state.nominees.filter((movie) => {
          return movie.imdbID === action.payload ? false : true;
        }),
      };
    default:
      return state;
  }
}

function MovieStoreProvider({ children }) {
  const [store, dispatch] = useReducer(movieReducer, INITIAL_STATE);

  return (
    <MovieStore.Provider value={{ movieStore: store, dispatch: dispatch }}>
      {children}
    </MovieStore.Provider>
  );
}

export default MovieStoreProvider;
