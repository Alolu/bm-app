import React from 'react';
import { MapView } from 'expo';
import { View } from 'react-native';

import styles from "./mapContainerStyle.js";
import mapStyle from "./mapStyle.json";

class MapContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			markers: []
		}
	}

	componentWillReceiveProps(nextProps) {
    		const markers = [
			  {
			  	id:1,
			    latitude: nextProps.region.latitude+0.1,
			    longitude: nextProps.region.longitude,
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  },
			  {	
			  	id:2,
			    latitude: nextProps.region.latitude+0.2,
			    longitude: nextProps.region.longitude,
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  },
			  {	
			  	id:3,
			    latitude: nextProps.region.latitude+0.3,
			    longitude: nextProps.region.longitude,
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  }
			];
      		this.setState({markers: markers});
  	}

	render(){
		return(
			<View style={styles.container}>
				<MapView
					provider={ MapView.PROVIDER_GOOGLE }
					style={ styles.map }
					region={ this.props.region }
					customMapStyle={ mapStyle }
				>
					{this.state.markers.map(marker => (
				    <MapView.Marker
				    	key={marker.id}
				        coordinate={{latitude: marker.latitude,
	            		longitude: marker.longitude}}
				        title={marker.title}
				        description={marker.description}
				    />
				  	))}
				</MapView>
			</View>
		)
	}
}

export default MapContainer;