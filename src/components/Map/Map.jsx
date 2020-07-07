import React, { createRef, PureComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';

export default class MapComponent extends PureComponent {
  state = {
    hasLocation: false,
    lat: 55,
    lng: -2,
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
        </Map>
      </div>
    )
  }
}