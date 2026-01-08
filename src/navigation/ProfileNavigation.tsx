import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  AccountDataScreen,
  AddressScreen,
  ConversationsScreen,
  CouponsScreen,
  FavoritesScreen,
  LoyaltyScreen,
  NotificationsScreen,
  PaymentsScreen,
  ServiceExecutionCodeScreen,
} from '../features/profile/screens';
import { ProfileStackParamList } from './types';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Conversations" component={ConversationsScreen} />
      <ProfileStack.Screen name="Notifications" component={NotificationsScreen} />
      <ProfileStack.Screen name="AccountData" component={AccountDataScreen} />
      <ProfileStack.Screen name="Address" component={AddressScreen} />
      <ProfileStack.Screen name="Payments" component={PaymentsScreen} />
      <ProfileStack.Screen name="Coupons" component={CouponsScreen} />
      <ProfileStack.Screen name="ServiceExecutionCode" component={ServiceExecutionCodeScreen} />
      <ProfileStack.Screen name="Loyalty" component={LoyaltyScreen} />
      <ProfileStack.Screen name="Favorites" component={FavoritesScreen} />
    </ProfileStack.Navigator>
  );
};
