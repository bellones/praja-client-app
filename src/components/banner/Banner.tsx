import { useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from "../../theme/types";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Banner = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createBannerStyles(theme), [theme]);
    const data = [
        { id: 1, title: 'Banner 1' },
        { id: 2, title: 'Banner 2' },
        { id: 3, title: 'Banner 3' },
    ]
    
    // Calculate item width: screen width minus horizontal padding and gap
    const itemWidth = SCREEN_WIDTH - (theme.spacing(4) * 2) - theme.spacing(2);
    
    return (
        <FlatList 
            contentContainerStyle={styles.container}
            data={data}
            renderItem={() => (
                <View style={[styles.item, { width: itemWidth }]} />
            )}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth + theme.spacing(2)}
            decelerationRate="fast"
            pagingEnabled={false}
        />
    )
}

const createBannerStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        paddingVertical: theme.spacing(2),
        height: 160,
    },
    item: {
        backgroundColor: theme.colors.disabled,
        borderRadius: theme.radius.md,
        height: 150,
        marginRight: theme.spacing(2),
    },
});

export default Banner;