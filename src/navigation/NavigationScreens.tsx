import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, ShiftScreen } from '../screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  ShiftScreen: undefined;
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
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Доступные смены',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#007AFF',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
          name="ShiftScreen"
          component={ShiftScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
