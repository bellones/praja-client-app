import React, { useMemo } from 'react';
import { ListWithSkeleton } from '../../../../components/list';
import { useTheme } from '../../../../theme/ThemeProvider';
import useSearchScreen from '../../hooks/categories/useSearchScreen';
import createSearchStyles from './SearchStyles';

const SearchScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createSearchStyles(theme), [theme]);
  const {
    filteredCategoriesData,
    isLoading,
    skeletonData,
    renderItem,
    renderSkeletonItem,
    keyExtractor,
    skeletonKeyExtractor,
    ListHeaderComponent,
  } = useSearchScreen();

  return (
    <ListWithSkeleton
      loading={isLoading}
      data={filteredCategoriesData}
      skeletonData={skeletonData}
      renderItem={renderItem}
      renderSkeletonItem={renderSkeletonItem}
      keyExtractor={keyExtractor}
      skeletonKeyExtractor={skeletonKeyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      containerStyle={styles.container}
      contentContainerStyle={styles.listContainer}
      edges={['top', 'left', 'right']}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchScreen