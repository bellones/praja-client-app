import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createServiceExecutionCodeStyles from './ServiceExecutionCodeStyles';

const ServiceExecutionCodeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createServiceExecutionCodeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Código de Execução da Serviço" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Código de Execução da Serviço</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ServiceExecutionCodeScreen;
