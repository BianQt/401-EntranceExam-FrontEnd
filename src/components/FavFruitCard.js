import React from "react";
import { Card, Button } from "react-bootstrap";

class FavFruitCard extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem", display: "inline-block", margin: "5px" }}>
        <Card.Img
          variant="top"
          src={this.props.fruit.image}
          style={{ height: "12rem" }}
        />
        <Card.Body>
          <Card.Title>{this.props.fruit.name}</Card.Title>
          <Card.Text>Price : {this.props.fruit.price}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              this.props.showUpdateModal(this.props.fruit);
            }}
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              this.props.deleteFruit(this.props.fruit._id);
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default FavFruitCard;
