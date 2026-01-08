import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createLoyaltyStyles from './LoyaltyStyles';

const LoyaltyScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createLoyaltyStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Fidelidade" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Fidelidade</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default LoyaltyScreen;
