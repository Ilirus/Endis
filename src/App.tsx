import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { RoomsSettingsScreen, GreetingsScreen } from './screens';

const Routes = createStackNavigator(
  {
    RoomsSettings: RoomsSettingsScreen,
    Greetings: GreetingsScreen
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
