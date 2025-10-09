import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
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
          name="HomeScreen"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ShiftDetailScreen"
          component={ShiftDetailScreen}
          options={{
            title: 'Детали смены',
            headerTintColor: '#6366F1',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
  },
});
