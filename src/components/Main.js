import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Accordion,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../axios";
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

function MainComponent() {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchEssays();
  }, []);
  const fetchEssays = async () => {
    setLoader(true);
    try {
      const response = await axios.get("/essays/list");
      setData(response.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoader(false);
    }
  };

  const selectItem = (itemInfo) => {
    setSelectedItem(itemInfo);
    setUpdateModal(true);
  };
  const deleteItem = (deleteItem) => {
    setSelectedItem(deleteItem);
    setDeleteModal(true);
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
  return (
    <>
      <Container className="Container">
        <Row className="Header">
          <Col>
            <h2>Essays List</h2>
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={() => setCreateModal(true)}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {data &&
              data.length > 0 &&
              data.map((item, id) => (
                <Accordion className="Essay-List">
                  <Accordion.Item eventKey={id}>
                    <Accordion.Header>
                      <Col xs={9}>{item.title}</Col>
                      <Col>
                        <FaEdit onClick={() => selectItem(item)} />
                      </Col>
                      <Col>
                        <AiOutlineDelete onClick={() => deleteItem(item)} />
                      </Col>
                    </Accordion.Header>
                    <Accordion.Body style={{ fontStyle: "oblique" }}>
                      {item.content}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
          </Col>
        </Row>
      </Container>
      {createModal && (
        <Create
          fetchEssays={fetchEssays}
          modalOpen={createModal}
          setModalOpen={setCreateModal}
        />
      )}
      {updateModal && (
        <Update
          fetchEssays={fetchEssays}
          modalOpen={updateModal}
          setModalOpen={setUpdateModal}
          selectedItem={selectedItem}
        />
      )}
      {deleteModal && (
        <Delete
          fetchEssays={fetchEssays}
          modalOpen={deleteModal}
          setModalOpen={setDeleteModal}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
}

export default MainComponent;
