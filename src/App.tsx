import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { RoomsSettingsScreen, GreetingsScreen } from './screens';
import { Provider } from 'mobx-react/native';
import stores from './stores';
import './styles';
import { HeaderComponent } from './components';

const Routes = createStackNavigator(
  {
    RoomsSettings: RoomsSettingsScreen,
    Greetings: GreetingsScreen
  },
  {
    initialRouteName: 'Greetings',
    navigationOptions: {
      header: props => <HeaderComponent {...props} />
    },
    // headerMode: 'none'
  },
);

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider {...stores}>
        <Routes/>
      </Provider>
    );
  }
}
