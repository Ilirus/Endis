import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { observer } from 'mobx-react/native';
import { s } from 'react-native-better-styles';
import { Svg, Circle, Rect } from 'react-native-svg';

type Props = {}

@observer
export default class HeaderComponent extends Component<Props> {
  render() {
    return (
      <View style={[s.bg_primary, s.jcsb, s.aic, s.flx_row, s.ph125, s.pv075]}>
        <Text style={[s.fs2, s.white]}>ENDIS</Text>
        <Svg height={30} width={30} viewBox="0 0 100 100">
          <Circle
            cx={50}
            cy={50}
            r={45}
            stroke="blue"
            strokeWidth={2.5}
            fill="green"
          />
          <Rect
            x={15}
            y={15}
            width={80}
            height={80}
            stroke="red"
            strokeWidth={2}
            fill="yellow"
          />
        </Svg>
      </View>
    )
  }
}
