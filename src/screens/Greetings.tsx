import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation';
import { s } from 'react-native-better-styles'

type Props = {
    
} & NavigationInjectedProps

export default class GreetingsScreen extends Component<Props> {

  static navigationOptions = {
    header:  null
  };
  
  render() {
    return (
      <View style={[s.flx_i, s.aic, s.jcc, s.bg_primary_back]}>
        <Text style={[s.tc, s.fs3, s.white, s.mb15]}>
          Greetings!
        </Text>
        <Button title="Go to Rooms Settings" onPress={() => this.props.navigation.navigate('RoomsSettings')}/>
      </View>
    )
  }
}
