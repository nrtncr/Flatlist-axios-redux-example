import * as cartActions from '../redux/actions/cartActions'

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather'
import {FlatList} from 'react-native';
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('window');
function CartScreen(props) {
  const [value, setValue] = useState();
  const products = props.cart;
  const removeFromCart = props.removeFromCart;
  const [totalPrice, setTotalPrice] = useState(0)

  console.log("propssss",props.cart)
  console.log("products",products)

  useEffect(()=>{
    getProductsPrice()
   },[products])

  const getProductsPrice = ()=>{
    var total =0;
    if(products){
    products.forEach(product => {
      console.log("sepet tutar",product)
        const price = (total += product.DiscountPrice);
        setTotalPrice(price)
    });
  }
}

  const HeaderList = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepet</Text>
      </View>
    );
  };
  const renderProduct = (product) => {
    console.log("producT",product)
    const item = product.item
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.PictureUrl}} style={styles.itemPhoto} />
        <View style={styles.itemInfo}>
          <View style={styles.itemInfoTitle}>
            <Text style={styles.productName}>
              {item.ProductBrand} {item.ModelName}
            </Text>
            <TouchableOpacity onPress={()=>removeFromCart(product)}>
            <AntDesign name="close" size={18} color={'black'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemColor}>Renk: {item.Color}</Text>
          <Text style={styles.itemSize}>Beden: Standart</Text>
          <View style={styles.numbers}>
            <View style={styles.number}>
              <Text style={styles.numberText}>Adet:1</Text>
              <AntDesign name="caretdown" size={13} color={'black'} />
            </View>
            <View>
              <Text style={styles.productPrice}>{item.StickerPrice} TL</Text>
              <Text style={styles.productDiscountedPrice}>
                {item.DiscountPrice} TL
              </Text>
            </View>
          </View>
          <View style={styles.giftCheckbox}>
            <CheckBox value={value} onValueChange={value => setValue(value)} />
            <Text>Hediye Paketi İstiyorum</Text>
          </View>
        </View>
        </View>
    );
  };
  const CartBottom = () =>{
    return(
        <View style={styles.bottomArea}>
          <View style={styles.discountRate}>
          <Feather name='chevron-down' size={16} color={'green'} />
          </View>
          <View style={styles.prices}>
            <Text style={styles.productTotalText}>Toplam</Text>
            <Text style={styles.productTotalPrice}>{totalPrice.toFixed(2)} TL</Text>
          </View>
          <TouchableOpacity style={styles.addCart}>
            <Text style={styles.addCartText}>Sepeti Onayla</Text>
          </TouchableOpacity>
        </View>
    )
  }

  const EmptyCart = () =>{
    return(
      <View style={{alignItems:'center'}}>
      <Text style={{color:'black',fontSize:16,fontWeight:'600'}}>Sepetinizde Ürün bulunmamaktadır.</Text>
      </View>
    )
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        ListHeaderComponent={HeaderList}
        ListEmptyComponent={EmptyCart}
      />
      <CartBottom/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.08,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {fontSize: 16, fontWeight: '700', color: 'black'},
  itemContainer: {flexDirection: 'row', padding: 10, backgroundColor: 'white'},
  itemPhoto: {width: width * 0.2, height: height * 0.15, margin: 5},
  itemInfo: {margin: 5},
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    width: width * 0.58,
  },
  itemInfoTitle: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numbers: {flexDirection: 'row', justifyContent: 'space-between'},
  number: {
    width: width * 0.27,
    height: 22,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  itemColor: {fontSize: 13, fontWeight: '600'},
  itemSize: {fontSize: 13, fontWeight: '600'},
  numberText: {fontSize: 13, fontWeight: '600', color: 'black'},
  productDiscountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
    textDecorationLine:'line-through'
  },
  giftCheckbox: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  bottomArea: {
    position: 'absolute',
    top: height * 0.82,
    left: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    height:height*0.08,
    width:width,
    flexDirection:'row',
  },
  discountRate: {
   
  },
  discountRateText: {color: 'white', fontWeight: '600'},
  prices: {marginLeft: 12, marginRight: width * 0.29},
  productTotalPrice:{fontSize:14,fontWeight:'600',color:'green'},
  addCart: {
    width: width * 0.4,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    borderRadius: 2,
  },
  addCartText: {color: 'white', fontWeight: '600'},
  productTotalText:{fontWeight:'800',fontSize:11,color:'black'},
});


function mapStateToProps(state) {
  return {cart: state.cartReducer};
}


function mapDispatchToProps(dispatch) {
  return { 
    removeFromCart: (product) =>
    dispatch(cartActions.removeFromCart(product))};
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);
