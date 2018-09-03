import React, { Component } from "react";
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

import { onLoadLiveCam } from '../../HomeActions';

class Camera extends Component {

    componentDidMount() {
        this.props.dispatch(onLoadLiveCam());
        window.scrollTo(0, 0);
    }
    
    render() {
        const { camera } = this.props;
        
        console.log('--- camera ---', camera);
        return (
            <div>
                <Helmet>
                    <title>Live Camera</title>
                    <meta name="description" content="Live images for the location" />
                </Helmet>
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                    <Link to="/">
                        <IconButton className="back-btn" color="inherit" aria-label="Menu">
                            <KeyboardBackspace />
                        </IconButton>
                    </Link>
                    <Typography variant="title" color="inherit" className="title">
                        Live Camera
                    </Typography>
                    </Toolbar>
                </AppBar>
                {camera !== null && camera.camera !== undefined ? <div><img src={camera.camera.image1} alt="Currency Icon" width="100%" height="auto" /><img src={camera.camera.image2} alt="Currency Icon" width="100%" height="auto"  /></div> : ''}
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        camera: state.home.camera,
        loading_rate: state.home.loading_rate,
        error_rate: state.home.error_rate,
    };
  }
  
Camera.propTypes = {
  camera: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  onLoadLiveCam: PropTypes.func,
};
  
export default connect(mapStateToProps)(Camera);