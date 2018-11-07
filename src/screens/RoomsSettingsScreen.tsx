import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Room } from '../models';
import stores from '../stores';

type Props = {
  roomStore: typeof stores.roomStore
}
@inject('roomStore')
@observer
export default class RoomsSettingsScreen extends Component<Props> {

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
    }
    
    newNote('Кухня', 40);
    newNote('Спальня', 30);
    newNote('Зал', 17);
  }

	render() {
    const {roomStore} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome!{roomStore.rooms.length}</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
			</View>
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
