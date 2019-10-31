import React from "react";
import Context from "../../Context";
import ApiService from "../../services/api-service";
import { Redirect } from 'react-router-dom'


import "./MovieCard.css";

export default class MovieCard extends React.Component {
  state = {
    toCalendar: false,
    dayNum: null
  };
  static contextType = Context;

  onChange = e => {
    this.setState({
      dayNum: e.target.value
    });
  };

  

  handleClick = event => {
    event.preventDefault();
    const movie = this.context.list.filter(movie => {
      return movie.id === this.props.movie.id;
    });
    const day = {
      movie_id: movie[0].id,
      movie: movie[0].title,
      rating: 0,
      poster_path: movie[0].poster_path,
      user_id: this.props.userId
    };
    const finPatch = {};
    finPatch[`oct${this.state.dayNum}`] = day;
    const movieDay = [`oct${this.state.dayNum}`] 
    
  //   var p = Promise.resolve(ApiService.patchDay(finPatch));
    
  //   const callContext = () => {
  //     this.context.updateBigObj(finPatch, movieDay)
  //  }

  //   p.then(function(v) {
  //     callContext(finPatch, movieDay)
  //   })

    ApiService.patchDay(finPatch);
    this.context.updateBigObj(finPatch, movieDay, day);
    

    // this.setState(() => ({
    //   toCalendar: true
    // }))
  };

  render() {
    if (this.state.toCalendar === true) {
      return <Redirect to='/calendar' />
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
              <option value="">Add Movie to Date</option>
              {days.map((day, index) => (
                <option value={day} key={index}>
                  October {day}
                </option>
              ))}
            </select>
            <button className="card-submit" onClick={this.handleClick}>
              Update
            </button>
            <p className="overview'">{this.props.movie.overview}</p>
            {/* <h4>Released: {this.props.movie.release_date}</h4> */}
          </span>
        </div>
      </section>
    );
  }
}
