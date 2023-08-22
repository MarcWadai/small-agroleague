import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, ReactElement } from "react"
import {
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Button, Card, Screen, Text } from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { Post } from "../models/Post"
import { HomeTabScreenProps } from "../navigators/HomeNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"

const ICON_SIZE = 14

export const MyListScreen: FC<HomeTabScreenProps<"MyList">> = observer(
  function MyListScreen(_props) {
    const { postStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await postStore.fetchMyPosts()
        setIsLoading(false)
      })()
    }, [postStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([postStore.fetchMyPosts(), delay(750)])
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <FlatList<Post>
          data={postStore.posts}
          extraData={postStore.posts.length}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoPodcastListScreen.title" />
            </View>
          }
          renderItem={({ item }) => (
            <PostCard
              key={item.id}
              Post={item}
            />
          )}
        />
      </Screen>
    )
  },
)

const PostCard = observer(function PostCard({
  Post,
}: {
  Post: Post
}) {

  const handlePressCard = () => {
    
  }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={Post.createdAt}
          >
            {Post.createdAt}
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={Post.createdBy.name}
          >
            {Post.createdBy.name}
          </Text>
        </View>
      }
      content={Post.question}
      FooterComponent={
        <View>
           {Post.categories.map(cat => (
          <Button
            key={cat.id}
            style={[$favoriteButton]}
            accessibilityLabel={cat.displayName}
          >
            <Text
              size="xxs"
              accessibilityLabel={cat.displayName}
              weight="medium"
              text={cat.displayName}
            />
          </Button>
        ))}
        </View>
      }
    />
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.sm,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion

// @demo remove-file
