import React from "react";
import Context from "../../Context";
import ApiService from "../../services/api-service";
import { Redirect } from "react-router-dom";
import "./MovieCard.css";

export default class MovieCard extends React.Component {
  state = {
    checked: false,
    rating: 0,
    toCalendar: false,
    dayNum: null
  };
  static contextType = Context;

  onChange = e => {
    this.setState({
      dayNum: e.target.value
    });
  };

  onCheckAction(){
    this.setState({ checked: !this.state.checked })
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      dayNum: event.target.value
    });
    const movie = this.context.list.filter(movie => {
      return movie.id === this.props.movie.id;
    });
    const day = {
      movie_id: movie[0].id,
      movie: movie[0].title,
      poster_path: movie[0].poster_path,
      seen: this.state.checked,
      user_id: this.props.userId
    };
    const finPatch = {};
    finPatch[`oct${this.state.dayNum}`] = day;
    const movieDay = [`oct${this.state.dayNum}`];
    ApiService.patchDay(finPatch);
    this.context.updateBigObj(finPatch, movieDay, day);
  };

  render() {
    if (this.state.toCalendar === true) {
      return <Redirect to="/calendar" />;
    }
    const days = this.context.octDays;
    return (
      <section className="card-container">
        <div className="flipper">
          <span className="front">
            <img
              src={
                this.props.movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w200${this.props.movie.poster_path}`
                  : "https://dummyimage.com/200x300/000/fff.png&text=No+Poster"
              }
              alt="movie poster"
            />
          </span>
          <span className="back">
            <h3 className="title">{this.props.title}</h3>
            <select className="select" onChange={this.onChange}>
              <option value="">Add Movie to Day</option>
              {days.map((day, index) => (
                <option value={day} key={index}>
                  October {day}
                </option>
              ))}
            </select>
            {/* <h4>Released: {this.props.movie.release_date}</h4> */}
            <button className="card-submit" onClick={this.handleClick}>
              Update
            </button>
            <p className="overview'">{this.props.movie.overview}</p>
          </span>
        </div>
      </section>
    );
  }
}
