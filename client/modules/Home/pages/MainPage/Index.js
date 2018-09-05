import React, { Component } from 'react';
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import './style.scss';
import RED_RIGHT from '../../../../images/red_light.gif';
import GREEN_RIGHT from '../../../../images/green_light.gif';
import YELLOW_RIGHT from '../../../../images/yellow_light.gif';
import WEATHER_ICON from '../../../../images/icon_weather.png';
import CURRENCY_ICON from '../../../../images/icon_currency.png';
import { CDNFlagIcon  } from 'react-flag-kit';
import Button from '@material-ui/core/Button';
import RepeatIcon from '@material-ui/icons/Repeat';
import PinDropIcon from '@material-ui/icons/PinDrop';
import VideocamIcon from '@material-ui/icons/Videocam';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import moment from 'moment';

import { onLoadRate, onLoadWeather, onLoadMapIFrame, onLoadTrafficInfo } from '../../HomeActions';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#008de6' }, // Purple and green play nicely together.
    secondary: { main: '#ffffff' }, // This is just green.A700 as hex.
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    let routeInfo =localStorage.getItem('route');
    if (routeInfo != null) {
        this.state = JSON.parse(routeInfo);
    } else {
      routeInfo = {
        src: {
          code: 'SG',
          title: 'Singapore',
          path: 'Woodlands+Checkpoint,+21+Woodlands+Crossing,+738203',
          place_id: 'ChIJcax8Ev0S2jER7fTRxrPHz2w',
        },
        dst: {
          code: 'MY',
          title: 'Malaysia',
          path: 'Sultan+Iskandar+Complex+Customs,+Jalan+Jim+Quee,+Bukit+Chagar,+80300+Johor+Bahru,+Johor,+Malaysia',
          place_id: 'ChIJ4-MEgNwS2jERPDLDNgWnENA',
        }
      }
      this.state = routeInfo;
      localStorage.setItem('route', routeInfo);
    }

    this.switchLocation = this.switchLocation.bind(this);
  }

  switchLocation() {
    let temp = this.state.src;
    let src = this.state.dst;
    let dst = temp;
    let routeInfo = {src: this.state.dst, dst: temp};
    this.setState(routeInfo);
    localStorage.setItem('route', JSON.stringify(routeInfo));
    this.props.dispatch(onLoadTrafficInfo(src.code, dst.code))
  }
    /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.dispatch(onLoadRate());
    this.props.dispatch(onLoadWeather());
    this.props.dispatch(onLoadMapIFrame());
    this.props.dispatch(onLoadTrafficInfo(this.state.src.code, this.state.dst.code))
    window.scrollTo(0, 0)
  }

  render() {
    const { loading_rate, error_rate, rate, weather, traffic } = this.props;
    let MYR = 3.005;
    let USD = 0.730;
    if (!loading_rate && rate !== undefined && rate.MYR !== undefined && rate.USD !== undefined) {
      MYR = rate.MYR.toFixed(3);
      USD = rate.USD.toFixed(3);
    }

    let weatherSummary = weather.weather ? weather.weather[0].summary : '';
    let temperature = weather.weather ? weather.weather[0].temperature + ' °C' : '';
    let today = moment(new Date()).format('dddd HH:mm A');

    let est = traffic && traffic.traffic !== undefined ? traffic.traffic.est : '';
    let trafficStatus = traffic && traffic.traffic !== undefined ? traffic.traffic.status : '';
    let trafficColor = 'red';
    let trafficSign = RED_RIGHT;
    if (trafficStatus.includes('Normal')) {
      trafficSign = YELLOW_RIGHT;
      trafficColor = 'yellow';
    } else if (trafficStatus.includes('Light')) {
      trafficSign = GREEN_RIGHT;
      trafficColor = 'green';
    }

    return (
      <article>
        <Helmet>
          <title>Causeway Live</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <div className="main-frame">
            <div className="top-div">
              <div className="top-title">Causeway Live Traffic | Weather</div>
              <div className="traffic">
                <div className="image-wrapper"><img src={trafficSign} alt="traffic light" /></div>
                <div className="traffic-text">
                  <div className="src-dst">{this.state.src.title} -> {this.state.dst.title}</div>
                  <div className="est"><div style={{display:'inline-block'}}>EST {est}&nbsp;</div><div className="traffic-type" style={{ color: trafficColor, display: 'inline-block' }}> ({trafficStatus})</div></div>
                </div>
              </div>
              <div className="weather">
                <div className="weather-text">
                  <div className="time">{today}</div>
                  <div className="summary" style={{ display: 'inline-block'}}>{weatherSummary}</div><div style={{ display: 'inline-block'}}>&nbsp;{temperature}</div>
                </div>
                <div className="weather-icon"><img src={WEATHER_ICON} alt="weather icon" /></div>
              </div>
            </div>

            <div className="currency">
              <div><img src={CURRENCY_ICON} alt="Currency Icon" /></div>
              <div className="currency-text">1 SGD&nbsp;&nbsp;-&nbsp;&nbsp;MYR {MYR}&nbsp;&nbsp;/&nbsp;&nbsp;USD {USD}</div>
            </div>
          </div>

          <div className="bottom-frame">
            <div className="destination">
              <div className="destination-text">Destination</div>
              <div className="flags">
                <CDNFlagIcon  code={this.state.src.code} size={48} />
                &nbsp;&nbsp;<strong>></strong>&nbsp;&nbsp;
                <CDNFlagIcon  code={this.state.dst.code} size={48} />
              </div>
            </div>

            <div className="from-to">
              <div className="from-to-group">
                <div style={{ textAlign: 'right' }}>
                  <p>from:</p>
                  <h3 className="from-place">{this.state.src.title}</h3>
                </div>
                <div className="switch-wrapper">
                  <MuiThemeProvider theme={theme}>
                    <Button className="btn-switch" variant="contained" color="secondary" onClick={this.switchLocation}>
                      <RepeatIcon />
                    </Button>
                  </MuiThemeProvider>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p>to:</p>
                  <h3 className="to-place">{this.state.dst.title}</h3>
                </div>
              </div>
              <div className="button-group">
                <Link to={{pathname: '/map', state: {src: this.state.src.path, dst: this.state.dst.path} }}>
                  <MuiThemeProvider theme={theme}>
                    <Button className="btn-view-map" variant="contained" color="primary">
                      <PinDropIcon />
                      View Map
                    </Button>
                  </MuiThemeProvider>
                </Link>
                <Link to="/camera">
                  <MuiThemeProvider theme={theme}>
                    <Button className="btn-live-cam" variant="contained" color="primary">
                      <VideocamIcon />
                      Live Cam
                    </Button>
                  </MuiThemeProvider>
                </Link>
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
      weather: state.home.weather,
      map: state.home.map,
      traffic: state.home.traffic,
      loading_weather: state.home.loading_weather,
      loading_rate: state.home.loading_rate,
      loading_map: state.home.loading_map,
      loading_traffic: state.home.loadin_traffic,
      error_rate: state.home.error_rate,
  };
}

Index.propTypes = {
  rate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
  ]),
  weather: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  map: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  traffic: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onLoadRate: PropTypes.func,
  onLoadWeather: PropTypes.func,
  onLoadMapIFrame: PropTypes.func,
};

export default connect(mapStateToProps)(Index);
