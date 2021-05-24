import React, { Component } from "react";

const Exchange = React.lazy(() => import('./component/exchange/exchange'));

class App extends Component {
  render() {
    return <Exchange />
  }
}

export default App;