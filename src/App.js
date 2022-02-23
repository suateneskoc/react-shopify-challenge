import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./logo.svg";
import MovieStoreProvider, { MovieStore, ACTIONS } from "./store/MovieStore";
import NomineeList from "./components/NomineeList/NomineeList";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  const { movieStore, dispatch } = useContext(MovieStore);
  console.log(movieStore, "store inside app");
  return (
    <div className="App">
      <MovieStoreProvider>
        <div className="bg-dark bg-graident py-5">
          <Container>
            <h1 className="display-3 text-center text-white lh-base mb-5">Pick Your Nominees for <span className="nowrap">Best Movie Award</span></h1>
			<h2 className="text-light">Nominees</h2>
            <hr className="text-white mb-4" />
            <NomineeList />
          </Container>
        </div>
        <div className="bg-light py-5">
          <Container>
            <h2 className="display-5 text-center mb-4">Search Movies on <span className="nowrap">Open Movie Database</span></h2>
            <Row className="justify-content-center">
              <Col md={9}>
                <SearchBar />
              </Col>
            </Row>
            <SearchResults />
          </Container>
        </div>
      </MovieStoreProvider>
    </div>
  );
}

export default App;
