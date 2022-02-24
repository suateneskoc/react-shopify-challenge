import { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { MovieStore, ACTIONS } from "../../store/MovieStore";
import Masonry from "react-masonry-component";

import "./SearchResults.css";

function SearchResults() {
  const { movieStore, dispatch } = useContext(MovieStore);
  return movieStore.searchResults.length === 0 ? null : (
    <>
      <h3>Search Results</h3>
      <hr className="mb-4" />
      <Masonry className="row">
        {movieStore.searchResults.map((movie) => {
          return (
            <Col key={movie.imdbID} sm={6} lg={4} xl={3} className="mb-4">
              <Card className="hoverable-card">
                {movie.Poster !== "N/A" ? (
                  <Card.Img variant="top" src={movie.Poster}></Card.Img>
                ) : null}
                <Card.Body>
                  <Card.Title>
                    {movie.Title}
                    <small className="text-muted"> ({movie.Year})</small>
                  </Card.Title>
                  {movie.genres ? (
                    <Card.Subtitle className="mb-2 text-muted text-truncate">
                      {movie.genres.join(", ")}
                    </Card.Subtitle>
                  ) : null}
                  {movie.overview ? (
                    <Card.Text className="truncate-3-lines mb-2">
                      {movie.overview}
                    </Card.Text>
                  ) : null}

                  <Row className="justify-content-between">
                    {movie.vote_average ? (
                      <Col className="d-flex flex-row align-items-center">
                        <img
                          className="imdb-logo me-2"
                          src="/imdb-logo.svg"
                          alt="IMDb logo"
                        />
                        <StarFill className="text-warning me-1" />
                        <p className="lh-1 font-monospace mt-1 mb-0">
                          {movie.vote_average}
                        </p>
                      </Col>
                    ) : null}

                    <Col xs="auto" className="ms-auto">
                      {movieStore.nominees.find(
                        (existingMovie) => movie.Title === existingMovie.Title
                      ) ? (
                        <Button variant="secondary" size="sm" disabled>
                          Nominated
                        </Button>
                      ) : movieStore.nominees.length === 5 ? (
                        <Button variant="secondary" size="sm" disabled>
                          Out of slots
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            dispatch({
                              type: ACTIONS.ADD_MOVIE,
                              payload: { ...movie },
                            });
                          }}
                        >
                          Nominate
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Masonry>
    </>
  );
}

export default SearchResults;
