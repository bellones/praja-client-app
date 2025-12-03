import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import createOrderStyles from './OrderStyles';

const OrderScreen = () => {

  const { theme } = useTheme();
  const styles = createOrderStyles(theme);

  return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Serviços</Text>
     </SafeAreaView>
  )
}

export default OrderScreen