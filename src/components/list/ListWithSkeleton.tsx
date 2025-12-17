import React from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

type ListWithSkeletonProps<TData, TSkeleton> = {
  loading: boolean;
  data: TData[];
  skeletonData: TSkeleton[];
  renderItem: ListRenderItem<TData>;
  renderSkeletonItem: ListRenderItem<TSkeleton>;
  keyExtractor: (item: TData, index: number) => string;
  skeletonKeyExtractor: (item: TSkeleton, index: number) => string;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
  showsVerticalScrollIndicator?: boolean;
};

const ListWithSkeleton = <TData, TSkeleton>({
  loading,
  data,
  skeletonData,
  renderItem,
  renderSkeletonItem,
  keyExtractor,
  skeletonKeyExtractor,
  ListHeaderComponent,
  containerStyle,
  contentContainerStyle,
  edges = ['top', 'left', 'right'],
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 10,
  removeClippedSubviews = true,
  showsVerticalScrollIndicator = false,
}: ListWithSkeletonProps<TData, TSkeleton>) => {
  
  const commonFlatListProps = {
    ListHeaderComponent,
    contentContainerStyle,
    showsVerticalScrollIndicator,
    initialNumToRender,
    maxToRenderPerBatch,
    windowSize,
    removeClippedSubviews,
  };

  return (
    <SafeAreaView style={containerStyle} edges={edges}>
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
    </SafeAreaView>
  );
};

export default ListWithSkeleton;

