import React, { createRef, Fragment, PureComponent } from 'react';
import { colorScale } from './helpers';
import Legend from './Legend';
import { readRemoteFile } from 'react-papaparse'
import { Map, TileLayer, CircleMarker, Popup, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';

  const MarkerLayer = ({ latitude, longitude, name, postcode, chargeDeviceStatus, deviceControllerName }) => {
    const inService = chargeDeviceStatus === 'In service';
    const color = inService ? colorScale[deviceControllerName] || '#aaa' : '#777';

    return (
      <CircleMarker center={[latitude, longitude]} radius={3} color={color} fillOpacity={1} weight={0.25}>
        <Popup>
          <div>
            <h3 className="map-container-popup-heading">{name}</h3>
            <span>
            <b>Postcode:</b> {postcode}
            <br/>
            <b>Operator:</b> {deviceControllerName}
            <br/>
            <b>Status:</b> {chargeDeviceStatus}
            <br/>
            </span>
          </div>
        </Popup>
      </CircleMarker>
  )}
  
  const MarkersList = ({ markers }) => {
    const items = markers.map(({ index, ...props }) => (
      <MarkerLayer key={index} {...props} />
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
          style={{ height: '90vh', width: '90vh' }}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Legend />
          <ScaleControl position="bottomleft" />
          <MarkersList markers={this.state.data} />
        </Map>
      </div>
    )
  }
}