import React from 'react';
import MovieCard from '../MovieCard/MovieCard'
import Nav from '../Nav/Nav'
import Context from '../../Context'
import TokenService from '../../services/token-service'

import './List.css'

export default class List extends React.Component {
  static contextType = Context

  

  renderlist() {
///OK THIS IS LOGIC FOR RENDERING USER'S DAYS BUT YOU CAN
// APPLY THIS TO THE MOVIE LIST TOO
    const userDays = []
    for (let [key, value] of Object.entries(this.context.bigObj)) {
      if (key.includes("oct")) {
        userDays.push(value)
      }
    }


    const stringId = TokenService.getUserId();
    const userId = parseInt(stringId, 10);
    const {oct1} = this.context.bigObj
    const movieList = []
    // for (let i =0; i < Object.keys(this.context.bigObj).length; i++) {
    //   if (this.context.bigObj[i].includes('oct')) {
    //     movieList.push(this.context.bigObj[i])
    //   } 
    // }
  

    // return (
    //   this.context.bigObj.map(movie =>
    //   <MovieCard
    //     key={movie.id}
    //     title={movie.original_title}
    //     movie={movie}
    //     userId={userId}
    //   />
    //     )
    // )
  }

  render() {
    return (
      <>
        <Nav />
        <header className="list-header">
          Hitchcock's Movies
        </header>
        <section className="movie-list">
          {this.renderlist()}
        </section>
      </>
      )
    
  }

}