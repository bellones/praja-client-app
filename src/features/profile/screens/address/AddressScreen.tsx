import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createAddressStyles from './AddressStyles';

const AddressScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createAddressStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.row}>
            <Text style={styles.text}>Endereços</Text>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={20}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddressScreen;
