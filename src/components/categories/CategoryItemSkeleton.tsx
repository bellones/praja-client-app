import { memo, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
import ServiceItemSkeleton from "./ServiceItemSkeleton";

type CategoryItemSkeletonProps = {
  index?: number;
}

const CategoryItemSkeleton = memo(({ }: CategoryItemSkeletonProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createCategoryItemSkeletonStyles(theme),
    [theme]
  );

  // Create array of 4 skeleton services
  const skeletonServices = useMemo(() => Array.from({ length: 4 }, (_, i) => i), []);

  const renderSkeletonService = useCallback(
    ({ index: serviceIndex }: { index: number }) => (
      <ServiceItemSkeleton index={serviceIndex} />
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: number) => `skeleton-service-${item}`,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.titleSkeleton} />
      </View>
      <FlatList
        data={skeletonServices}
        renderItem={({ index: serviceIndex }) => renderSkeletonService({ index: serviceIndex })}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.servicesContainer}
        scrollEnabled={false}
      />
    </View>
  );
});

export default CategoryItemSkeleton;

const createCategoryItemSkeletonStyles = (theme: AppTheme) => StyleSheet.create({
  container: {    
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(4),
    borderRadius: theme.radius.md,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  titleSkeleton: {
    width: 200,
    height: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    opacity: 0.6,
  },
  servicesContainer: {
    paddingVertical: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(2),
  },
});

