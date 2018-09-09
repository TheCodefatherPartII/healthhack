import React from 'react';
import {Map, GoogleApiWrapper, Polygon} from 'google-maps-react';
import {Segment} from 'semantic-ui-react';
import Loadable from 'react-loading-overlay';

import mockCoords from '../simpleLgaRegions.json'
import { Marker } from 'google-maps-react/dist/components/Marker';
import DataService from '../services/DataService';
import FilterService from '../services/FilterService';

class HealthMap extends React.Component {
  static defaultProps = {
    mapCenter: {
      lat: -33.042476,
      lng: 146.422921
      }
  }
  
    state = {
        selectedServices: [],
        allPolygonCoords: [],
        polyColour: {},
        regionBounds: null
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
    }

    async componentDidUpdate(prevProps) {
      const {selectedLga, google, services} = this.props
      if (selectedLga === prevProps.selectedLga) return

      const selectedRegion = selectedLga ?
        this.state.allPolygonCoords.find(p => p.lgId === selectedLga) :
        null

      if (!selectedRegion) return
      
      let selectedServices = []
        selectedServices = await FilterService.getServicesInBounds(
          google.maps,
          services,
          new google.maps.Polygon({paths: selectedRegion.formattedCoords})
        )

          
      const bounds = new google.maps.LatLngBounds()
      for (let i in selectedRegion.formattedCoords) {
        const point = selectedRegion.formattedCoords[i]
        bounds.extend(new google.maps.LatLng(point.lat, point.lng));
      }

      this.setState({selectedServices, regionBounds: bounds})
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
      const { allPolygonCoords, polyColour, selectedServices, regionBounds } = this.state
      const { google, selectedLga, onMapClicked, mapCenter } = this.props

      return (
        <Segment
          padded={false}
          style={{
            height: '100%',
            width: '100%',
            padding: 0
          }}>
          <Map
            google={google}
            zoom={7}
            initialCenter={mapCenter}
            bounds={regionBounds}
          >
            {
              allPolygonCoords.map((poly) => {
                const selected = poly.lgId === selectedLga
                const colour = polyColour[poly.lgId]
                return <Polygon
                  key={poly.lgId + `${selected ? '-selected' : ''}`}
                  paths={poly.formattedCoords}
                  strokeColor={colour}
                  strokeOpacity={0.7}
                  strokeWeight={selected ? 2 : 1}
                  fillColor={colour}
                  fillOpacity={selected ? 0.6 : 0.3}
                  tag={poly.properties}
                  onClick={onMapClicked}
                />
              })
            }
            {
              selectedServices.map(s => <Marker
                key={`${s.serviceType}:${s.id}`}
                icon={{
                  url: `/${s.serviceType}.png`,
                  scaledSize: new google.maps.Size(25, 25)
                }}
                position={{ lat: s.lat, lng: s.lng }}
              />)
            }
          </Map>
        </Segment>

      )
    }
}

class LoadingWrapper extends React.Component {
  state = {
    loading: true,
    services: [],
    crime: []
  }

  async componentDidMount() {
    
    const [
      hospitals,
      childcare,
      schools,
      crime
    ] = await new DataService().loadMappableData()

    this.setState({
      services: [
        ...hospitals.map(h => ({...h, serviceType: 'hospital'})),
        ...schools.map(s => ({...s, serviceType: 'school', id: s.schoolCode})),
        ...childcare.map(c => ({...c, serviceType: 'childcare'})),
      ],
      crime,
      loading: false,
    })
  }
  
  render() {
    return <Loadable
     active={this.state.loading}
     spinner
    >
      <HealthMap {...this.state} {...this.props} />
    </Loadable>
  }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA",
    libraries: ['places', 'visualization'],
    LoadingContainer: 'div'
})(LoadingWrapper);