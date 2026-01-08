import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createPaymentsStyles from './PaymentsStyles';

const PaymentsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createPaymentsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Pagamentos" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Pagamentos</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaymentsScreen;
