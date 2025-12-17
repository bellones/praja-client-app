import { memo, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Service } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type HomeServiceListItemProps = {
  service: Service;
  index: number;
}

const HomeServiceListItem = memo(({ service }: HomeServiceListItemProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createHomeServiceListItemStyles(theme),
    [theme]
  );

  // Use simple animation without dynamic delay to avoid worklet errors
  const enteringAnimation = useMemo(
    () => FadeInDown.springify(),
    []
  );

  return (
    <Animated.View
      entering={enteringAnimation} style={styles.container}>
      <Text style={styles.name}>{service?.name ?? ''}</Text>
    </Animated.View>
  );
});

export default HomeServiceListItem;

const createHomeServiceListItemStyles = (theme: AppTheme) => StyleSheet.create({

  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.disabled,
    borderRadius: theme.radius.md,
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(4),
    
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primaryText,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
  },
});