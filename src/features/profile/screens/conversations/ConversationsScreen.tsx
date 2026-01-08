import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../../../components/appbar';
import { useTheme } from '../../../../theme/ThemeProvider';
import createConversationsStyles from './ConversationsStyles';

const ConversationsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createConversationsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <AppBar title="Conversas" />
      <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Conversas</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ConversationsScreen;
