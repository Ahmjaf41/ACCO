import React, { useEffect, useState } from 'react';
import { FlatList, Text, Platform, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import UserOrderItem from '../../components/shop/UserOrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);


  const orders = useSelector(state => state.orders.orders);
  const orderItems = useSelector(state => state.orders.userOrderItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
     setIsLoading(false); 
    });
  }, [dispatch]);

if(isLoading) {
  return <View style={styles.loadingIcon}>
    <ActivityIndicator size='large' color={Colors.primary} />
  </View>
}

if(orders.length === 0){
  return <View style={styles.message}>
    <Text>No Bookings found for your desired property! </Text>
  </View>
}

//console.log("<<<<<<<<<<<<<<<<<<:", orderItems)
  return (
    <FlatList
      data={orderItems}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <UserOrderItem
          image={itemData.item.product.propertyImg}
          title={itemData.item.product.title}
          price={itemData.item.price}
          product={itemData.item.product}
          profiles={itemData.item.profiles}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Booking',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  loadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20   
  }

});

export default OrdersScreen;
