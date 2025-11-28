import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../../../navigation/types";
import { useAuthStore } from "../../../../state";
import { usePreloadData } from "./usePreloadData";

const useSplashScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Splash'>['navigation']>();
    const accessToken = useAuthStore((state) => state.accessToken);
    const logo = require('../../../../assets/images/logo.png');
    const { preloadCategories, isPreloading } = usePreloadData();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        // Minimum splash screen display time (2 seconds)
        const minTimer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2000);

        return () => clearTimeout(minTimer);
    }, []);

    useEffect(() => {
        const navigate = async () => {
            if (!minTimeElapsed) {
                return; // Wait for minimum time
            }

            if (accessToken) {
                // Preload data when logged in
                try {
                    await preloadCategories();
                } catch (error) {
                    console.error('Error preloading data:', error);
                    // Continue navigation even if preload fails
                }
                navigation.replace('App');
            } else {
                navigation.replace('Auth');
            }
        };

        navigate();
    }, [navigation, accessToken, minTimeElapsed, preloadCategories]);

    return {
        logo,
        isPreloading,
    }
}
export default useSplashScreen;