import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { MyListScreen } from "../screens/MyListScreen/MyListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { HomeListScreen } from "app/screens/HomeListScreen/HomeListScreen"
import { Post } from "app/models/Post"
import { PostDetailScreen } from "app/screens"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { MyListNavigator } from "app/screens/MyListScreen/MyListNavigator"
import { HomeListNavigator } from "app/screens/HomeListScreen/HomeListNavigator"

export type HomeTabParamList = {
  HomeList: undefined,
  MyList: undefined,
}

export type PostDetailParam = {
  post: Post
}

type NestedStackScreenParamList = {
  HomeList: undefined
  PostDetail : PostDetailParam,
  MyList: undefined
}

export const StackHomeList = createNativeStackNavigator<NestedStackScreenParamList>()
export const StackMyList = createNativeStackNavigator<NestedStackScreenParamList>()
export type NestedStackScreenProps<T extends keyof NestedStackScreenParamList> = NativeStackScreenProps<
NestedStackScreenParamList,
  T
>
/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeList"
        component={HomeListNavigator}
        options={{
          tabBarAccessibilityLabel: translate("homeNavigator.homeListTab"),
          tabBarLabel: translate("homeNavigator.homeListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused && colors.tint} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="MyList"
        component={MyListNavigator}
        options={{
          tabBarAccessibilityLabel: translate("homeNavigator.myListTab"),
          tabBarLabel: translate("homeNavigator.myListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="bell" color={focused && colors.tint} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
