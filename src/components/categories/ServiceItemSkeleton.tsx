import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type ServiceItemSkeletonProps = {
  index?: number;
}

const ServiceItemSkeleton = memo(({ index = 0 }: ServiceItemSkeletonProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createServiceItemSkeletonStyles(theme),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.skeleton} />
    </View>
  );
});

export default ServiceItemSkeleton;

const createServiceItemSkeletonStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    width: 120,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    opacity: 0.6,
  },
});



