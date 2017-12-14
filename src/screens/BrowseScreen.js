import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchBills,
  loadThisBill
} from '../actions';

class BrowseScreen extends Component {

  componentWillMount() {
    console.log('component mounted.. yo ho yyo yoho')
    this.props.fetchBills();
  }

  itemPressed = (item) => {
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
    console.log(item)
    this.props.loadThisBill(item.id);
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Text>Hello</Text>
        {this.props.savedBills.map((item, i) => (
          <Button 
            onPress={() => this.itemPressed(item)} 
            key={i}
            title={item.name}
          />
        ), this)}
      </View>
    );
  }
}

function mapStateToProps({ browseBills }) {
  const { savedBills, loading } = browseBills;
  return { savedBills, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBills, loadThisBill }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);
