import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { HomeTabScreenProps, StackMyList } from '../../navigators/HomeNavigator'
import { colors } from '../../theme'
import { PostDetailScreen } from '../PostDetailScreen'
import { MyListScreen } from './MyListScreen'
import { translate } from 'app/i18n'

export const MyListNavigator: FC<HomeTabScreenProps<'MyList'>> = observer(function MyListNavigator(
  _props,
) {
  return (
    <StackMyList.Navigator screenOptions={{ navigationBarColor: colors.background }}>
      <StackMyList.Screen
        name="MyList"
        component={MyListScreen}
        options={{
          title: translate('myListScreen.title'),
        }}
      ></StackMyList.Screen>
      <StackMyList.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: translate('postDetailScreen.title'),
        }}
      ></StackMyList.Screen>
    </StackMyList.Navigator>
  )
})
