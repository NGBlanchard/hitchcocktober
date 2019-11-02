import React from "react";
import Nav from "../Nav/Nav";
import Context from "../../Context";
import Rating from "../Rating/Rating";
import TokenService from "../../services/token-service";
import MovieCard from "../MovieCard/MovieCard";
import config from "../../config";
import "./Home.css";

const userId = TokenService.getUserId();

export default class Home extends React.Component {
  state = {
    userData: {}
  };
  static contextType = Context;

  componentDidMount() {
      fetch(`${config.API_ENDPOINT}/users/${userId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => this.context.setBigObj(res))
  }

  renderlist() {
    const stringId = TokenService.getUserId();
    const userId = parseInt(stringId, 10);
    return this.context.list.map(movie => (
      <MovieCard
        key={movie.id}
        title={movie.original_title}
        movie={movie}
        userId={userId}
      />
    ));
  }

  render() {
    const { user_name } = this.context.bigObj;
    return (
      <>
        <Nav />
        <h1 className="greeting">Hello, {user_name}</h1>
        <section className="home-list">{this.renderlist()}</section>
        <Rating />
      </>
    );
  }
}
