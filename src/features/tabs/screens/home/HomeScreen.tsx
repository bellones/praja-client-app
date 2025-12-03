
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import createHomeStyles from './HomeStyles';

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Início</Text>
      </SafeAreaView>
  )
}

export default HomeScreen