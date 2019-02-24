import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
  TouchableOpacity,
  SafeAreaView // for larger screens like iPhone X
} from 'react-native';
import { 
  createAppContainer, // explicit app container required for navigators as of react-navigation v3
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from './screens/Home'
import LoginScreen from './screens/Login'
import ProfileScreen from './screens/Profile'
import SearchScreen from './screens/Search'
import StreamScreen from './screens/Stream'


// Get width and height depending on device
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height



// Song screen for immediate playing
class SongScreen extends Component {

  static navigationOptions = {
    header: null // gets rid of header nav if playing song
  }

   // PanResponder Animation

   componentWillMount () {
    this.animation = new Animated.ValueXY({ x: 0, y: 0  })
    this.PanResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (evt, gestureState)=> true,
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({x: 0, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.moveY < SCREEN_HEIGHT && gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if(gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if(gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 60,
            tension: 1
          }).start()
        }
      } 
    })
  }


  constructor () {
    super()
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing( // see Animated API for more info, this just animates a value over time using an easing function
      this.animatedValue,
      {
        toValue: 1,
        duration: 90000,
        easing: Easing.linear
      }
    ).start(() => this.animate()) // loops the animation by repeating above Animated.timing()
  }

  render() {
    marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1], // think of as 0% to 100%, we scroll starting at left margin til SCREEN_WIDTH reached at 100%
      outputRange: [0, -SCREEN_WIDTH * 2]
    })

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Button 
            title='Im the SongScreen!'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

        <Animated.View style={styles.imageContainer}>
          <Animated.Image 
            source={require('./images/cloud.jpg')}
            style={{
              marginLeft,
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH * 3,
              position: 'absolute'
            }}
          />

          <Animated.View style={styles.upperMostIcons}>
            <TouchableOpacity>
            
            </TouchableOpacity>

            <View>
              <TouchableOpacity>
                <Text style={styles.UpperSongTitle}>Black Coffee</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.UpperArtistName}>Morgan Powers</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              
            </TouchableOpacity>

          </Animated.View>
          
          <Animated.View style={styles.upperIcons}>

            <Animated.View style={styles.upperLeftIcons}>
              <TouchableOpacity>
                <Text style={styles.artistName}>Morgan Powers</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.songTitle}>Black Coffee</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View>
              <TouchableOpacity>
                <MaterialCommunityIcons name='chevron-down' size={40} style={styles.upperRightIcon} />
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>

          <Animated.View style={styles.lowerIcons}>
            <Animated.View style={styles.lowerIconsWrapper}>

              <TouchableOpacity style={styles.likes}>
                <MaterialCommunityIcons name={'heart'} size={25} style={{color: 'white'}} />
                <Text style={{color: 'white'}}>1,414</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <FeatherIcons name={'share'} size={25} style={{color: 'white'}} />
              </TouchableOpacity>

              <TouchableOpacity>
                <MaterialCommunityIcons name={'repeat-once'} size={25} style={{color: 'white'}} />
              </TouchableOpacity>

              <TouchableOpacity>
                <MaterialIcons name={'more-horiz'} size={35} style={{color: 'white'}} />
              </TouchableOpacity>

            </Animated.View>
          </Animated.View>


        </Animated.View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headerIcon: {
    marginLeft: 10, 
    marginRight: 135
  },
  headerText: {
    fontSize: 18, 
    color: '#444', 
  },
  imageContainer: {
    position: 'absolute',
    left: 0, 
    right: 0, 
    height: SCREEN_HEIGHT
  },
  upperMostIcons: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    margin: 12
  },
  songNameAndArtistName: {
    alignItems: 'center'
  },
  UpperSongTitle: {
    color: 'white'
  },
  upperArtistName: {
    color: 'white', 
    textDecorationLine: 'underline', 
    fontWeight: 'bold'
  },
  upperIcons: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  upperLeftIcons: {
    flexDirection: 'column' 
  },
  artistName: {
    backgroundColor: '#000', 
    color: '#fff', 
    marginLeft: 15, 
    fontSize: 20, 
    fontWeight: 'bold', 
    textDecorationLine: 'underline'
  },
  songTitle: {
    backgroundColor: '#000', 
    color: '#fff', 
    marginLeft: 15, 
    marginTop: 10, 
    fontSize: 25, 
    fontWeight: 'bold'
  },
  upperRightIcon: {
    color: '#fff', 
    marginRight: 10
  },
  lowerIcons: {
    flex: 1, 
    justifyContent: 'flex-end', 
    marginBottom: 40 
  },
  lowerIconsWrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  likes: {
    flexDirection: 'row', 
    alignItems: 'center'
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

  if(routeName === 'Song') { // gets rid of tab nav if playing song
    navigationOptions.tabBarVisible = false
  } 

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

  if(routeName === 'Song') { // gets rid of tab nav if playing song
    navigationOptions.tabBarVisible = false
  } 

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

  if(routeName === 'Song') { // gets rid of tab nav if playing song
    navigationOptions.tabBarVisible = false
  } 

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

  if(routeName === 'Song') { // gets rid of tab nav if playing song
    navigationOptions.tabBarVisible = false
  } 

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