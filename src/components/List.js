import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import { SCREEN_WIDTH } from '../constants';

class List extends Component {

  render() {
    const {children} = this.props;
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop:5,
    marginBottom:5
  }
}

export default List;
