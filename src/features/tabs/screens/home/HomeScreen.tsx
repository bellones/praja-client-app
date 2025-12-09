
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../../../../components/banner/Banner';
import UserProfile from '../../../../components/user/UserProfile';
import { useAuthStore } from '../../../../state';
import { useTheme } from '../../../../theme/ThemeProvider';
import createHomeStyles from './HomeStyles';

const HomeScreen = () => {
  const { theme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const styles = useMemo(() => createHomeStyles(theme), [theme]);
  return (  
    <SafeAreaView style={styles.container}>
       <UserProfile user={user} /> 
       <Banner />
    </SafeAreaView>
  )
}

export default HomeScreen