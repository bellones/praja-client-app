import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createAccountDataStyles from './AccountDataStyles';

const AccountDataScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createAccountDataStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Dados da conta" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Dados da conta</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AccountDataScreen;
