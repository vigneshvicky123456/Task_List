import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import { Row,Col,Container } from "react-bootstrap";
import TasksList from "./components/TasksList";

function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col  lg="6">
          <AddTask />
          <TasksList/>
        </Col>
      </Row>
    </Container>
  );
};

export default App;