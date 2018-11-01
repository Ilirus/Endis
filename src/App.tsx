import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { RoomsSettings, Greetings } from './screens';

const Routes = createStackNavigator(
  {
    RoomsSettings: RoomsSettings,
    Greetings: Greetings
  },
  {
    initialRouteName: 'Greetings',
    // navigationOptions: {
    //   header: props => <CustomHeader {...props} />
    // },
    headerMode: 'none'
  },
);

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return <Routes/>;
  }
}
