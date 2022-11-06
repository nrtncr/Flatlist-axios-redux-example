import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";

import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {ProductListScreen} from '../screens'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const StackProduct =  createStackNavigator()
function Stack({navigation,route}) {
  const tabHiddenRoutes = ["ProductDetailScreen"]

    React.useLayoutEffect(()=>{
        const routeName =getFocusedRouteNameFromRoute(route);
        if(tabHiddenRoutes.includes(routeName)){
            navigation.setOptions({tabBarStyle:{display:"none"}})
        }else{
            navigation.setOptions({tabBarStyle:{display:"flex"}})
        }
    },[navigation,route])
  return (
    <StackProduct.Navigator>
        <StackProduct.Screen
            name = "ProductListScreen"
            component= {ProductListScreen}
            options= {{
               headerShown:false
            }}
        />
        <StackProduct.Screen
            name = "ProductDetailScreen"
            component= {ProductDetailScreen}
            options= {{
               headerShown:false,
            }}
        />
        <StackProduct.Screen
            name = "CartScreen"
            component= {CartScreen}
            options= {{
               headerShown:false,
            }}
        />
    </StackProduct.Navigator>
  )
}

export  {Stack}