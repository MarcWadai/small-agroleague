import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { HomeTabScreenProps, StackHomeList } from '../../navigators/HomeNavigator'
import { colors } from '../../theme'
import { PostDetailScreen } from '../PostDetailScreen'
import { HomeListScreen } from './HomeListScreen'
import { translate } from 'app/i18n'

export const HomeListNavigator: FC<HomeTabScreenProps<'HomeList'>> = observer(
  function HomeListNavigator(_props) {
    return (
      <StackHomeList.Navigator screenOptions={{ navigationBarColor: colors.background }}>
        <StackHomeList.Screen
          name="HomeList"
          component={HomeListScreen}
          options={{
            title: translate('homeListScreen.title'),
          }}
        ></StackHomeList.Screen>
        <StackHomeList.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{
            title: translate('postDetailScreen.title'),
          }}
        ></StackHomeList.Screen>
      </StackHomeList.Navigator>
    )
  },
)
