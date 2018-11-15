import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { observer } from 'mobx-react/native';
import { s } from 'react-native-better-styles';

type Props = {}

@observer
export default class HeaderComponent extends Component<Props> {
  render() {
    return (
      <View style={[s.bg_primary, s.jcsb, s.aic, s.flx_row, s.ph125, s.pv075]}>
        <Text style={[s.fs15, s.white]}>
          ENDIS
        </Text>
        <Image 
          style={[s.w175, s.h175]} 
          source={require('../assets/images/settings_icon.png')}
        />
      </View>
    )
  }
}
