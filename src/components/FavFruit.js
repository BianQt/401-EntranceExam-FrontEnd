import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import FavFruitCard from "./FavFruitCard";
import UpdateModal from "./UpdateModal";

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favFruitsArray: [],
      showUpdateModal: false,
      selectedFruit: {},
    };
  }

  updateFruit = (e) => {
    e.preventDefault();
    const reqBody = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value,
      email: this.props.auth0.user.email,
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER}/fruits/${this.state.selectedFruit._id}`,
        reqBody
      )
      .then((updatedFruit) => {
        const newFruitArray = this.state.favFruitsArray.map((fruit) => {
          if (fruit._id === updatedFruit.data._id) {
            fruit = updatedFruit.data;
            return fruit;
          }
          return fruit;
        });

        this.setState({
          favFruitsArray: newFruitArray,
          selectedFruit: {},
        });
        this.closeUpdateModal();
      })
      .catch((err) => {
        console.log("Something wen1 wrong!");
        console.log(err);
      });
  };

  showUpdateModal = (obj) => {
    this.setState({
      showUpdateModal: true,
      selectedFruit: obj,
    });
  };

  closeUpdateModal = () => {
    this.setState({
      showUpdateModal: false,
    });
  };

  deleteFruit = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/fruits/${id}`)
      .then((deletedFruit) => {
        if (deletedFruit.data.deletedCount === 1) {
          let newFruitArray = this.state.favFruitsArray.filter(
            (fruit) => fruit._id !== id
          );
          console.log(newFruitArray);
          this.setState({
            favFruitsArray: newFruitArray,
          });
        }
      })
      .catch((err) => {
        console.log("Something wen1 wrong!");
        console.log(err);
      });
  };

  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/userFruits/${this.props.auth0.user.email}`
      )
      .then((foundFruits) => {
        console.log("fav", foundFruits);
        this.setState({
          favFruitsArray: foundFruits.data,
        });
      })
      .catch((err) => {
        console.log("Something wen1 wrong!");
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>

        {this.state.favFruitsArray.length &&
          this.state.favFruitsArray.map((fruit) => {
            return (
              <FavFruitCard
                fruit={fruit}
                deleteFruit={this.deleteFruit}
                showUpdateModal={this.showUpdateModal}
              />
            );
          })}
        {this.state.showUpdateModal && (
          <UpdateModal
            show={this.state.showUpdateModal}
            fruit={this.state.selectedFruit}
            updateFruit={this.updateFruit}
            closeUpdateModal={this.closeUpdateModal}
          />
        )}
      </>
    );
  }
}

export default withAuth0(FavFruit);
