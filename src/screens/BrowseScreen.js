import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class BrowseScreen extends Component {

  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Text>Hello</Text>
        {this.props.savedBills.map((item, i) => {
          return (
            <Text key={i}>{item}</Text>
          )
        })}
      </View>
    );
  }
}

function mapStateToProps({ savedBills }) {
  return { savedBills };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps)(BrowseScreen);
