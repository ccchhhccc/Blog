import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, } from 'react-router-dom';
import Head from './components/head/head.jsx'
import Bar from './components/head/bar.jsx'
import Foot from './components/foot/foot.jsx'
import Content from './container/content/content.jsx'
import { connect } from "react-redux";
import Markdown from './components/markdown/markdown'
import visitorMarkdown from './components/markdown/visitorMarkdown'
import Showmd from './components/markdown/showMarkdown'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Head />
        <Bar />
        <Router>
          <div>
            <Route path="/index" component={Content}></Route>
            <Route path="/markdown" component={Markdown}></Route>
            <Route path="/visitorMarkdown" component={visitorMarkdown}></Route>
            <Route path="/showmarkdown/:id" component={Showmd}></Route>
          </div>
        </Router>
        <Foot />
      </div>
    );
  }
  componentDidMount() {
    if (window.location.href.indexOf('index') < 0) {
      let href = window.location.origin + '/#/index/note'
      window.location.href = href
    }

  }
}

//export default App;
export default connect(state => state, (dispatch, props) => {
  return {
  }
})(App);