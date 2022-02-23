import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { MovieStore, ACTIONS } from "../../store/MovieStore";

function SearchBar() {
  const { movieStore, dispatch } = useContext(MovieStore);
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");
  //const [data, setData] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    setTerm(input);
  }

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=47c5b595&type=movie&s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.Response === "True") {
          let movies = data.Search.map((movie) => {
            fetch(
              `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=72099f54bc09fe83bc5b888cfee69c02&external_source=imdb_id`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data, "movie data from OMDB");
                movie = { ...movie, ...data.movieResults[0] };
                return movie;
              });
          });
          dispatch({
            type: ACTIONS.UPDATE_SEARCH_RESULTS,
            payload: [...movies],
          });
        }
      });
  }, [term]);

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup className="mb-5">
        <FormControl
          size="lg"
          placeholder="Search a movie"
          aria-label="Search a movie"
          aria-describedby="search-button"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary" id="search-button">
          <Search />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
