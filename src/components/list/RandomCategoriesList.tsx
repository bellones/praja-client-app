import { useMemo } from "react";
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Category } from "../../features/tabs/types";

type RandomCategoriesListProps = {
  data: Category[];
  renderItem: ListRenderItem<Category>;
  keyExtractor: (item: Category, index: number) => string;
  loading?: boolean;
  skeletonData?: number[];
  renderSkeletonItem?: ListRenderItem<number>;
  skeletonKeyExtractor?: (item: number, index: number) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const RandomCategoriesList = ({
  data,
  renderItem,
  keyExtractor,
  loading = false,
  skeletonData = [],
  renderSkeletonItem,
  skeletonKeyExtractor,
  contentContainerStyle,
}: RandomCategoriesListProps) => {
  const { theme } = useTheme();
  
  const defaultContentStyle = useMemo(() => ({
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(2),
  }), [theme]);

  const finalContentStyle = contentContainerStyle || defaultContentStyle;

  const commonFlatListProps = {
    scrollEnabled: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: finalContentStyle,
  };

  if (loading) {
    return (
      <FlatList
        data={skeletonData}
        renderItem={renderSkeletonItem}
        keyExtractor={skeletonKeyExtractor}
        {...commonFlatListProps}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={null}
      {...commonFlatListProps}
    />
  );
};

export default RandomCategoriesList;

