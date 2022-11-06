import { ProductDetailScreen, ProductListScreen } from '../screens';
import { Text, View } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import CartScreen from '../screens/CartScreen';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import { Stack } from './Stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator
       initialRouteName='Stack'
       screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarActiveTintColor:'green',
        tabBarInactiveTintColor:'black',
       }}
    >
      <Tab.Screen
        name="ProductListScreen"
        component={Stack}
        options={{
          headerShown: false,
          title:'Anasayfa',
          tabBarIcon: ({focused}) =>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ?
                (<AntDesign name='home' size={20} color={'green'} />
                ):(
                 <AntDesign name='home' size={20} color={'black'}/>
                )}
              </View>
        }}
      />
      <Tab.Screen
        name="Category"
        component={Stack}
        options={{
          headerShown: false,
          title:'Kategoriler',
          tabBarIcon: ({focused}) =>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ?
                (<AntDesign name='search1' size={20} color={'green'} />
                ):(
                 <AntDesign name='search1' size={20} color={'black'}/>
                )}
              </View>
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          title:'Sepetim',
          tabBarIcon: ({focused}) =>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ?
                (<Feather name='shopping-bag' size={20} color={'green'} />
                ):(
                 <Feather name='shopping-bag' size={20} color={'black'}/>
                )}
              </View>
        }}
      />
      <Tab.Screen
        name="MyFavorites"
        component={Stack}
        options={{
          headerShown: false,
          title:'Favorilerim',
          tabBarIcon: ({focused}) =>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ?
                (<MaterialIcons name='favorite-outline' size={24} color={'green'} />
                ):(
                 <MaterialIcons name='favorite-outline' size={24} color={'black'}/>
                )}
              </View>
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={Stack}
        options={{
          headerShown: false,
          title:'Hesabım',
          tabBarIcon: ({focused}) =>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ?
                (<MaterialCommunityIcons name='account-outline' size={25} color={'green'} />
                ):(
                 <MaterialCommunityIcons name='account-outline' size={25} color={'black'}/>
                )}
              </View>
        }}
      />
    </Tab.Navigator>
  )
}

export  {BottomTab}