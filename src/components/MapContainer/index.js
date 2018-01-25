import React from 'react';
import { MapView } from 'expo';
import { View } from 'react-native';

import styles from "./mapContainerStyle.js";

export const MapContainer = ({region})=>{
	return(
		<View style={styles.container}>
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>
			</MapView>
		</View>
	)
}

export default MapContainer;