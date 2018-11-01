import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation';

type Props = {
    
} & NavigationInjectedProps

export default class Greetings extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Greetings!</Text>
        <Button title="Go to Rooms Settings" onPress={() => this.props.navigation.navigate('RoomsSettings')}/>
      </View>
    )
  }
}
