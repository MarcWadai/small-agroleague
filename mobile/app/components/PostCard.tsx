import React from 'react'

import { Post } from 'app/models/Post'
import { observer } from 'mobx-react-lite'
import { TextStyle, View, ViewStyle } from 'react-native'
import { Button, Card, Text } from '../components'
import { colors, spacing } from '../theme'

interface PostCardProps {
  post?: Post
  handlePress(): void
}

export const PostCard = observer(function PostCard(props: PostCardProps) {
  if (props.post) {
    return (
      <Card
        style={$item}
        verticalAlignment="force-footer-bottom"
        onPress={props.handlePress}
        HeadingComponent={
          <View style={$metadata}>
            <Text style={$metadataText} size="xxs" accessibilityLabel={props.post.createdAt}>
              {props.post.createdAt}
            </Text>
            <Text style={$metadataText} size="xxs" accessibilityLabel={props.post.createdBy.name}>
              {props.post.createdBy.name}
            </Text>
          </View>
        }
        content={props.post.question}
        FooterComponent={
          <View>
            {props.post.categories.map((cat) => (
              <Button key={cat.id} style={$favoriteButton} accessibilityLabel={cat.displayName}>
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
  }
  return <View></View>
})

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: 'row',
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: 'flex-start',
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: 'flex-start',
}
