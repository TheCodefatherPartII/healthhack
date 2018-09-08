import React from 'react';
import {Map, GoogleApiWrapper, HeatMap, Polygon} from 'google-maps-react';
import {Segment} from 'semantic-ui-react';
//import * as kiamaCoords from '../constants/lgaPolygons'
import axios from 'axios';

import mockCoords from '../simpleLgaRegions.json'

class HealthMap extends React.Component {
    state = {
        coords: mockCoords
    }

    getFeatureIds(features) {
        let allCoords = []
        if (features !== undefined) {
            features.map((feature) => {
                const {geometry} = feature
                const {coordinates} = geometry
                allCoords.push(this.getFormattedCoords(coordinates[0][0]))
            })
        }
        return allCoords
    }

    getFormattedCoords(coordinates) {
        let formattedCoords = []
        coordinates.map((coord) => {
            formattedCoords.push({lat: coord[1], lng: coord[0]})
        })
        return formattedCoords
    }
    render() {
        const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ];

        const positions = [
            {
                lat: -33.042476,
                lng: 146.422921
            }
        ];
        const {features} = this.state.coords
        console.log("coords : " + features)
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
                    initialCenter={{
                    lat: -33.042476,
                    lng: 146.422921
                }}>
                    <Polygon
                        paths={this.getFeatureIds(features)}
                        strokeColor="#0000FF"
                        strokeOpacity={0.3}
                        strokeWeight={1}
                        fillColor="#0000FF"
                        fillOpacity={0.2}/>
                </Map>
            </Segment>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: ['places', 'visualization']
})(HealthMap);