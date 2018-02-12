import React from 'react';
import { MapView } from 'expo';
import {  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity} from 'react-native';

import styling from "./mapContainerStyle.js";
import mapStyle from "./mapStyle.json";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 7;
const CARD_WIDTH = CARD_HEIGHT - 20;

class MapContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			region: {},
			markers: []
		}
	}


  	componentWillMount() {
    	this.index = 0;
    	this.animation = new Animated.Value(0);
  	}

  	componentDidMount() {
  		 this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

	componentWillReceiveProps(nextProps) {
    		const markers = [
			  {
			  	id:1,
			    coordinate: {
			    	latitude: nextProps.region.latitude+0.1,
			    	longitude: nextProps.region.longitude
			    },
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  },
			  {	
			  	id:2,
			    coordinate: {
			    	latitude: nextProps.region.latitude+0.2,
			    	longitude: nextProps.region.longitude
			    },
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  },
			  {	
			  	id:3,
			    coordinate: {
			    	latitude: nextProps.region.latitude+0.3,
			    	longitude: nextProps.region.longitude
			    },
			    title: 'Foo Place',
			    subtitle: '1234 Foo Drive'
			  }
			];
      		this.setState({markers: markers, region: nextProps.region});
  	}

	render(){
		const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
		return(
			<View style={styling.container}>
				<MapView
					ref={map => this.map = map}
					provider={ MapView.PROVIDER_GOOGLE }
					style={ styling.map }
					region={ this.props.region }
					customMapStyle={ mapStyle }
				>
					{this.state.markers.map((marker, index) => {
			            const scaleStyle = {
			              transform: [
			                {
			                  scale: interpolations[index].scale,
			                },
			              ],
			            };
			            const opacityStyle = {
			              opacity: interpolations[index].opacity,
			            };
			            return (
			              <MapView.Marker key={index} coordinate = {marker.coordinate}>
			                <Animated.View style={[styles.markerWrap, opacityStyle]}>
			                  <Animated.View style={[styles.ring, scaleStyle]} />
			                  <View style={styles.marker} />
			                </Animated.View>
			              </MapView.Marker>
			            );
			          })}
				</MapView>
				<Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
			</View>
	);}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});


export default MapContainer;