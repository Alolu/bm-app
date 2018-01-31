import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container } from 'native-base';
import MapContainer from "../components/MapContainer";

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
var LATITUDE = 0;
var LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapView extends React.Component {

	constructor(){
		super();
		this.state = {
	        region: {
			    latitude: LATITUDE,
			    longitude: LONGITUDE,
			    latitudeDelta: LATITUDE_DELTA,
	        	longitudeDelta: LONGITUDE_DELTA,
	     	}
	    };
    }

	componentDidMount() {
	    navigator.geolocation.getCurrentPosition(
	      position => {
	        this.setState({
	          region: {
	            latitude: position.coords.latitude,
	            longitude: position.coords.longitude,
	            latitudeDelta: LATITUDE_DELTA,
	            longitudeDelta: LONGITUDE_DELTA,
	          }
	        });
	        console.log(this.state.region);
	      },
	    (error) => console.log(error.message),
	    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	    );
  	}

	render(){
		return(
			<Container>
				<MapContainer region={ this.state.region }/>
			</Container>
		);
	}
}

export default MapView;