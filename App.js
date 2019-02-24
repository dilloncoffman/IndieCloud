import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation' // explicit app container required for navigators as of react-navigation v3
import LoginScreen from './screens/Login'
import HomeScreen from './screens/Home'


const Switch = createSwitchNavigator({
  Login: LoginScreen, // route config
  Home: HomeScreen
}, {
  initialRouteName: 'Login' // starting screen
});

const App = createAppContainer(Switch); // wrap Switch in app container for react-navigation v3

export default App;