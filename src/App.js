import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './contexts/AuthContext';
import { RealtimeProvider } from './contexts/RealtimeContext';

// Auth Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

// Main App Screens
import ProfileScreen from './screens/main/ProfileScreen';
import CalendarScreen from './screens/main/CalendarScreen';
import SponsorsScreen from './screens/main/SponsorsScreen';
import SearchScreen from './screens/main/SearchScreen';
import ChatScreen from './screens/main/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Calendar" component={CalendarScreen} />
    <Tab.Screen name="Sponsors" component={SponsorsScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <RealtimeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainApp" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </RealtimeProvider>
    </AuthProvider>
  );
};

export default App;