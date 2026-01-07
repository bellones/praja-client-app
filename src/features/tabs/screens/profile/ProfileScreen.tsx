import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../../../theme/ThemeProvider';
import useProfileScreen from '../../hooks/profile/useProfileScreen';
import { createProfileStyles } from './ProfileStyles';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createProfileStyles(theme), [theme]);
  const {
    user,
    menuItems,
    renderMenuItem,
    renderSeparator,
    ListHeaderComponent,
  } = useProfileScreen();

  const ItemSeparatorComponent = useMemo(
    () => renderSeparator(styles.separator),
    [renderSeparator, styles.separator]
  );

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;