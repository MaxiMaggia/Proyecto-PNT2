import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useLogoutAlert from '../../hooks/useLogoutAlert';

export default function AppBar({
  title = '',
  onLeftPress,
  onRightPress,
  scheme = 'dark', 
  showBackButton = true,
  showLogoutButton = true,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const showLogoutAlert = useLogoutAlert();
  const titleStyle = scheme === 'dark' ? styles.titleDark : styles.titleLight;

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {showBackButton ? (
        <Pressable
          onPress={handleLeftPress}
          style={styles.circleBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Volver"
          accessibilityRole="button"
        >
          <Text style={styles.iconGreen}>←</Text>
        </Pressable>
      ) : (
        <View style={{ width: 44 }} />
      )}

      <Text style={[styles.titleBase, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {showLogoutButton ? (
        <Pressable
          onPress={showLogoutAlert} 
          style={styles.circleBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Cerrar sesión"
          accessibilityRole="button"
        >
          <Text style={styles.iconGreen}>⏻</Text>
        </Pressable>
      ) : (
        <View style={{ width: 44 }} />
      )}
    </View>
  );
}