import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createNotificationsStyles from './NotificationsStyles';

const NotificationsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createNotificationsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Notificações" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Notificações</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default NotificationsScreen;
