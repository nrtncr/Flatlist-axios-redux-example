import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import React, { useEffect, useState } from 'react'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window')


function ProductListScreen({navigation}) {
    const [products,setProducts] = useState();
    const [filters,setFilters] = useState([
        "Cinsiyet","Ürün Çeşidi", "Marka","Renk","Beden","Fiyat"
    ]);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        getProduct();
    },[])
    const getProduct = async () =>{
        const url = "https://www.mockachino.com/42a008d9-66a2-41/products"
        await axios
        .get(url)
        .then(response =>{
            console.log("products",response.data.ProductList)
            if(response.data){
                console.log("---------------response.data.productlist",response.data.ProductList)
                setProducts(response.data.ProductList);
            }
        }).catch(err => {
            console.log(JSON.stringify(err))
          });
    }

    const getFilters = async () =>{
        const url = "https://www.mockachino.com/42a008d9-66a2-41/filter"
        await axios
        .get(url)
        .then(response =>{
            console.log("filters",response.data)
            if(response.data){
                //setProducts(response.data);
            }
        }).catch(err => {
            console.log(JSON.stringify(err))
          });
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log("geldiii togeeeel")
  
      };
    const SortAndFilter = () => {
        return(
            <View style={styles.filterSortContainer}>
            <TouchableOpacity style={[styles.commonButton,styles.sortButton]}>
                <FontAwesome name={'sort-amount-up'} size={17} color={"black"}
                    style={styles.sortIcon}
                />
                <Text style={styles.commonText}>SIRALA</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity style={styles.commonButton}
            onPress={()=>{getFilters(); toggleModal()}}>
                <Feather name={'filter'} size={17} color={"black"}
                     style={styles.filterIcon}
                />
                <Text style={styles.commonText}>FİLTRELE</Text>
            </TouchableOpacity>
    
        </View>
        )
    }
      const ListEmptyComponent = () =>{
        return(
            <Text style={styles.emptlyList}>Bu kategoride ürün bulunmamaktadır.</Text>
        )
      }
    
      const renderProduct = (item) =>{
        const product = item.item;
        return(
            <TouchableOpacity style={styles.renderItemContainer}
                onPress={()=>navigation.navigate("ProductDetailScreen",{item:product})}
            >
                <Image source={{uri:product.PictureUrl}} style={styles.itemPhoto}/>
                <View style={styles.productNameLine}>
                <Text style={styles.productName}>{product.ProductBrand}</Text>
                <Feather name={"heart"} size={18} color={"black"}/>
                </View>
                <Text style={styles.productDetail} numberOfLines={1}>{product.ModelName}</Text>
    
                <View style={styles.productPriceLine}>
                <Text style={styles.productDiscountedPrice}>{product.DiscountPrice}</Text>
                <Text style={styles.productPrice}>{product.StickerPrice}</Text>
                </View>
                {product.IsQuickCargo === true &&
                <Text style={styles.cargoInfo}>Hızlı Gönderi</Text>
                }
            </TouchableOpacity>
        )
      }

    const renderFilter = (item) =>{
        console.log("item",item)
        const filterItem = item.item
        return(
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',padding:5,paddingRight:20,alignItems:'center',width:width*0.95,height:height*0.08,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
               <Text style={{fontWeight:'600',color:'black',marginLeft:5}}>{filterItem}</Text>
               <Feather name='chevron-right' size={24} color={'black'}/>
            </TouchableOpacity>
        )
    }

    const HeaderFilter = () =>{
        return(
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>toggleModal()}>
             <AntDesign name="close" size={20} color={'black'} />
            </TouchableOpacity>
             <Text style={{marginLeft:width*0.35,fontWeight:'bold', color:'black',fontSize:16}}>Filtrele</Text>
            </View>
        )
    }
  return (
    <View>
       <FlatList
        data={products}
        renderItem={renderProduct}
        ListHeaderComponent={SortAndFilter}
        ListEmptyComponent={ListEmptyComponent}
        numColumns={"2"}
        contentContainerStyle={styles.flatList}
       />
         <Modal
        style={styles.ModalContainer}
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        customBackdrop={
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.customBackDropStyle} />
          </TouchableWithoutFeedback>
        }>
        <View style={styles.ModalView}>
          <FlatList
            data={filters}
            renderItem={renderFilter}
            ListHeaderComponent={HeaderFilter}
          />
          <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',borderRadius:3,width:width*0.85,height:40,marginRight:15}}>
            <Text style={{color:'white',fontWeight:'600',fontSize:16}}>Ürünleri Gör</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    filterSortContainer:{
        flexDirection:'row',
        width: width,
        height: height*0.07,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderBottomWidth:4,
        borderBottomColor:'lightgray',
    },
    commonButton:{
        backgroundColor:'white',
        width: width*0.5,
        height: height*0.07,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    filterButton:{
       
    },
    sortButton:{
       
    },
    commonText:{
        fontWeight:'700',
        fontSize:15,
        color:'black',
    },
    filterText:{

    },
    line:{
        backgroundColor:'lightgray',
        width:1.5,
        height:20,
    },
    sortIcon:{
        marginRight:10,
    },
    filterIcon:{
        marginRight:10,
    },
    emptlyList:{
        fontSize:14,
        fontWeight:'600'
    },
    itemPhoto:{
        width:width*0.42,
        height:height*0.30,
        marginBottom:6,
    },
    flatList:{
       alignItems:'center'
    },
    renderItemContainer:{
        margin:10,
    },
    productNameLine:{flexDirection:'row',justifyContent:'space-between'},
    productPriceLine:{flexDirection:'row',marginVertical:8},
    productName:{fontSize:15, fontWeight:'400',color:'black'},
    productDetail:{fontSize:13, color:'black',width:width*0.42},
    productDiscountedPrice:{fontSize:16,fontWeight:'bold',color:'black',marginRight:10},
    productPrice:{fontSize:13.5,fontWeight:'600',color:'gray',textDecorationLine:'line-through'},
    cargoInfo:{fontSize:13,fontWeight:'500',color:'#1E90FF'},
    customBackDropStyle: {flex: 1, backgroundColor: 'black'},
    ModalContainer:{},
    ModalView:{padding:10,width:width,height:height*0.92,backgroundColor:'white',borderRadius:10,alignItems:'center'}

})

export {ProductListScreen}