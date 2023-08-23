import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  FlatList,
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
import { PostCard } from "app/components/PostCard"

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

    function addQuestion() {
      console.log('lets add a question')
    }

    const handlePressCard = (post) => {
      _props.navigation.navigate('PostDetail', { post})
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <FlatList<Post>
          data={postStore.myPosts}
          extraData={postStore.myPosts.length}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="myListScreen.title" />
            </View>
          }
          renderItem={({ item }) => (
            <PostCard
              key={item.id}
              post={item}
              handlePress={() => handlePressCard(item)}
            />
          )}
        />
        <Button
        preset="reversed"
        style={$resetButton}
        onPress={addQuestion}
        tx="myListScreen.add"
      />
      </Screen>
    )
  },
)

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


const $resetButton: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  paddingHorizontal: spacing.xxl,
}
