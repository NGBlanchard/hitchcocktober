import React from "react";
import Context from "../../Context";
import StarRatingComponent from "react-star-rating-component";

import "./Rating.css";

export default class Rating extends React.Component {
  state = {
    checked: false,
    rating: 0,
  }

  static contextType = Context;

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  onCheckAction(){
    this.setState({ checked: !this.state.checked })

  }

  render() {
    const { rating } = this.state;
    return (
      <section className="rating">
        <label className="yes">Seen it?</label>
        <span className="checkbox" onClick={this.onCheckAction.bind(this)}>
          <input
            onChange={this.onCheckAction.bind(this)}
            type="checkbox"
            className="checkbox"
            checked={this.state.checked}
          />
          <span className="chex"></span>
        </span>
        <p>Rating: {rating} /5</p>
        <StarRatingComponent
          name="rate"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
          emptyStarColor={"beige"}
          starColor={"rgba(255, 140, 0, 0.803)"}
        />
      </section>
    );
  }
}
