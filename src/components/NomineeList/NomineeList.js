import { useContext, useEffect, useRef } from "react";
import { Row, Col, Card, Button, Placeholder } from "react-bootstrap";
import { StarFill, PlusSquareDotted } from "react-bootstrap-icons";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieStore, ACTIONS } from "../../store/MovieStore";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./NomineeList.css";

function NomineeCard({ movie }) {
  const { movieStore, dispatch } = useContext(MovieStore);

  return (
    <Card className="mb-5">
      <Card.Img variant="top" src={movie.Poster}></Card.Img>
      <Card.Body>
        <Card.Title className="text-truncate">
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
            <Button
              variant="link"
              className="link-danger p-0 b-0"
              onClick={() =>
                dispatch({
                  type: ACTIONS.REMOVE_MOVIE,
                  payload: movie.imdbID,
                })
              }
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function NomineeList() {
  const { movieStore, dispatch } = useContext(MovieStore);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    if (movieStore.nominees.length === 5) {
      shareButtonRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
    }
  }, [movieStore]);

  return (
    <>
      <Row className="justify-content-center">
        <Col xl={9}>
          <h1 className="display-3 text-center text-white lh-base mb-5">
            Pick Your Nominees for{" "}
            <span className="nowrap">Best Movie Award</span>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-between align-items-end text-light">
        <Col>
          <h2 className="mb-0">Your Nominees</h2>
        </Col>
        <Col xs="auto">
          <div className="fs-5 font-monospace lh-sm">
            {movieStore.nominees.length}/5
          </div>
        </Col>
      </Row>
      <hr className="text-white mb-4" />
      <Row className="justify-content-center">
        <Col xs={9} sm={12}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination
            centerInsufficientSlides
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
              1400: { slidesPerView: 4 },
            }}
          >
            {movieStore.nominees.length ? (
              movieStore.nominees.map((item) => (
                <SwiperSlide key={item.imdbID}>
                  <NomineeCard movie={item} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Card className="mb-5">
                  <div className="aspect-ratio-2by3 bg-secondary bg-opacity-10">
                    <div className="aspect-ratio-inside d-flex flex-column justify-content-center align-items-center">
                      <div className="display-1 text-muted">
                        <PlusSquareDotted className="mb-3" />
                      </div>
                      <div className="small text-muted">
                        Search movies and add to your list
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="wave">
                      <Placeholder xs={9} />
                    </Placeholder>
                    <Placeholder
                      as={Card.Subtitle}
                      animation="wave"
                      className="mb-2"
                    >
                      <Placeholder xs={4} />
                    </Placeholder>
                    <Placeholder
                      as={Card.Text}
                      animation="wave"
                      className="mb-2"
                    >
                      <Placeholder xs={12} />
                      <Placeholder xs={12} />
                      <Placeholder xs={9} />
                    </Placeholder>
                    <div className="d-flex flex-row justify-content-between pt-2 pb-1">
                      <Placeholder xs={5} bg="warning" />
                      <Placeholder xs={4} bg="danger" />
                    </div>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            )}
          </Swiper>
        </Col>
      </Row>

      {movieStore.nominees.length === 5 ? (
        <div className="d-flex flex-column align-items-center text-light pt-3">
          <div className="display-5">Well done!</div>
          <p>Share your list on socila media.</p>
          <Button variant="primary" ref={shareButtonRef}>
            Share
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default NomineeList;
