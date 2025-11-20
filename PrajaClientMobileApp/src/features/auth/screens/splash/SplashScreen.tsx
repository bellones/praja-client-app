import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from '../../../../navigation/types';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme/ThemeProvider';

type SplashScreenProps = RootStackScreenProps<'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const navigation = useNavigation<RootStackScreenProps<'Splash'>['navigation']>();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { theme } = useTheme();

  useEffect(() => {
    // Tempo mínimo de exibição do splash (você pode ajustar)
    const timer = setTimeout(() => {
      // Navega para Auth ou App baseado na autenticação
      if (accessToken) {
        navigation.replace('App');
      } else {
        navigation.replace('Auth');
      }
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, [navigation, accessToken]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: 24,
      fontFamily: theme.fonts.primary,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Praja</Text>
    </View>
  );
};

export default SplashScreen;