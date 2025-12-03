import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Service } from "../../features/tabs/types";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type ServiceListItemProps = {
  service: Service;
}

const ServiceListItem = memo(({ service }: ServiceListItemProps) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createServiceListItemStyles(theme),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{service?.name ?? ''}</Text>
    </View>
  );
});

export default ServiceListItem;

const createServiceListItemStyles = (theme: AppTheme) => StyleSheet.create({

  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primaryText,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
  },
});