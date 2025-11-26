import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Category, Service } from '../../features/categories/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';
import TextButton from '../textbutton/TextButton';
import { CategoryCard } from './CategoryCard';

interface CategorySectionProps {
  category: Category;
  onServicePress?: (service: Service) => void;
  onSeeMorePress?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  onServicePress,
  onSeeMorePress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const services = category.Service || [];

  if (services.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category.name}</Text>
        {onSeeMorePress && (
          <TextButton
            text="Saiba mais"
            onPress={onSeeMorePress}
            variant="primary"
            size="small"
            underlined
          />
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <CategoryCard
              category={{
                id: service.id,
                name: service.name,
                description: service.description,
                backgroundColor: category.backgroundColor,
                image: category.image,
              }}
              onPress={() => onServicePress?.(service)}
              columns={1}
            />
            <Text style={styles.serviceTitle} numberOfLines={2}>
              {service.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.spacing(4),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      flex: 1,
    },
    servicesContainer: {
      paddingHorizontal: theme.spacing(2),
    },
    serviceCard: {
      width: 128,
      marginHorizontal: theme.spacing(1),
    },
    serviceTitle: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginTop: theme.spacing(1),
      textAlign: 'left',
      marginLeft: theme.spacing(1),
      paddingHorizontal: theme.spacing(1),
    },
  });

