import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router';

import './styles.scss';

class MapPage extends Component {

    render() {
        const { location } = this.props;
        const mapLink = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyCYc3U2zpF5V8DiAsY9PSSq0SF_CeRbdkA&zoom=14&origin=' + location.state.src + '&destination=' + location.state.dst;

        return (
            <div className="home-page">
                <Helmet>
                    <title>Live Camera</title>
                    <meta name="description" content="Live images for the location" />
                </Helmet>
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                    <Link to="/">
                        <IconButton className="back-btn" color="inherit" aria-label="Menu" style={{color: 'white'}}>
                            <KeyboardBackspace />
                        </IconButton>
                    </Link>
                    <Typography variant="title" color="inherit" className="title">
                        Map
                    </Typography>
                    </Toolbar>
                </AppBar>
                <iframe
                    width="100%"
                    height="800"
                    frameBorder="0" 
                    src={mapLink} allowFullScreen />
            </div>
        );
    }
}

export default MapPage;