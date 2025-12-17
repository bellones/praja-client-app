import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type RoundedCaurouselItemSkeletonProps = {
  index?: number;
}

const RoundedCaurouselItemSkeleton = memo(({ index = 0 }: RoundedCaurouselItemSkeletonProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createRoundedCaurouselItemSkeletonStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.imageSkeleton} />
      <View style={styles.textSkeleton} />
    </View>
  );
});

const createRoundedCaurouselItemSkeletonStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(2),
      width: 80,
      marginTop: theme.spacing(2),
    },
    imageSkeleton: {
      width: 80,
      height: 80,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.pill,
      opacity: 0.6,
    },
    textSkeleton: {
      width: 60,
      height: 12,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.sm,
      opacity: 0.6,
    },
  });
}

export default RoundedCaurouselItemSkeleton;

