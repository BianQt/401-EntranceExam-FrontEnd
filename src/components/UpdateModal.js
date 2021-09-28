import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

class UpdateModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Fruit!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.updateFruit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" defaultValue={this.props.fruit.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" name="image" defaultValue={this.props.fruit.image} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" defaultValue={this.props.fruit.price} />
            </Form.Group>
            
            <Button variant="primary" type="submit" >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;
