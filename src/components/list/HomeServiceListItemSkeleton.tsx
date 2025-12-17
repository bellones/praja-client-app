import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type HomeServiceListItemSkeletonProps = {
  index?: number;
}

const HomeServiceListItemSkeleton = memo(({ index = 0 }: HomeServiceListItemSkeletonProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createHomeServiceListItemSkeletonStyles(theme),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.textSkeleton} />
    </View>
  );
});

const createHomeServiceListItemSkeletonStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(4),
    opacity: 0.6,
  },
  textSkeleton: {
    width: 80,
    height: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    opacity: 0.8,
  },
});

export default HomeServiceListItemSkeleton;

