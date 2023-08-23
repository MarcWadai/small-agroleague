import React, { FC, useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { PostCard } from "app/components/PostCard"
import { AppStackScreenProps } from "app/navigators"

interface PostDetailScreenProps extends AppStackScreenProps<"PostDetail"> {}
export const PostDetailScreen: FC<PostDetailScreenProps> = function (_props) {

  // we do nothing on card press in this page
  const handlePressCard = () => ({})

  useEffect(() => {
    console.log('props', _props)
  }, [_props])
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <PostCard
        post={_props.route.params.post}
        handlePress={handlePressCard}
      />

    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}