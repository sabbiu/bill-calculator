import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import { SCREEN_WIDTH } from '../constants';

class ListItem extends Component {

  render() {
    const {component} = this.props;
    return (
      <View>
        {component}
      </View>
    );
  }
}

export default ListItem;
