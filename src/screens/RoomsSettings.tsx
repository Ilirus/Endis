import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Switch, Image, TouchableOpacity, Slider } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Room } from '../models';
import stores from '../stores';
import { s, sizes, colors } from 'react-native-better-styles';
import Carousel from 'react-native-snap-carousel';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Orientation from 'react-native-orientation';
import { getWidthHeight } from '../utils';
import CircleSlider from 'react-native-circle-slider';
import * as _ from "lodash"

const { width, height } = getWidthHeight(Dimensions.get("screen"));

type Props = {
  roomStore: typeof stores.roomStore
}

type State = {
  room: Room
  orientation: Orientation.orientation
  show: boolean
}
@inject('roomStore')
@observer
export default class RoomsSettingsScreen extends Component<Props, State> {

  private temp: number;

  constructor(props: Props) {
    super(props)
    this.state = {
      room: props.roomStore.rooms[0],
      orientation: 'UNKNOWN',
      show: true
    }
    this.temp = props.roomStore.rooms[0].customTemperature;
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
    this.setState({orientation})
  }

  renderRoom({item, index}: {item: Room, index: number}) {
    return (
      <View>
        <Text style={[s.fs15, s.white, s.tc]}>{item.name}</Text>
      </View>
    );
  }

  changeRadiatorStatus(room: Room) {
    let status = room.radiatorStatus;
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
    this.setState({room: {...room, radiatorStatus: status}})
  }

  renderSwitch() {
    const { room, show } = this.state;
    return show && (
      <MultiToggleSwitch
        defaultActiveIndex={room.atHome ? 0 : 1}
        activeContainerStyle={[s.bw1, s.b_turquoise]} 
        itemsContainerBackgroundStyle={[]}
        itemsContainer={[s.bw1, s.b_turquoise_50, s.flx_row, s.br2, s.jcsa, {marginTop: -10}]} 
      >
        <MultiToggleSwitch.Item 
          itemContainer={[s.br2, s.pv1, s.flx_i, s.aic, {marginTop: -0.5}]} 
          secondaryColor={''} 
          primaryColor={colors.dark_blue}
          onPress={() => this.setState({room: {...room, atHome: true}})}
        >
          <Image 
            style={[s.w175, s.h175, !room.atHome ? s.o_50 : {}]} 
            source={require('../assets/images/at_home_icon_half_size.png')}
          />
        </MultiToggleSwitch.Item>
        <MultiToggleSwitch.Item 
          itemContainer={[s.br2, s.pv1, s.flx_i, s.aic, {marginTop: -0.5}]} 
          secondaryColor={''} 
          primaryColor={colors.dark_blue}
          onPress={() => this.setState({room: {...room, atHome: false}})}
        >
          <Image 
            style={[s.w175, s.h175, room.atHome ? s.o_50 : {}]} 
            source={require('../assets/images/nat_home_icon_half_size.png')}
          />
        </MultiToggleSwitch.Item>
      </MultiToggleSwitch>
    )
  }

  changeTemperature = () => {
    const { room } = this.state;
    return _.throttle(
      temperature => this.setState({room: {...room, customTemperature: temperature}}),
      150
    )
  }

	render() {
    const { roomStore: {rooms, editRoom} } = this.props;
    const { orientation, room, show } = this.state;
		return rooms.length && (
      <ScrollView style={[s.flx_i, s.bg_primary_back]}>
        <Carousel
          data={[...rooms]}
          renderItem={this.renderRoom}
          sliderWidth={orientation === 'PORTRAIT' ? width : height}
          itemWidth={sizes['7']}
          containerCustomStyle={[s.pv05, s.bbw3, s.b_primary_light]}
          onSnapToItem={index => {
            editRoom(room);
            this.setState(
              (prevState, props) => {
                this.temp = rooms[index].customTemperature;
                const newState = {room: rooms[index], show: true};
                if (prevState.room.atHome !== rooms[index].atHome) {
                  newState.show = false;
                }
                return newState;
              }, () => {
                if (show) {
                  this.setState({show: true})
                }
              }
            )
            }
          }
        />
        <View style={[s.ph125]}>
          <View style={[s.flx_row, s.bbw1, s.b_grey, s.aic, s.pv15]}>
            <View style={[s.brw1, s.b_grey, s.pr15, s.jcc, s.flx_i]}>
              {this.renderSwitch()}
            </View>
            <View style={[s.flx_row, s.flx_i, s.jcsa, s.pl15]}>
              <TouchableOpacity onPress={() => this.setState({room: {...room, isDay: !room.isDay}})}>
                { 
                  room.isDay ? (
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
              <TouchableOpacity onPress={() => this.changeRadiatorStatus(room)}>
                {
                  room.radiatorStatus === 'on' ? (
                    <Image 
                      style={[s.w35, s.h35]} 
                      source={require('../assets/images/radiator_indicator_on.png')}
                    />
                  ) : (
                    room.radiatorStatus === 'half' ? (
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
          <View style={[s.pv15, s.aic, s.jcsb, s.flx_row, s.bbw1, s.b_grey]}>
            <View style={[s.jcc, s.aic, s.flx_row]}>
              <Image 
                style={[s.w15, s.h375]} 
                source={require('../assets/images/thermometer_icon.png')}
              />
              <Text style={[s.fs125, s.white, s.tc, s.pl1]}>Температура</Text>
            </View>
            <View style={[s.flx_row, s.jcc, s.ass]}>
              <Text style={[s.fs25, s.white, s.tc]}>{room.temperature}</Text>
              <View>
                <View style={[s.bw1, s.b_white, s.br1, s.w075, s.h075, s.mt075, s.ml025]}></View>
              </View>
            </View>
          </View>
          <View style={[s.pv15, s.ass, s.jcc, s.bbw1, s.b_grey]}>
            <View style={[s.flx_row, s.jcsb]}>
              <View>
                <Text style={[s.fs125, s.white, s.tl]}>
                  Потребление энергии
                </Text>
              </View>
              <View>
                <Text style={[s.fs15, s.white, s.tr]}>
                  {room.consumption} KW
                </Text>
              </View>
            </View>
            <View style={[s.flx_row, s.jcsb, s.flx_grow, {flexBasis: 100}]}>
              <View>
                <Text style={[s.fs125, s.white, s.tc]}>
                  Расходы средств
                </Text>
              </View>
              <View>
                <Text style={[s.fs15, s.white, s.tc]}>
                  {room.costs} UAH
                </Text>
              </View>
            </View>
          </View>
          <View style={[s.flx_i, s.pv15, s.jcc, s.ais]}>
            <Text style={[s.fs125, s.white, s.tc]}>Установить температуру</Text>
            <Text style={[s.fs25, s.white, s.tc, s.pv15]}>{room.customTemperature}</Text>
            <Slider
              step={1}
              value={this.temp}
              maximumValue={35} 
              minimumValue={15}
              thumbTintColor={'red'}
              maximumTrackTintColor={'blue'} 
              minimumTrackTintColor={'red'}
              onValueChange={this.changeTemperature()}
            ></Slider>
          </View>
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
