import {
  Form,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import axios from "../axios";

function CreateComponent({
  fetchEssays,
  modalOpen,
  setModalOpen,
  selectedItem,
}) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const createEssay = async () => {
    setLoader(true);
    try {
      await axios.post("/essays/create", {
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      fetchEssays();
      setLoader(false);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoader(false);
    }
  };

  if (loader)
    return (
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Col xs={2}>
            <Spinner animation="grow" variant="primary" />
          </Col>
        </Row>
      </Container>
    );

  if (error)
    return (
      <Alert variant="danger">
        <Alert.Heading>You got an error!</Alert.Heading>
        <p>Please try again.</p>
      </Alert>
    );

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Modal show={modalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Essay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Essay"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  onChange={(e) => setContent(e.target.value)}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={createEssay}>
          Add
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateComponent;
