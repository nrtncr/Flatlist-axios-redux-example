import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {BottomTab} from './src/navigation'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const App = () => {

  return (
    <NavigationContainer>
        <BottomTab/>
    </NavigationContainer>
  )
    
};


export default App;
