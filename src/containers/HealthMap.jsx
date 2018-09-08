import React from 'react';
import {Map, GoogleApiWrapper, HeatMap, Polygon} from 'google-maps-react';
import {Segment} from 'semantic-ui-react';
import mockPolygonData from '../mock/polygonData.json';

class HealthMap extends React.Component {
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
        return (
            <Segment
                attached
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
                        onClick={this.props.onMapClicked}
                        paths={mockPolygonData}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#0000FF"
                        fillOpacity={0.35}/>
                    <HeatMap gradient={gradient} opacity={0.3} positions={positions} radius={20}/>
                </Map>
            </Segment>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: ['places', 'visualization']
})(HealthMap);