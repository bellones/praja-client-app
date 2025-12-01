import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import createCategoriesStyles from './CategoriesStyles';

const CategoriesScreen = () => {
  const { theme } = useTheme();
  const styles = createCategoriesStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
       <Text>CategoriesScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default CategoriesScreen