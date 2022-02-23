import { useContext } from "react";
import { Card, Button, Placeholder } from "react-bootstrap";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieStore, ACTIONS } from "../../store/MovieStore";

import "swiper/css";
import "swiper/css/bundle";
import "./NomineeList.css";

function NomineeList() {
  const { movieStore, dispatch } = useContext(MovieStore);

  return (
    <>
      <Swiper
        module={[Navigation, Pagination]}
        navigation
        pagination
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          480: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
          1400: { slidesPerView: 5 },
        }}
      >
        <SwiperSlide>
          <NomineeSlide movies={movieStore.nominees} index={0} />
        </SwiperSlide>
        <SwiperSlide>
          <NomineeSlide movies={movieStore.nominees} index={1} />
        </SwiperSlide>
        <SwiperSlide>
          <NomineeSlide movies={movieStore.nominees} index={2} />
        </SwiperSlide>
        <SwiperSlide>
          <NomineeSlide movies={movieStore.nominees} index={3} />
        </SwiperSlide>
        <SwiperSlide>
          <NomineeSlide movies={movieStore.nominees} index={4} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default NomineeList;

function NomineeSlide({ movies, index }) {
  return (
    <Card>
      {index < movies.length ? (
        <>
          <Card.Img variant="top" src={movies[index].Poster}></Card.Img>
          <Card.Body>
            <Card.Title>{movies[index].Title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              ({movies[index].Year})
            </Card.Subtitle>
			<Button size="sm" variant="danger">Remove</Button>
          </Card.Body>
        </>
      ) : (
        <>
          <Card.Img variant="top" src="poster-placeholder.png"></Card.Img>
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={9} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="wave" className="mb-2">
              <Placeholder xs={4} />
            </Placeholder>
			<Placeholder.Button size="sm" variant="danger" xs={3} sm={4} />
          </Card.Body>
        </>
      )}
    </Card>
  );
}
