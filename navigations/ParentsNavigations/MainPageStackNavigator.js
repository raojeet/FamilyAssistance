import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import DashboardTabNavigator from './DashboardTabNavigator';
// import WatchTasks from '../../screens/swScreens/WatchTasks';
import MainPage from '../../screens/ParentsScreens/ParentsMainPage';
import firebase from '../../config/config'

const WatchTasksStackNavigator = createStackNavigator({
    Main:MainPage,
  },{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:(
        <Icon style={{padding:10}}
        onPress={()=>{
          navigation.openDrawer();
        }
    }
        name="md-menu"
        size={30}/>
      ),
      headerRight:(
        <Icon style={{padding:10}}
        name="md-exit"
        onPress={async ()=>{
          try{
            await firebase.auth().signOut();
            navigation.navigate('Welcome');
          }catch(error){
            console.log(error);
          }
        }}
        size={30}/>   
      )
    }
  }
  } 
  )  

  export default WatchTasksStackNavigator;