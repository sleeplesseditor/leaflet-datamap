import React, { createRef, Fragment, PureComponent } from 'react';
import { readRemoteFile } from 'react-papaparse'
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';

  const MarkerLayer = ({ latitude, longitude, ...props }) => (
    <CircleMarker center={[latitude, longitude]} radius={2}>
      {/* <Popup>{content}</Popup> */}
    </CircleMarker>
  )
  
  const MarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
      <MarkerLayer key={key} {...props} />
    ))
    return <Fragment>{items}</Fragment>
  }  

export default class MapComponent extends PureComponent {
  state = {
    hasLocation: false,
    lat: 55,
    lng: -2,
    data: []
  }

  componentDidMount() {
    readRemoteFile(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/charge-points-slim.csv',
      {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
              this.setState({data: results.data});
          }
      }
    )
  }

  mapRef = createRef();

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="map-container">
        <Map
          center={position}
          length={4}
          zoom={6}
          ref={this.mapRef}
          style={{ height: '100vh', width: '100vh' }}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkersList markers={this.state.data} />
        </Map>
      </div>
    )
  }
}