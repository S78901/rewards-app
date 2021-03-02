import React from 'react';
import './App.css';
import ListComponent from './components/listComponent';
import DetailComponent from './components/detailComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listBool: true,
      theIndex: ''
    };
    this.listClick = this.listClick.bind(this);
    this.selectBack = this.selectBack.bind(this);
  }

  listClick(e) {
    const eventVal = e.target.id;
    this.setState({
      listBool: false,
      theIndex: eventVal
    });
  }
  selectBack() {
    this.setState({
      listBool: true,
      theIndex: ''
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {(this.state.listBool) ?
            <Switch>
              <Route path="/" component={(props) => (<ListComponent {...props} listClick={this.listClick} />)} />
            </Switch>
            :
            <Switch>
              <Route path="/character/*" component={(props) => (<DetailComponent {...props} theIndex={this.state.theIndex} selectBack={this.selectBack} />)} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
