import { memo, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Category, Service } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
import ServiceListItem from "./ServiceListItem";

type CategoriesItemProps = {
  category: Category;
  index: number;
}

export const CategoriesItem = memo(({ category }: CategoriesItemProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createCategoriesItemStyles(theme),
    [theme]
  );

  const services = useMemo(
    () => category?.Service ?? [],
    [category?.Service]
  );

  const renderService = useCallback(
    ({ item, index: serviceIndex }: { item: Service, index: number }) => <ServiceListItem service={item} index={serviceIndex} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Service) => item?.id ?? '',
    []
  );

  // Use simple animation without dynamic delay to avoid worklet errors
  const enteringAnimation = useMemo(
    () => FadeInDown.springify(),
    []
  );

  return (
    <Animated.View
      entering={enteringAnimation} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>{category?.name ?? ''} </Text>
      </View>
      <FlatList
        data={services}
        renderItem={renderService}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.servicesContainer}
      />
    </Animated.View>
  );
});

const createCategoriesItemStyles = (theme: AppTheme) => StyleSheet.create({
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
    
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },

  servicesContainer: {
    paddingVertical: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    borderRadius: theme.radius.md,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },

});