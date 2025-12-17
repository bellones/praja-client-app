import { useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Category } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";


type RoundedCaurouselProps = {
    title: string;
    data: Category[];
    renderItem: ListRenderItem<Category>;
    keyExtractor: (item: Category, index: number) => string;
    horizontal?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    snapToInterval?: number;
    decelerationRate?: 'normal' | 'fast';
    pagingEnabled?: boolean;  
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
    loading?: boolean;
    skeletonData?: number[];
    renderSkeletonItem?: ListRenderItem<number>;
    skeletonKeyExtractor?: (item: number, index: number) => string;
}

const RoundedCaurousel = ({ title, data, renderItem, keyExtractor, horizontal = true, showsHorizontalScrollIndicator = false, snapToInterval = 0, 
    decelerationRate = 'normal', pagingEnabled = false, loading = false, skeletonData = [], renderSkeletonItem, skeletonKeyExtractor }: RoundedCaurouselProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createRoundedCaurouselStyles(theme), [theme]);
    
    const commonFlatListProps = {
        contentContainerStyle: styles.listContainer,
        horizontal,
        showsHorizontalScrollIndicator,
        snapToInterval,
        decelerationRate,
        pagingEnabled,
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {loading ? (
            <FlatList
                data={skeletonData}
                renderItem={renderSkeletonItem}
                keyExtractor={skeletonKeyExtractor}
                {...commonFlatListProps}
            />
          ) : (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                {...commonFlatListProps}
            />
          )}
        </View>
    );
}

const createRoundedCaurouselStyles = (theme: AppTheme) => {
    return StyleSheet.create({

        container: {
            flexDirection: 'column',
            gap: theme.spacing(2),
            paddingVertical: theme.spacing(4),
        },
        listContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing(6),
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
            fontFamily: theme.fonts.secondary,
        },
    })
}
export default RoundedCaurousel;