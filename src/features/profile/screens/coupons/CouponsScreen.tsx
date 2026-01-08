import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createCouponsStyles from './CouponsStyles';

const CouponsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createCouponsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Cupons" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Cupons</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CouponsScreen;
