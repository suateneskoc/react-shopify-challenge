import { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { MovieStore, ACTIONS } from "../../store/MovieStore";

function SearchResults() {
  const { movieStore, dispatch } = useContext(MovieStore);
  {
    console.log(movieStore, "store inside result");
  }
  return movieStore.searchResults.length === 0 ? null : (
    <>
      <h3>Search Results</h3>
	  <hr className="mb-4" />
      <Row>
        {movieStore.searchResults.map((movie) => {
          console.log(movie);
          return (
            <Col key={movie.imdbID} xs={6} md={4} xl={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.Poster}></Card.Img>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ({movie.Year})
                  </Card.Subtitle>
                  <Button
                    varian="primary"
                    onClick={() => {
                      dispatch({
                        type: ACTIONS.ADD_MOVIE,
                        payload: { ...movie },
                      });
                    }}
                  >
                    Nominate
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default SearchResults;
