/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, {Marker} from "react-native-maps";
import { Icon } from '@rneui/themed';
import {Map} from "./Components/Map";
import BottomSheet from "./Components/BottomSheet";
import { LogInScreen } from './ShopComponents/LogInScreen';
import { Camera } from './ShopComponents/Camera';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  return (
      <SafeAreaView style={{flex: 1}}>
        {/*<NavigationContainer>*/}
        {/*  <Stack.Navigator screenOptions={{headerShown: false}}>*/}
        {/*    <Stack.Screen name="SignInAsScreen" component={SignInAsScreen} />*/}
        {/*  </Stack.Navigator>*/}
        {/*</NavigationContainer>*/}
        {loggedIn ? <BottomSheet /> : <LogInScreen />}
      </SafeAreaView>
  );
}




export default App;
