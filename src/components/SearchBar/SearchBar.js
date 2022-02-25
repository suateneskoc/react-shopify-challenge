import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { ExclamationCircleFill, Search } from "react-bootstrap-icons";
import { MovieStore, ACTIONS } from "../../store/MovieStore";

function SearchBar() {
  const { movieStore, dispatch } = useContext(MovieStore);
  const [movieNotFound, setMovieNotFound] = useState(false);
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function genreIDtoName(array) {
    if (array) {
      return array.map((genreID) => {
        return movieStore.genres.find((genre) => genre.id === genreID).name;
      });
    }
    return [];
  }

  useEffect(() => {
    const fetchOMDB = async () => {
      return await fetch(
        `https://www.omdbapi.com/?apikey=47c5b595&type=movie&s=${term}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.Response === "False") {
            setMovieNotFound(true);
            setSearchResults([]);
          } else {
            setMovieNotFound(false);
            setSearchResults([...data.Search]);
          }
        });
    };
    if (term) {
      fetchOMDB();
    }
  }, [term]);

  useEffect(() => {
    const fetchTMDB = async () => {
      let tmdb = await Promise.all(
        searchResults.map(async (movie) => {
          return await fetch(
            `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=72099f54bc09fe83bc5b888cfee69c02&external_source=imdb_id`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.movie_results.length) {
                return data.movie_results[0];
              }
            });
        })
      );
      tmdb = tmdb.filter((movie) => {
        return movie ? true : false;
      });
      const mergeByTitle = (array1, array2) => {
        return array1.map((movie) => {
          const match = array2.find(
            (item) => movie.Title === item.original_title
          );
          return {
            ...match,
            ...movie,
            genres:
              match && match.genre_ids ? genreIDtoName(match.genre_ids) : [],
          };
        });
      };
      dispatch({
        type: ACTIONS.UPDATE_SEARCH_RESULTS,
        payload: mergeByTitle(searchResults, tmdb),
      });
    };

    if (searchResults.length) fetchTMDB();
    else {
      dispatch({
        type: ACTIONS.UPDATE_SEARCH_RESULTS,
        payload: [],
      });
    }
  }, [searchResults]);

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} sm={9} md={8} lg={6} xxl={5}>
          <h2 className="display-5 text-center mb-4">
            Search Movies on <span className="nowrap">Open Movie Database</span>
          </h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setTerm(input);
            }}
          >
            <InputGroup className="mb-5">
              <FormControl
                size="lg"
                placeholder="Search movies"
                aria-label="Search movies"
                aria-describedby="search-button"
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" variant="primary" id="search-button">
                <Search />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {movieNotFound ? (
        <Row>
          <Col>
            <Alert variant="danger">
              <Alert.Heading>
                <ExclamationCircleFill className="mb-1"/> Movie Not Found
              </Alert.Heading>
              {`Sorry, but there are no movies in Open Movie Database matched with keyword: "${term}". Check your spelling or try to search for another movie.`}
            </Alert>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default SearchBar;
