import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createAddressStyles from './AddressStyles';

const AddressScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createAddressStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Endereço" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Endereço</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddressScreen;
