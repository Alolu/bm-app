import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { WrapperIcon } from './src/components/WrapperIcon';
import { TabNavigator } from 'react-navigation';

import MapView from './src/View/MapView';
import ProfilView from './src/View/ProfilView';
import ParamView from './src/View/ParamView';

const App = TabNavigator({
    Param:  { screen: ParamView},
    Map:    { screen: MapView },
    Profil: { screen: ProfilView }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarComponent: props => {
      return(
        <Footer>
          <FooterTab>
            <Button
            vertical
            onPress={() => props.navigation.navigate('Param')}
            active={props.navigationState.index === 0}
            >
              <WrapperIcon family="FontAwesome" name="gear" />
              <Text>Paramètres</Text>

            </Button>
            <Button 
            vertical
            onPress={() => props.navigation.navigate('Map')}
            active={props.navigationState.index === 1}
            >
              <WrapperIcon family="MaterialCommunityIcons" name="earth" />
              <Text>Carte</Text>

            </Button>
            <Button
            vertical
            onPress={() => props.navigation.navigate('Profil')}
            active={props.navigationState.index === 2}
            >
              <WrapperIcon family="MaterialIcons" name="account-circle" />
              <Text>Profil</Text>

            </Button>
          </FooterTab>
        </Footer>
      );
    }
  });

export default App;
