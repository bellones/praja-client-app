import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Category } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
type RoundedCaurouselItemProps = {
    category: Category;
}

const RoundedCaurouselItem = ({ category }: RoundedCaurouselItemProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createRoundedCaurouselItemStyles(theme), [theme]);
    const enteringAnimation = useMemo(
        () => FadeInDown.springify(),
        []
      );
    return (
        <Animated.View style={styles.container} entering={enteringAnimation}>
            <View style={styles.imageContainer} />
            <Text style={styles.categoryName}>{category.name}</Text>
        </Animated.View>
    );
}

const createRoundedCaurouselItemStyles = (theme: AppTheme) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing(2),
            width: 80,
            marginTop: theme.spacing(2),
        },
        imageContainer: {
            width: 80,
            height: 80,
            backgroundColor: theme.colors.disabled,
            borderRadius: theme.radius.pill,
        },
        categoryName: {
            fontSize: 10,
            fontWeight: '600',
            color: theme.colors.text,
            fontFamily: theme.fonts.secondary,
            textAlign: 'center',
        },
    });
}
export default RoundedCaurouselItem;    