import React from "react";
import { Card, Button } from "react-bootstrap";

class HomeCard extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem", display:"inline-block", margin:"5px"}}>
        <Card.Img variant="top" src={this.props.fruit.image} style={{height:"12rem"}} />
        <Card.Body>
          <Card.Title>{this.props.fruit.name}</Card.Title>
          <Card.Text>Price : {this.props.fruit.price}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              this.props.addToFav(
                this.props.fruit.name,
                this.props.fruit.image,
                this.props.fruit.price
              );
            }}
          >
            Add to Favourite
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default HomeCard;
