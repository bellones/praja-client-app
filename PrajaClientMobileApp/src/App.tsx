/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigation';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './theme/ThemeProvider';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
