// src/app/navigation/types.ts
import type {
    BottomTabNavigationProp,
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
  
  export type RootStackParamList = {
    Splash: undefined;
    Auth: undefined;
    App: undefined;
    ProfileStack: {
      screen: keyof ProfileStackParamList;
      params?: ProfileStackParamList[keyof ProfileStackParamList];
    };
  };
  
  export type AuthStackParamList = {
    Login: undefined;
    ForgetPassword: undefined;
    RecoverPassword: undefined;
    Splash: undefined;
    Register: undefined;
  };
  
  // 2) Bottom Tabs principais
  
  export type MainTabsParamList = {
    Home: undefined;
    Search: undefined;
    Order: undefined;
    Profile: undefined;
  };
  
  export type ProfileStackParamList = {
    Conversations: undefined;
    Notifications: undefined;
    AccountData: undefined;
    Address: undefined;
    Payments: undefined;
    Coupons: undefined;
    ServiceExecutionCode: undefined;
    Loyalty: undefined;
    Favorites: undefined;
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;
  
  export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;
  
  export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<MainTabsParamList, T>,
      NativeStackScreenProps<RootStackParamList>
    >;
  
  
  export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;
  
  export type MainTabsNavigationProp<T extends keyof MainTabsParamList> =
    BottomTabNavigationProp<MainTabsParamList, T>;
  
  export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
    CompositeScreenProps<
      NativeStackScreenProps<ProfileStackParamList, T>,
      NativeStackScreenProps<RootStackParamList>
    >;
  
  export type ProfileStackNavigationProp<T extends keyof ProfileStackParamList> =
    NativeStackNavigationProp<ProfileStackParamList, T>;
  