import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home } from '../screens';

export type RootStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
