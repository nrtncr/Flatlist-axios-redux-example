import * as cartActions from '../redux/actions/cartActions'

import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import React from 'react'
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const {width,height} = Dimensions.get('window')
function ProductDetailScreen(props) {
  const navigation = useNavigation();
  const product = props.route.params.item;
  const addToCart = props.addToCart;

  console.log("props addToCart",addToCart)
  return (
    <View>
          <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
          <Feather name='chevron-left' size={24} color={'black'} />
          </TouchableOpacity>
          
          <View style={styles.discountRateImage}>
              <Text style={styles.discountRateText}>%{product.DiscountRate}</Text>
            </View>
          <TouchableOpacity style={styles.cart} onPress={()=>navigation.navigate('CartScreen')}>
            <Foundation name='shopping-bag' size={20} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.upload} >
            <AntDesign name='upload' size={18} color={'black'} />
          </TouchableOpacity>
          
          <Image source={{uri:product.PictureUrl}} style={styles.itemPhoto}/>
          
          <View style={styles.productNameLine}>
          <Text style={styles.productName}>{product.ProductBrand}</Text>
          <Feather name={"heart"} size={18} color={"black"}/>
          </View>
          <Text style={styles.productDetail}>{product.ModelName}</Text>

          <View style={styles.bottomArea}>
            <View style={styles.discountRate}>
              <Text style={styles.discountRateText}>%{product.DiscountRate}</Text>
            </View>
            <View style={styles.prices}>
                <Text style={styles.productPrice}>{product.StickerPrice} TL</Text>
                <Text style={styles.productDiscountedPrice}>{product.DiscountPrice} TL</Text>
            </View>
            <TouchableOpacity style={styles.addCart}
              onPress={()=>addToCart(product)}
            >
              <Text style={styles.addCartText}>Sepete Ekle</Text>
            </TouchableOpacity>
          </View>

    </View>
  )
}

const styles = StyleSheet.create({
  itemPhoto:{width:width,height:height*0.6,},
  productNameLine:{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',padding:15,paddingBottom:5},
  productName:{fontSize:15, fontWeight:'600',color:'black',backgroundColor:'white'},
  productDetail:{width:width,fontSize:13, color:'black',backgroundColor:'white',paddingHorizontal:15,paddingBottom:15},
  back:{position:'absolute',top:height*0.03,left:width*0.04,zIndex:1},
  productDiscountedPrice:{fontSize:16,fontWeight:'bold',color:'#2E8B57',marginRight:10},
  productPrice:{fontSize:12,fontWeight:'600',color:'gray',textDecorationLine:'line-through'},
  bottomArea:{position:'absolute',top:height*0.89,left:0,flexDirection:'row',paddingHorizontal:15,paddingVertical:10,backgroundColor:'white'},
  discountRate:{backgroundColor:'#FF6347', width:42,height:35,borderRadius:5,justifyContent:'center',alignItems:'center'},
  discountRateText:{color:'white',fontWeight:'600'},
  prices:{marginLeft:12, marginRight:width*0.2},
  addCart:{width:width*0.4,justifyContent:'center',alignItems:'center',backgroundColor:'#2E8B57',borderRadius:2},
  addCartText:{color:'white',fontWeight:'600'},
  discountRateImage:{backgroundColor:'#FF6347', width:50,height:30,justifyContent:'center',alignItems:'center',position:'absolute',top:height*0.54,left:0,zIndex:1},
  cart:{position:'absolute',top:height*0.03,left:width*0.90,zIndex:1},
  upload:{position:'absolute',top:height*0.03,left:width*0.81,zIndex:1}
})

function mapDispatchToProps(dispatch) {
  return { 
    addToCart: (product) =>
    dispatch(cartActions.addToCart(product))};
}

export default connect(null,mapDispatchToProps)(ProductDetailScreen);