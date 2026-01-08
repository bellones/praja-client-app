import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createFavoritesStyles from './FavoritesStyles';

const FavoritesScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createFavoritesStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Favoritos" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Favoritos</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FavoritesScreen;
