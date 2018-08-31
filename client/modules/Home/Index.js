import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styles from './style.scss';
import READ_RIGHT from '../../images/red_light.gif';
import WEATHER_ICON from '../../images/icon_weather.png';
import CURRENCY_ICON from '../../images/icon_currency.png';
import { CDNFlagIcon  } from 'react-flag-kit';
import Button from '@material-ui/core/Button';
import RepeatIcon from '@material-ui/icons/Repeat';
import PinDropIcon from '@material-ui/icons/PinDrop';
import VideocamIcon from '@material-ui/icons/Videocam';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { onLoadRate } from './HomeActions';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#008de6' }, // Purple and green play nicely together.
    secondary: { main: '#ffffff' }, // This is just green.A700 as hex.
  },
});

class Index extends Component {
    /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.dispatch(onLoadRate());
  }

  render() {
    const { loading_rate, error_rate, rate } = this.props;
    let MYR = '';
    let USD = '';
    if (!loading_rate && rate !== undefined) {
      MYR = rate.MYR;
      USD = rate.USD;
    }
    console.log('props in Index ', this.props);
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <div className="main-frame">
            <div className="top-div">
              <div className="top-title">Causeway Live Traffic | Weather</div>
              <div className="traffic">
                <div className="image-wrapper"><img src={READ_RIGHT} alt="traffic light" /></div>
                <div className="traffic-text">
                  <div>Singapore -> Malaysia</div>
                  <div>EST 45 min (<span className="traffic-type" style={{ color: 'red' }}>Heavy Traffic</span>)</div>
                </div>
              </div>
              <div className="weather">
                <div className="weather-text">
                  <div>Thursday 12:00 PM</div>
                  <div>Mostly Cloudy 30</div>
                </div>
                <div className="weather-icon"><img src={WEATHER_ICON} alt="weather icon" /></div>
              </div>
            </div>

            <div className="currency">
              <div><img src={CURRENCY_ICON} alt="Currency Icon" /></div>
              <div className="currency-text">1 SGD - MYR {MYR} / USD {USD}</div>
            </div>
          </div>

          <div className="bottom-frame">
            <div className="destination">
              <div className="destination-text">Destination</div>
              <div className="flags">
                <CDNFlagIcon  code="SG" size={48} />
                &nbsp;&nbsp;<strong>></strong>&nbsp;&nbsp;
                <CDNFlagIcon  code="MY" size={48} />
              </div>
            </div>

            <div className="from-to">
              <div className="from-to-group">
                <div style={{ textAlign: 'right' }}>
                  <p>from:</p>
                  <h3 className="from-place">Singapore</h3>
                </div>
                <div className="switch-wrapper">
                  <MuiThemeProvider theme={theme}>
                    <Button className="btn-switch" variant="contained" color="secondary">
                      <RepeatIcon />
                    </Button>
                  </MuiThemeProvider>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p>to:</p>
                  <h3 className="to-place">Malaysia</h3>
                </div>
              </div>
              <div className="button-group">
                <MuiThemeProvider theme={theme}>
                  <Button className="btn-view-map" variant="contained" color="primary">
                    <PinDropIcon />
                    View Map
                  </Button>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                  <Button className="btn-live-cam" variant="contained" color="primary">
                    <VideocamIcon />
                    Live Cam
                  </Button>
                </MuiThemeProvider>
              </div>
            </div>

            <div className="adsense">
              <div>ADSENSE DIV</div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
      rate: state.home.rate,
      loading_rate: state.home.loading_rate,
      error_rate: state.home.error_rate,
  };
}

Index.propTypes = {
  rate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
  ]),
  onLoadRate: PropTypes.func,
};

export default connect(mapStateToProps)(Index);
