import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Category } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
import { CategoriesItem } from "./CategoriesItem";

type CategoriesListProps = {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createCategoriesListStyles(theme), [theme]);
  
  const renderItem = useCallback(
    ({ item, index }: { item: Category, index: number }) => <CategoriesItem category={item} index={index} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Category) => item.id ?? '',
    []
  );
  
  return (
    <FlatList
      data={categories}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
};

const createCategoriesListStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default CategoriesList;