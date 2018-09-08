import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Segment } from 'semantic-ui-react';

class HealthMap extends React.Component {
    static defaultProps = {
        center: {
            lat: -32.839130,
            lng: 146.367245
        },
        zoom: 7
    };
    render() {
        return (
            <Segment attached padded={false}
                style={{
                height: 'calc(100% - 45px)',
                width: '100%',
                padding: 0
            }}>
                <GoogleMapReact
  bootstrapURLKeys={{
    key: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA"
  }}
  defaultCenter={this.props.center}
  defaultZoom={this.props.zoom}
  onClick={this.props.onMapClick}
  />
            </Segment>

        )
    }
}

export default HealthMap