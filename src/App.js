import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./logo.svg";
import MovieStoreProvider, { MovieStore, ACTIONS } from "./store/MovieStore";
import NomineeList from "./components/NomineeList/NomineeList";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  //const { movieStore, dispatch } = useContext(MovieStore);
  return (
    <div className="App">
      <MovieStoreProvider>
        <div className="bg-dark bg-graident py-5">
          <Container>
            <NomineeList />
          </Container>
        </div>
        <div className="bg-light py-5">
          <Container>
            <Row className="justify-content-center">
              <Col sm={9} md={8} lg={6} xxl={5}>
                <h2 className="display-5 text-center mb-4">
                  Search Movies on{" "}
                  <span className="nowrap">Open Movie Database</span>
                </h2>
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
