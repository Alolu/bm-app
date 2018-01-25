import React from 'react';
import { getTheme, Icon, StyleProvider } from 'native-base';


export class WrapperIcon extends React.Component {
  render() {
    return (
        <StyleProvider style={getTheme({ iconFamily: this.props.family })}>
            <Icon {...this.props} />
        </StyleProvider>
    );
  }
}