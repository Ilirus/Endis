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
      <View style={[s.bg_primary]}>
        <Text>Endis</Text>
        <Svg height={20} width={20} viewBox="0 0 100 100">
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
            width={70}
            height={70}
            stroke="red"
            strokeWidth={2}
            fill="yellow"
          />
        </Svg>
      </View>
    )
  }
}
