import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { HeartIcon, StarIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';
import { Restaurant } from '../../features/categories/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  onFavoritePress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
  onFavoritePress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const deliveryFeeText =
    typeof restaurant.deliveryFee === 'number'
      ? `R$ ${restaurant.deliveryFee.toFixed(2)}`
      : restaurant.deliveryFee;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {restaurant.sponsored && (
        <View style={styles.sponsoredBadge}>
          <Text style={styles.sponsoredText}>Patrocinado</Text>
        </View>
      )}
      <View style={styles.content}>
        <Image source={{ uri: restaurant.logo }} style={styles.logo} />
        <View style={styles.info}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{restaurant.name}</Text>
              {restaurant.isSuper && (
                <StarIcon size={16} color={theme.colors.danger} />
              )}
            </View>
            {onFavoritePress && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onFavoritePress();
                }}
                style={styles.favoriteButton}
              >
                {restaurant.isFavorite ? (
                  <HeartIconSolid size={20} color={theme.colors.danger} />
                ) : (
                  <HeartIcon size={20} color={theme.colors.textSecondary} />
                )}
              </Pressable>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <StarIcon size={14} color={theme.colors.primary} />
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.reviews}>({restaurant.reviews})</Text>
          </View>

          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
            <Text style={styles.deliveryFee}>{deliveryFeeText}</Text>
          </View>

          {restaurant.promotions && restaurant.promotions.length > 0 && (
            <View style={styles.promotionsContainer}>
              {restaurant.promotions.map((promo, index) => (
                <View
                  key={index}
                  style={[
                    styles.promotionTag,
                    { backgroundColor: promo.color || theme.colors.primary },
                  ]}
                >
                  <Text style={styles.promotionText}>{promo.label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      marginHorizontal: theme.spacing(4),
      marginBottom: theme.spacing(3),
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    },
    sponsoredBadge: {
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(0.5),
      borderRadius: theme.radius.sm,
      zIndex: 1,
    },
    sponsoredText: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
    },
    content: {
      flexDirection: 'row',
      padding: theme.spacing(3),
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.md,
      marginRight: theme.spacing(3),
    },
    info: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(1),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginRight: theme.spacing(1),
    },
    favoriteButton: {
      padding: theme.spacing(0.5),
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    rating: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginLeft: theme.spacing(0.5),
    },
    reviews: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
      marginLeft: theme.spacing(1),
    },
    deliveryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    deliveryTime: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
      marginRight: theme.spacing(2),
    },
    deliveryFee: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
    },
    promotionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1),
    },
    promotionTag: {
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(0.5),
      borderRadius: theme.radius.sm,
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
    promotionText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
    },
  });

