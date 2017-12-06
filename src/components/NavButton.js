import React from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = ScaledSheet.create({
  button: {
    overflow: 'hidden',
    width: 40,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    top: 6,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    right: 5
  }
});

// Our custom component we want as a button in the nav bar
const NavButton = ({ iconName, onPress }) =>
  <TouchableOpacity
    style={[styles.button, styles.touchable]}
    onPress={onPress}
  >
    <View style={styles.button}>
      <Text style={{ color: 'white' }}>
        {/* {text} */}
        <Icon name={iconName} size={30} color="#900" />
      </Text>
    </View>
  </TouchableOpacity>;

export default NavButton;
