import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import './App.scss';

// Import Components
import Helmet from 'react-helmet';

// Import Actions
import { toggleAddPost } from './AppActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState(() => ({ isMounted: true })), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    console.log('isMounted ', this.state.isMounted);
    if (!this.state.isMounted) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
          src="https://media.giphy.com/media/fxzFm2JmPKW6A9Tuv8/giphy.gif" 
          alt="load_process"
          border="0"
                        />
            </div>
        // {/* <div className="se-pre-con"></div> */}
      );
    } else {
      return (
        <div>
          {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
          <div>
            <Helmet
              title="Causeway Live"
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />
            <div className="container">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
