import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import LoginNav from '../Nav/LoginNav'
import './LoginPage.css'
import ApiService from "../../services/api-service";
import Context from "../../Context";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  static contextType = Context;

  onLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/home'
    history.push(destination)
  }

  render() {
    return (
      <>
      <LoginNav />
      <section className='LoginPage'>
      <div className="success-alert">
        </div>
        <h2>Welcome to Hitchcocktober</h2>
        <p>Please login below</p>
        <LoginForm
          onLoginSuccess={this.onLoginSuccess}
        />
      </section>
      </>
    )
  }
}
