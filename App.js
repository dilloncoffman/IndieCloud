import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation' // explicit app container required for navigators as of react-navigation v3
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from './screens/Home'
import LoginScreen from './screens/Login'
import ProfileScreen from './screens/Profile'
import SearchScreen from './screens/Search'
import StreamScreen from './screens/Stream'



// Song screen for immediate playing
class SongScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button 
          title='Im the SongScreen!'
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})

/* 
Tab navigator navigationOptions can only be changed by the stack navigators 
as of react-navigation v3, hence the need for a bunch of Stack Navigators
*/

const HomeStackNav = createStackNavigator({
  Home: HomeScreen,
  Song: SongScreen
})
const StreamStackNav = createStackNavigator({
  Stream: StreamScreen,
  Song: SongScreen
})
const SearchStackNav = createStackNavigator({
  Search: SearchScreen,
  Song: SongScreen
})
const ProfileStackNav = createStackNavigator({
  Profile: ProfileScreen,
  Song: SongScreen
})

HomeStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'Home') {
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='home' size={25} color='black' />;
  } else { // placeholder for now to ensure when going to SongScreen that Home icon doesn't disappear
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='home' size={25} color='black' />;
  }

  return navigationOptions;
}

StreamStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'Stream') {
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='flash' size={25} color='black' />;
  } else { // placeholder for now to ensure when going to SongScreen that Home icon doesn't disappear
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='flash' size={25} color='black' />;
  } 

  return navigationOptions;
}

SearchStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'Search') {
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialIcons name='search' size={25} color='black' />;
  } else { // placeholder for now to ensure when going to SongScreen that Home icon doesn't disappear
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialIcons name='search' size={25} color='black' />;
  }

  return navigationOptions;
}

ProfileStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'Profile') {
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='account' size={25} color='black' />;
  } else { // placeholder for now to ensure when going to SongScreen that Home icon doesn't disappear
    navigationOptions.tabBarIcon = ({ focused }) => <MaterialCommunityIcons name='account' size={25} color='black' />;
  }

  return navigationOptions;
}

// Create Tab Navigator using Stack Navigators
const Tabs = createBottomTabNavigator({
  Home: HomeStackNav,
  Stream: StreamStackNav,
  Search: SearchStackNav,
  Profile: ProfileStackNav
})

// Switch Navigator to show only one screen at a time
const Switch = createSwitchNavigator({
  Login: LoginScreen, // route config
  Home: Tabs // allow Home to go to any one of the Tabs configured above
}, {
  initialRouteName: 'Login' // starting screen
});

const App = createAppContainer(Switch); // wrap Switch in app container for react-navigation v3

export default App;