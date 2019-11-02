import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/Utils/PrivateRoute";
import PublicOnlyRoute from "./components/Utils/PublicOnlyRoute";
import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import List from "./components/List/List";
import Stats from "./components/Stats/Stats";
import About from "./components/About/About";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Context from "./Context";
import ApiService from "./services/api-service";
import config from "./config";
import TokenService from "./services/token-service";

const userId = TokenService.getUserId();

class App extends React.Component {
  state = {
    userData: {},
    hasError: false,
    error: null
  };
  static contextType = Context;

  componentDidMount() {
    ApiService.getUserData()
    .then(res => this.context.setBigObj(res))
}

  // componentDidMount() {
  //   ApiService.getMovies().then(res => this.context.setList(res));
  //   ApiService.getUserData().then(res => this.context.setBigObj(res));

  // }

  render() {
    return (
      <>
        <div className="App">
          <main className="App__main">
            {this.state.hasError && (
              <p className="red">There was an error. Reconsider everything.</p>
            )}
            <Switch>
              <PrivateRoute exact path={"/home"} component={Home} />
              <PublicOnlyRoute
                restrictied={false}
                exact
                path={"/login"}
                component={LoginPage}
              />
              <PublicOnlyRoute
                restrictied={true}
                path={"/register"}
                component={RegistrationPage}
              />

              <PrivateRoute path={"/calendar"} component={Calendar} />

              <PrivateRoute path={"/list"} component={List} />
              <PrivateRoute path={"/stats"} component={Stats} />
              <Route path={"/about"} component={About} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </>
    );
  }
}

export default App;
