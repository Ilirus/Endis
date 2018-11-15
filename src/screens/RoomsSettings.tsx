import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Switch, Image } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Room } from '../models';
import stores from '../stores';
import { s, sizes, colors } from 'react-native-better-styles';
import Carousel from 'react-native-snap-carousel';
import SwitchSelector from 'react-native-switch-selector';

const { width, height } = Dimensions.get('window');

type Props = {
  roomStore: typeof stores.roomStore
}

type State = {
  room: any
  atHome: boolean
}
@inject('roomStore')
@observer
export default class RoomsSettingsScreen extends Component<Props, State> {

  room: any

  constructor(props: Props) {
    super(props)
    const newNote = (title: string, content: number) => {
        const note = {
          id: `$fake` + new Date() + (Math.random() * 10).toFixed(1),
          name: title,
          costs: content * 5,
          consumption: content * 30,
          customTemperature: content + 2,
          temperature: content,
        };
        props.roomStore.saveNote(note);
        this.state = {
          room: null,
          atHome: false
        }
    }
    
    newNote('Кухня', 40);
    newNote('Спальня', 30);
    newNote('Зал', 17);
  }

  renderRoom({item, index}: {item: Room, index: number}) {
    return (
      <View>
        <Text style={[s.fs15, s.white, s.tc]}>{item.name}</Text>
      </View>
    );
  }

	render() {
    const {roomStore} = this.props;
    const {atHome} = this.state;
		return (
			<ScrollView style={[s.flx_i, s.bg_primary_back]}>
        <Carousel
          data={roomStore.rooms}
          renderItem={this.renderRoom}
          sliderWidth={width}
          itemWidth={sizes[8]}
          containerCustomStyle={[s.pv05, s.bbw3, s.b_primary_light]}
          onSnapToItem={index => console.log(index)}
        />
        <View style={[s.flx_row, s.bbw2, s.b_grey, s.aic]}>
          <View style={[s.flx_grow, {flexBasis: width/2}, s.p2]}>
            <View style={[s.flx_i]}>
              <SwitchSelector  
                initial={0}
                textColor={colors.turquoise_50} //'#7a44cf'
                selectedColor={colors.turquoise}
                hasPadding
                backgroundColor={colors.primary}
                buttonColor={colors.primary_back}
                borderColor={colors.primary}
                options={[
                  { value: 'f', imageIcon: require('../assets/images/at_home_icon_half_size.png') },
                  { value: 'm', imageIcon: require('../assets/images/nat_home_icon_half_size.png') }
                ]}
                onPress={value => console.log(`Call onPress with value: ${value}`)}
              />
            </View>
          </View>
          <View style={[s.flx_row, s.flx_grow, {flexBasis: width/2}, s.jcsa, s.p2]}>
            <Image 
              style={[s.w2, s.h2]} 
              source={require('../assets/images/settings_icon.png')}
            />
            <Image 
              style={[s.w2, s.h2]} 
              source={require('../assets/images/settings_icon.png')}
            />
          </View>
        </View>
        <View style={[s.pv1, s.aic, s.jcc]}>
          <Text style={styles.welcome}>Welcom{roomStore.rooms.length}</Text>
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
