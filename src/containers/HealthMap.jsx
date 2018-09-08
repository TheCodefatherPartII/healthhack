import React from 'react';
import {Map, GoogleApiWrapper, Polygon} from 'google-maps-react';
import {Segment} from 'semantic-ui-react';
//import * as kiamaCoords from '../constants/lgaPolygons'
import axios from 'axios';

import mockCoords from '../simpleLgaRegions.json'
import { Marker } from 'google-maps-react/dist/components/Marker';

class HealthMap extends React.Component {
  static defaultProps = {
    mapCenter: {
      lat: -33.042476,
      lng: 146.422921
      }
  }
  
    state = {
        hospitals: [],
        allPolygonCoords: [],
        polyColour: {},
    }

    componentDidMount = () => {
        const coords = this.getFeatureIds(mockCoords.features)
        this.setState({
          allPolygonCoords: coords,
          polyColour: coords.reduce((agg,cur) => ({
            ...agg,
            [cur.lgId]: this.getRandomColor()
          }), {}),
        })

        axios
            .get('http://healthhackaus.herokuapp.com/api/healthhack/hospitals')
            .then(res => {
              this.setState({hospitals: res.data})
            })
    }

    getFeatureIds(features) {
        let allCoords = []
        if (features !== undefined) {
            features.map((feature) => {
                const {geometry, properties} = feature
                const {coordinates} = geometry
                allCoords.push(this.getFormattedCoords(feature.properties.lg_ply_pid, coordinates[0][0], properties))
            })
        }
        return allCoords
    }

    getFormattedCoords(lgId, coordinates, properties) {
        let formattedCoords = []
        coordinates.map((coord) => {
            formattedCoords.push({lat: coord[1], lng: coord[0]})
        })
        return {lgId, formattedCoords, properties}
    }

    getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    render() {
        const {allPolygonCoords, polyColour, hospitals} = this.state

        return (
            <Segment
                padded={false}
                style={{
                height: '100%',
                width: '100%',
                padding: 0
            }}>
                <Map
                    google={this.props.google}
                    zoom={7}
                    initialCenter={this.props.mapCenter}
                    center={this.props.mapCenter}
                    >
                    {
                        allPolygonCoords.map((poly) => {
                          const selected = poly.lgId === this.props.selectedLga
                          const colour = polyColour[poly.lgId]
                          return <Polygon
                            key={poly.lgId+`${selected?'-selected':''}`}
                            paths={poly.formattedCoords}
                            strokeColor={colour}
                            strokeOpacity={0.7}
                            strokeWeight={selected ? 2 : 1}
                            fillColor={colour}
                            fillOpacity={selected ? 0.8 : 0.4}
                            tag={poly.properties}
                            onClick={this.props.onMapClicked}
                          />
                        }
                        )
                    }
                    {hospitals.map(h => <Marker
                      key={`hospital:${h.lat}|${h.lng}`}
                      icon={{
                        url: '/hospital.png',
                        scaledSize: new this.props.google.maps.Size(25, 25)
                      }}
                      position={{lat: h.lat, lng: h.lng}}
                    />)}
                </Map>
            </Segment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: ['places', 'visualization']
})(HealthMap);