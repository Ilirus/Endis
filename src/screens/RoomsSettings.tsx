import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Switch } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Room } from '../models';
import stores from '../stores';
import { s, sizes } from 'react-native-better-styles';
import Carousel from 'react-native-snap-carousel';
import ToggleSwitch from 'toggle-switch-react-native';

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
        <Text style={[s.fs2, s.white, s.tc]}>{item.name}</Text>
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
          itemWidth={125}
          containerCustomStyle={[s.pv1, s.bbw3, s.b_primary_light]}
          onSnapToItem={index => console.log(index)}
        />
        <ToggleSwitch
          isOn={atHome}
          onColor='green'
          offColor='red'
          label='Example label'
          labelStyle={{color: 'black', fontWeight: '900'}}
          size='large'
          onToggle={isOn => this.setState({atHome: isOn})}
        />
        <Switch
          value={atHome}
          onValueChange={atHome => this.setState({atHome})}
        >
          
        </Switch>
        <View style={[s.pv1, s.aic, s.jcc]}>
          <Text style={styles.welcome}>Welcome{roomStore.rooms.length}</Text>
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
