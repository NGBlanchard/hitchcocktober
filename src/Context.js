import React from "react";

const Context = React.createContext({
  octDays: [],
  currentDay: null,
  error: null,
  list: [],
  bigObj: {},
  setError: () => {},
  clearError: () => {},
  setCurrentDay: () => {},
  setList: () => {},
  setBigObj: () => {},
  updateBigObj: () => {},
  setOctDays: () => {}
});

export default Context;

export class ContextProvider extends React.Component {
  state = {
    octDays: [],
    currentDay: "",
    list: [],
    bigObj: {},
    error: null
  };

  updateBigObj = (patch, movieDay, day) => {
    const bigObj = Object.assign({}, this.state.bigObj);
    bigObj[movieDay] = day;
    this.setState({ bigObj }, () => null);
  };

  setBigObj = data => {
    this.setState({ bigObj: data }, () => null);
    // for (let [key, value] of Object.entries(this.state.bigObj)) {
    //   if (key.includes("oct")) {
    //     this.setState(
    //       prevState => ({
    //         octDays: [...prevState.octDays, value]
    //       }),
    //       () => null
    //     );
    //   }
    // }
  };

  setList = res => {
    this.setState({
      list: res
    });
  };

  setCurrentDay = day => {
    this.setState({
      currentDay: day
    });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCurrentDay: this.setCurrentDay,
      octDays: this.state.octDays,
      list: this.state.list,
      setList: this.setList,
      bigObj: this.state.bigObj,
      setBigObj: this.setBigObj,
      updateBigObj: this.updateBigObj,
      setOctDays: this.setOctDays
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
