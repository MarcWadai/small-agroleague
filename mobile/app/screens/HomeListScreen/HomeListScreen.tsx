import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { FlatList, ViewStyle } from 'react-native'
import { Screen } from '../../components'
import { useStores } from '../../models'
import { Post } from '../../models/Post'
import { NestedStackScreenProps } from '../../navigators/HomeNavigator'
import { spacing } from '../../theme'
import { delay } from '../../utils/delay'
import { PostCard } from 'app/components/PostCard'

export const HomeListScreen: FC<NestedStackScreenProps<any>> = observer(function HomeListScreen(
  _props,
) {
  const { postStore } = useStores()

  const [refreshing, setRefreshing] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await postStore.fetchPosts()
      setIsLoading(false)
    })()
  }, [postStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([postStore.fetchPosts(), delay(750)])
    setRefreshing(false)
  }

  const handlePressCard = (post) => {
    // _props.navigation.push('PostDetail' ,{post})
    _props.navigation.navigate('PostDetail', { post })
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={$screenContentContainer}>
      <FlatList<Post>
        data={postStore.posts}
        extraData={postStore.posts.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        renderItem={({ item }) => (
          <PostCard key={item.id} post={item} handlePress={() => handlePressCard(item)} />
        )}
      />
    </Screen>
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
