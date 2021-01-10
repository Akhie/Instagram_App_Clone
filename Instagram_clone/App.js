import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Text } from 'react-native'

import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyCneppyGgHYHbYxy9XqB744_TLgiBIpGbk",
  authDomain: "instagram-dev-895c4.firebaseapp.com",
  projectId: "instagram-dev-895c4",
  storageBucket: "instagram-dev-895c4.appspot.com",
  messagingSenderId: "446588640158",
  appId: "1:446588640158:web:37f9b1fa428cf6e1a1948f",
  measurementId: "G-D674TGFMFB"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: 'false',
      loggedIn: 'false'
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loaded: true,
          loggedIn: false
        })
      }
      else{
        this.setState({
          loaded: true,
          loggedIn: true
        })
      }  
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if(!loaded){
      return(
        <View>
          <Text style={{flex:1 , justifyContent: 'center' , color: 'blue'}}> Loading... </Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator InitialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown:false }}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    else{
      return(
        <Provider store={store}>
          <MainScreen />
        </Provider>  
      )
    }
  }
}

export default App

