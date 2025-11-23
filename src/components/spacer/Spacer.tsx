import React, { memo, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 16,
  horizontal = false,
  vertical = true,
  style,
}) => {
  const spacerStyle = useMemo(() => {
    // evita aplicar height + width ao mesmo tempo sem querer
    if (horizontal && !vertical) {
      return [{ width: size }, style];
    }
    if (vertical && !horizontal) {
      return [{ height: size }, style];
    }
    // fallback: aplica ambos
    return [{ width: size, height: size }, style];
  }, [size, horizontal, vertical, style]);

  return (
    <View
      style={spacerStyle}
      accessible={false}
      importantForAccessibility="no"
    />
  );
};

export default memo(Spacer);