import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes, headers} from '../../services';
import * as App from '../../screens/app';
const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.home}>
      <AppStack.Screen name={routes.home} component={App.Home} />
      <AppStack.Screen name={routes.TaskManager} component={App.TaskManager} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
