import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../redux/slice';
import { RootState, AppDispatch } from '../redux/store';
import {
  responsiveScreenFontSize as S,
  responsiveHeight as H,
  responsiveScreenWidth as W,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const Saved = () => {
  const items = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const removeItem = (id: string) => {
    dispatch(removeCartItem(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.main}>
            <FlatList
              data={item.images}
              horizontal
              keyExtractor={(image, index) => index.toString()}
              renderItem={({ item: image }) => (
                <Image
                  source={{ uri: `https://logiqproperty.blr1.digitaloceanspaces.com/${image}` }}
                  style={styles.image}
                />
              )}
            />
            <View style={styles.lime}>
              <Text style={styles.limeText}>Lime Light</Text>
            </View>
            <View style={styles.priceContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text>{(item.displayPrice.priceRange?.from / 10000000).toFixed(2)}cr - </Text>
                <Text>{(item.displayPrice.priceRange?.to / 10000000).toFixed(2)}cr</Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Icon name="trash-outline" size={S(3.8)} color={'#e56717'} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.companyName}>{item.company.name}</Text>
              <Text>By {item.company.slug}</Text>
            </View>
            <View style={styles.locationContainer}>
              <Icon name="location" size={S(3)} color={'#e56717'} />
              <Text>{item.address.fullAddress}</Text>
            </View>
            <View>
              <Text>{item.configuration[2]} Apartment</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: W(4),
    marginVertical: W(2),
    paddingHorizontal: W(4),
    paddingVertical: W(2),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: W(74),
    height: W(44),
    marginRight: W(4),
    borderRadius: 5,
  },
  lime: {
    width: '28%',
    marginTop: W(3),
    backgroundColor: 'rgba(50,255,20,1)',
    borderRadius: W(1),
  },
  limeText: {
    textAlign: 'center',
    marginVertical: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyName: {
    fontSize: S(2.7),
    fontWeight: '500',
    color: '#000',
  },
  locationContainer: {
    marginTop: W(2),
    flexDirection: 'row',
    alignItems: 'center',
    width:"98%"
  },
});
