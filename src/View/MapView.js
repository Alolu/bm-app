import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import MapContainer from "../components/MapContainer";


class MapView extends React.Component {
	render(){
		const region = {
			latitude: 37.78825,
		    longitude: -122.4324,
		    latitudeDelta: 0.0922,
		    longitudeDelta: 0.0421,
		}
		return(
			<Container>
				<MapContainer region={region}/>
			</Container>
		);
	}
}

export default MapView;