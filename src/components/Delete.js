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
import { useEffect, useState } from "react";
import axios from "../axios";

function DeleteComponent({
  modalOpen,
  setModalOpen,
  selectedItem,
  fetchEssays,
}) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const deleteEssay = async () => {
    setLoader(true);
    try {
      const id = selectedItem.id;
      await axios.delete("/essays/delete", {
        data: {
          id: id,
        },
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
      <Container>
        <Alert variant="danger">
          <Alert.Heading>You got an error!</Alert.Heading>
          <p>Please try again.</p>
        </Alert>
      </Container>
    );

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete the essay?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    {" "}
                    Press 'Yes' to delete the essay and 'No' to go back.
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEssay}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteComponent;
