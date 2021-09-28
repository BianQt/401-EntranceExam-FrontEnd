import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import HomeCard from "./HomeCard";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsArray: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/fruits`)
      .then((foundFruits) => {
        console.log(foundFruits);
        this.setState({
          fruitsArray: foundFruits.data.fruits,
        });
      })
      .catch((err) => {
        console.log("Something wen1 wrong!");
        console.log(err);
      });
  };

  addToFav = (name, image, price) => {
    const reqBody = {
      name: name,
      image: image,
      price: price,
      email: this.props.auth0.user.email,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER}/fruits`, reqBody)
      .then((addedFruit) => {
        console.log(addedFruit);
      })
      .catch((err) => {
        console.log("Something wen1 wrong!");
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>API Fruits</h1>
        {this.state.fruitsArray.map((fruit) => {
          return <HomeCard fruit={fruit} addToFav={this.addToFav} />;
        })}
      </>
    );
  }
}

export default withAuth0(Home);
