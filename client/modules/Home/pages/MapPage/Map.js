import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Map = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://www.google.com/maps/dir/Woodlands+Checkpoint,+21+Woodlands+Crossing,+738203/Sultan+Iskandar+Complex+Customs,+Jalan+Jim+Quee,+Bukit+Chagar,+80300+Johor+Bahru,+Johor,+Malaysia/@1.4520892,103.7609916&key=AIzaSyDOn9pwR-eP2cBeqMji7ERWNeRlbaw0srg",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 1.458613, lng: 103.765896 }}>
   
  </GoogleMap>
));

export default Map;
