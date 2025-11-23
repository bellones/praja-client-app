import { Image, Text, View, } from 'react-native';
import { AppStatusBar } from '../../../../components/statusbar/AppStatusbar';
import type { RootStackScreenProps } from '../../../../navigation/types';
import { useTheme } from '../../../../theme/ThemeProvider';
import useSplashScreen from '../../hooks/splash/useSplashScreen';
import { createSplashStyles } from './SplashStyles';

type SplashScreenProps = RootStackScreenProps<'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const {
    logo,
  } = useSplashScreen();
  const { theme } = useTheme();

  const styles = createSplashStyles(theme);

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor={theme.colors.primary} />
      <Image source={logo} style={styles.logo} />
      <View style={styles.row}>
        <Text style={styles.titleOne}>Jampa</Text>
        <Text style={styles.titleTwo}>Services</Text>
      </View>
      <Text style={styles.normalText}>Seu app de serviços</Text>
    </View>
  );
};

export default SplashScreen;