import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, ShiftDetailScreen } from '../screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  ShiftScreen: undefined;
  ShiftDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={Home}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Детали смены',
            headerStyle: {
              backgroundColor: '#F9FAFB',
            },
            headerTintColor: '#6366F1',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
          name="ShiftDetailScreen"
          component={ShiftDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
