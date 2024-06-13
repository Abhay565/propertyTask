import {
  FlatList,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from "../API's/api";
import List from '../componenet/List';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize as S,
  responsiveHeight as H,
  responsiveScreenWidth as W,
} from 'react-native-responsive-dimensions';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get('v1/property');
      console.log('response', response.data.propertyList);
      setData(response.data.propertyList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container2}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.change}>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => setShowModal(true)}>
            <Text style={styles.filterText}>Filter</Text>
            <Icon name="filter" size={S(2)} color={'#e56717'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.propertyContainer}>
            <Text style={styles.propertyText}>Types of Property</Text>
            <Icon name="chevron-down" size={S(2)} color={'#808080'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({item}) => <List item={item} />}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={{flex: 1, alignItems: 'center', top: 50, right: 20}}>
          <TouchableOpacity
            style={{
              // width: W(95),
              backgroundColor: '#fff',
            }}
            onPress={() => setShowModal(true)}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
              <Text style={styles.select}>Apartment</Text>
              <Text style={styles.select}>Bungalow/villa</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly', gap:2}}>
              <Text style={styles.select}>Pent House</Text>
              <Text style={styles.select}>Row House</Text>
              <Text style={styles.select}>farm House</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap:10, marginHorizontal:W(4)}}>
              <Text style={styles.select2} onPress={()=>setShowModal(false)}>Cancel</Text>
              <Text style={[styles.select2, {backgroundColor: '#e56717'}]} onPress={()=>setShowModal(false)} >
                Apply
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  change: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: W(4),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e56717',
    width: '30%',
    borderRadius: W(10),
    marginHorizontal: W(4),
    paddingVertical: W(3),
  },
  filterText: {
    textAlign: 'center',
    marginLeft: W(4),
    width: '50%',
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e56717',
    width: '50%',
    borderRadius: W(10),
    paddingVertical: W(3),
  },
  propertyText: {
    textAlign: 'center',
    marginLeft: W(3),
    width: '78%',
  },
  select: {
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,1)',
    paddingHorizontal: W(2),
    marginVertical: W(2),
    borderRadius: W(5),
    fontSize: S(2.4),
    color: '#000',
  },
  select2: {
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,1)',
    paddingHorizontal: W(6),
    marginVertical: W(4),
    paddingVertical: W(2),
    gap: 2,
    borderRadius: W(5),
    fontSize: S(2.4),
    color: '#000',
  },
});

export default Home;
