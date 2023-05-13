/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView style={{flex: 1}}>
        {/*<NavigationContainer>*/}
        {/*  <Drawer.Navigator*/}
        {/*      drawerType="front"*/}
        {/*      initialRouteName="Profile"*/}
        {/*      drawerContentOptions={{*/}
        {/*        activeTintColor: '#e91e63',*/}
        {/*        itemStyle: { marginVertical: 10 },*/}
        {/*      }}*/}
        {/*  >*/}
        {/*  </Drawer.Navigator>*/}
        {/*</NavigationContainer>*/}
        <BottomSheet />
      </SafeAreaView>
  );
}




export default App;
