import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { RootStackScreenProps } from "../../../../navigation/types";
import { useAuthStore } from "../../../../state";

const useSplashScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Splash'>['navigation']>();
    const accessToken = useAuthStore((state) => state.accessToken);
    const logo = require('../../../../assets/images/logo.png');

    useEffect(() => {
        const timer = setTimeout(() => {
          if (accessToken) {
            navigation.replace('App');
            return;
          }
          navigation.replace('Auth');
        }, 2000); 
    
        return () => clearTimeout(timer);
      }, [navigation, accessToken]);

    return {
        logo,
    }
}
export default useSplashScreen;