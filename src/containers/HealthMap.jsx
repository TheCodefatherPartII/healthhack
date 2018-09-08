import React from 'react';
import {Map, GoogleApiWrapper, Polygon} from 'google-maps-react';
import {Segment} from 'semantic-ui-react';
//import * as kiamaCoords from '../constants/lgaPolygons'
import axios from 'axios';

import mockCoords from '../simpleLgaRegions.json'

class HealthMap extends React.Component {
    state = {
        allPolygonCoords: []
    }
    componentDidMount = () => {
        axios
            .get(`https://data.gov.au/geoserver/nsw-local-government-areas/wfs?request=GetFeature&typeName=ckan_f6a00643_1842_48cd_9c2f_df23a3a1dc1e&outputFormat=json`)
            .then(res => {
                const coords = res.data;
                const {features} = coords
                let allPolygonCoords = this.getFeatureIds(features)
                this.setState({allPolygonCoords});
            })
    }

    getFeatureIds(features) {
        let allCoords = []
        if (features !== undefined) {
            features.map((feature) => {
                const {geometry} = feature
                const {coordinates} = geometry
                allCoords.push(this.getFormattedCoords(feature.properties.lg_ply_pid, coordinates[0][0]))
            })
        }
        return allCoords
    }

    getFormattedCoords(lgId, coordinates) {
        let formattedCoords = []
        coordinates.map((coord) => {
            formattedCoords.push({lat: coord[1], lng: coord[0]})
        })
        return {lgId, formattedCoords}
    }

    getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    render() {
        const allPolygonCoords = this.state.allPolygonCoords
        const anim = { animation: 'pulse', duration: 1000, visible1: true}
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
                    {allPolygonCoords.map((poly) => <Polygon
                            key={poly.lgId}
                            paths={poly.formattedCoords}
                            strokeColor={this.getRandomColor()}
                            strokeOpacity={0.3}
                            strokeWeight={1}
                            fillColor={this.getRandomColor()}
                            fillOpacity={0.5}/>)}
                </Map>
            </Segment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: ['places', 'visualization']
})(HealthMap);