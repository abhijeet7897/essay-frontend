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

function UpdateComponent({
  fetchEssays,
  modalOpen,
  setModalOpen,
  selectedItem,
}) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(selectedItem.title);
  const [content, setContent] = useState(selectedItem.content);

  const updateEssay = async () => {
    setLoader(true);
    try {
      const id = selectedItem.id;
      await axios.put("/essays/update", {
        id,
        title: title,
        content: content,
        updatedAt: new Date(),
      });
      fetchEssays();
      setModalOpen(false);
      setLoader(false);
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
        <Modal.Title>Update Essay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Essay"
                  defaultValue={selectedItem.title}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  onChange={(e) => setContent(e.target.value)}
                  as="textarea"
                  rows={3}
                  defaultValue={selectedItem.content}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={updateEssay}>
          Update
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateComponent;
