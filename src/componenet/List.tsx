import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  responsiveScreenFontSize as S,
  responsiveHeight as H,
  responsiveScreenWidth as W,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem, CartItem} from '../redux/slice';
import {RootState, AppDispatch} from '../redux/store';
import {useFocusEffect} from '@react-navigation/native';

interface ListProps {
  item: CartItem;
}

const List: React.FC<ListProps> = ({item}) => {
  const [imageData, setImageData] = useState<string[]>([]);
  const [saved, setSaved] = useState<boolean>(false);


  const dispatch = useDispatch<AppDispatch>();
  const addedItems = useSelector((state: RootState) => state.cart);

  const savedFunction = (item: CartItem) => {
    setSaved(!saved);
    dispatch(addCartItem(item));
  };

  useEffect(() => {
    setImageData(item.images);
  }, [item.images]);

  useFocusEffect(
    useCallback(() => {
      setSaved(false);
    }, []),
  );

  const {name, images, displayPrice, company, address, configuration} = item;

  return (
    <>
      
      <View style={styles.main}>
        <FlatList
          data={imageData}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Image
              source={{
                uri: `https://logiqproperty.blr1.digitaloceanspaces.com/${item}`,
              }}
              style={styles.image}
            />
          )}
        />
        <View style={styles.lime}>
          <Text style={styles.limeText}>Lime Light</Text>
        </View>
        <View style={styles.priceContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text>
              {(displayPrice.priceRange?.from / 10000000).toFixed(2)}cr -{' '}
            </Text>
            <Text>{(displayPrice.priceRange?.to / 10000000).toFixed(2)}cr</Text>
          </View>
          <TouchableOpacity onPress={() => savedFunction(item)}>
            <Icon
              name={saved ? 'heart' : 'heart-outline'}
              size={S(3.8)}
              color={'#e56717'}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text>By {company.slug}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Icon name="location" size={S(3)} color={'#e56717'} />
          <Text>{address.fullAddress}</Text>
        </View>
        <View>
          <Text>{configuration[2]} Apartment</Text>
        </View>
      </View>
      


    </>
  );
};

export default List;

const styles = StyleSheet.create({
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
    borderRadius: W(2),
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
    width: '99%',
  },
 
});
