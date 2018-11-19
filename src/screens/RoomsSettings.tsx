import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Switch, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Room } from '../models';
import stores from '../stores';
import { s, sizes, colors } from 'react-native-better-styles';
import Carousel from 'react-native-snap-carousel';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Orientation from 'react-native-orientation';

const { width, height } = Dimensions.get('window');

type Props = {
  roomStore: typeof stores.roomStore
}

type State = {
  room: any
  atHome: boolean
  isDay: boolean
  radiatorStatus: 'on' | 'off' | 'half'
  orientation: Orientation.orientation
}
@inject('roomStore')
@observer
export default class RoomsSettingsScreen extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      room: null,
      atHome: false,
      isDay: true,
      radiatorStatus: 'on',
      orientation: 'UNKNOWN'
    }
  }

  componentWillMount() {
    this.orientationDidChange(Orientation.getInitialOrientation());
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  orientationDidChange = (orientation: Orientation.orientation) => {
    console.log(orientation)
    this.setState({orientation})
  }

  renderRoom({item, index}: {item: Room, index: number}) {
    return (
      <View>
        <Text style={[s.fs15, s.white, s.tc]}>{item.name}</Text>
      </View>
    );
  }

  changeRadiatorStatus(status: State['radiatorStatus']) {
    switch (status) {
      case 'on':
        status = 'half'
        break;
      case 'half':
        status = 'off'
        break;
      default:
        status = 'on'
        break;
    }
    this.setState({radiatorStatus: status})
  }

	render() {
    const {roomStore} = this.props;
    const {atHome, isDay, radiatorStatus, orientation} = this.state;
		return (
			<ScrollView style={[s.flx_i, s.bg_primary_back]}>
        <Carousel
          data={roomStore.rooms}
          renderItem={this.renderRoom}
          sliderWidth={orientation === 'PORTRAIT' ? width : height}
          itemWidth={sizes[8]}
          containerCustomStyle={[s.pv05, s.bbw3, s.b_primary_light]}
          onSnapToItem={index => console.log(index)}
        />
        <View style={[s.ph1]}>
          <View style={[s.flx_row, s.bbw1, s.b_grey, s.aic, s.pv1]}>
            <View style={[s.flx_grow, s.brw1, s.b_grey, s.pr15, s.jcc, {flexBasis: 1}]}>
              <MultiToggleSwitch
                defaultActiveIndex={atHome ? 0 : 1}
                activeContainerStyle={[s.bw1, s.b_turquoise]} 
                itemsContainerBackgroundStyle={[]}
                itemsContainer={[s.bw1, s.b_turquoise_50, s.flx_row, s.br2, s.jcsa, {marginTop: -10}]} 
              >
                <MultiToggleSwitch.Item 
                  itemContainer={[s.br2, s.pv1, s.flx_i, s.aic, {marginTop: -0.5}]} 
                  secondaryColor={''} 
                  primaryColor={colors.dark_blue}
                  onPress={() => this.setState({atHome: true})}
                >
                  <Image 
                    style={[s.w175, s.h175, !atHome ? s.o_50 : {}]} 
                    source={require('../assets/images/at_home_icon_half_size.png')}
                  />
                </MultiToggleSwitch.Item>
                <MultiToggleSwitch.Item 
                  itemContainer={[s.br2, s.pv1, s.flx_i, s.aic, {marginTop: -0.5}]} 
                  secondaryColor={''} 
                  primaryColor={colors.dark_blue}
                  onPress={() => this.setState({atHome: false})}
                >
                  <Image 
                    style={[s.w175, s.h175, atHome ? s.o_50 : {}]} 
                    source={require('../assets/images/nat_home_icon_half_size.png')}
                  />
                </MultiToggleSwitch.Item>
              </MultiToggleSwitch>
            </View>
            <View style={[s.flx_row, s.flx_grow, {flexBasis: 1}, s.jcsa, s.ph1]}>
              <TouchableOpacity onPress={() => this.setState({isDay: !isDay})}>
                { 
                  isDay ? (
                    <Image 
                      style={[s.w35, s.h35]} 
                      source={require('../assets/images/day_indicator_icon.png')}
                    />
                  ) : (
                    <Image 
                      style={[s.w35, s.h35]} 
                      source={require('../assets/images/night_indicator.png')}
                    />
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeRadiatorStatus(radiatorStatus)}>
                {
                  radiatorStatus === 'on' ? (
                    <Image 
                      style={[s.w35, s.h35]} 
                      source={require('../assets/images/radiator_indicator_on.png')}
                    />
                  ) : (
                    radiatorStatus === 'half' ? (
                      <Image 
                        style={[s.w35, s.h35]} 
                        source={require('../assets/images/radiator_indicator.png')}
                      />
                    ) : (
                      <Image 
                        style={[s.w35, s.h35]} 
                        source={require('../assets/images/radiator_indicator_off.png')}
                      />
                    )
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[s.pv1, s.aic, s.jcc]}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
        </View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
