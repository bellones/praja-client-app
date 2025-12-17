import { useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Service } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type HomeServiceListProps = {
    title: string;
    data: Service[];
    renderItem: ListRenderItem<Service>;
    keyExtractor: (item: any) => string;
    loading?: boolean;
    skeletonData?: number[];
    renderSkeletonItem?: ListRenderItem<number>;
    skeletonKeyExtractor?: (item: number, index: number) => string;
}

const HomeServiceList = ({ title, data, renderItem, keyExtractor, loading = false, skeletonData = [], renderSkeletonItem, skeletonKeyExtractor }: HomeServiceListProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createHomeServiceListStyles(theme), [theme]);
    
    const commonFlatListProps = {
        contentContainerStyle: styles.listContainer,
        numColumns: 3,
        scrollEnabled: false,
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
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
    )
}

const createHomeServiceListStyles = (theme: AppTheme) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        listContainer: {
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing(2),
            
            
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
            fontFamily: theme.fonts.secondary,
            marginBottom: theme.spacing(4),
        },
    })
}
export default HomeServiceList;