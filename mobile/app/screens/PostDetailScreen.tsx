import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Icon, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { PostCard } from "app/components/PostCard"
import { NestedStackScreenProps } from "app/navigators/HomeNavigator"
import { translate } from "app/i18n"

interface PostDetailScreenProps extends NestedStackScreenProps<"PostDetail"> {}
export const PostDetailScreen: FC<PostDetailScreenProps> = function (_props) {

  // we do nothing on card press in this page
  const handlePressCard = () => ({})
  const [post, setPost] = useState(null)
  useEffect(() => {
    console.log('props', _props)
    setPost(_props.route.params.post)
  }, [_props])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      {post ? 
        <View>
          <PostCard
          post={post}
          handlePress={handlePressCard}
          />
          <Divider/>
          <Card
            heading={translate("postDetailScreen.recoTitle")}
            verticalAlignment="space-between"
            content={post.reco?.content || translate("postDetailScreen.noRecoContent")}
            footer={post.reco?.createdBy?.name || translate("postDetailScreen.yourAgronome")}
            style={{ minHeight: 160 }}
          />
        </View> :  null      
    }

    </Screen>
  )
}

const Divider = (props) => {
  const { type = "horizontal", size = 10, line = false, style: $styleOverride } = props
  return (
    <View
      style={[
        $divider,
        type === "horizontal" && { height: size },
        type === "vertical" && { width: size },
        $styleOverride,
      ]}
    >
      {line && (
        <View
          style={[
            $line,
            type === "horizontal" && {
              width: 150,
              height: 1,
              marginStart: -75,
              marginTop: -1,
            },
            type === "vertical" && {
              height: 50,
              width: 1,
              marginTop: -25,
              marginStart: -1,
            },
          ]}
        />
      )}
    </View>
  )
}

const $divider: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
}

const $line: ViewStyle = {
  backgroundColor: colors.border,
  position: "absolute",
  left: "50%",
  top: "50%",
}


const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}