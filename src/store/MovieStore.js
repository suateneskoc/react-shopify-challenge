import { createContext, useEffect, useReducer } from "react";

export const ACTIONS = {
  UPDATE_GENRES: "UPDATE_GENRES",
  UPDATE_SEARCH_RESULTS: "UPDATE_SEARCH_RESULTS",
  ADD_MOVIE: "ADD_MOVIE",
  REMOVE_MOVIE: "REMOVE_MOVIE",
};

const INITIAL_STATE = {
  genres: [],
  nominees: [],
  searchResults: [],
};

export const MovieStore = createContext(INITIAL_STATE);

function movieReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_GENRES:
      return {
        ...state,
        genres: [...action.payload],
      };
    case ACTIONS.UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [...action.payload],
      };
    case ACTIONS.ADD_MOVIE:
      return {
        ...state,
        nominees: [...state.nominees, { ...action.payload }],
      };
    case ACTIONS.REMOVE_MOVIE:
      return {
        ...state,
        nominees: state.nominees.filter((movie) => {
          return movie.imdbID !== action.payload;
        }),
      };
    default:
      return state;
  }
}

function MovieStoreProvider({ children }) {
  const [store, dispatch] = useReducer(movieReducer, INITIAL_STATE);

  // Get genre names paired with ids from a different API endpoint
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=72099f54bc09fe83bc5b888cfee69c02`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTIONS.UPDATE_GENRES,
          payload: [...data.genres],
        });
      });
  }, []);

  return (
    <MovieStore.Provider value={{ movieStore: store, dispatch: dispatch }}>
      {children}
    </MovieStore.Provider>
  );
}

export default MovieStoreProvider;
