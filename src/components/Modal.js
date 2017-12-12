import React from 'react';
import { Text, View, Modal, TextInput } from 'react-native';
import CardSection from './CardSection';
import { Button } from 'react-native-elements';

const Confirm = ({ title, content, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={[cardSectionStyle]}>
          <Text style={textStyle}>
            {title}
          </Text>
        </CardSection>
        <CardSection>
          {/* <View style={{flex:1, flexDirection:'column', alignItems:'center'}}> */}
            {content}
          {/* </View> */}
        </CardSection>

        <CardSection>
          {onDecline === null
            ? <View style={{flex:1}} />
            : <Button containerViewStyle={{flex:1}} buttonStyle={{backgroundColor:'#900'}} title="Cancel" onPress={onDecline} />}
          {onAccept === null
            ? null
            : <Button containerViewStyle={{flex:1}} buttonStyle={{backgroundColor:'#900'}} title="Confirm" onPress={onAccept} />}
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex:1,
    justifyContent: 'center'
  }
};

export default Confirm;
