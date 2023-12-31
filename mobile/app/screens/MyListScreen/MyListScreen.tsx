import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'
import { FlatList, ViewStyle } from 'react-native'
import { Button, Screen } from '../../components'
import { useStores } from '../../models'
import { Post } from '../../models/Post'
import { NestedStackScreenProps } from '../../navigators/HomeNavigator'
import { colors, spacing } from '../../theme'
import { delay } from '../../utils/delay'
import { PostCard } from 'app/components/PostCard'

export const MyListScreen: FC<NestedStackScreenProps<'MyList'>> = observer(function MyListScreen(
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
    _props.navigation.navigate('PostDetail', { post })
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={$screenContentContainer}>
      <FlatList<Post>
        data={postStore.myPosts}
        extraData={postStore.myPosts.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        renderItem={({ item }) => (
          <PostCard key={item.id} post={item} handlePress={() => handlePressCard(item)} />
        )}
      />
      <Button preset="reversed" style={$resetButton} onPress={addQuestion} tx="myListScreen.add" />
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

const $resetButton: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  paddingHorizontal: spacing.xxl,
}
