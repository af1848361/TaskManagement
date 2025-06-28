import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './app';
import {routes} from '../services';
import {navigationRef} from './rootNavigation';

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={routes.app}>
        <MainStack.Screen name={routes.app} component={AppNavigation} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
