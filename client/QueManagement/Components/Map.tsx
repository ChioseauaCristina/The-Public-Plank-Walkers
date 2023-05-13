/* eslint-disable no-undef */
import {Button, Modal, PermissionsAndroid, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {fetchInterestPoints} from "../Api";
import axios from "axios";
import SlidingUpPanel from "rn-sliding-up-panel";
import BottomSheet from "./BottomSheet";
import { getDistance } from 'geolib';
interface InterestPoint {
  latitude: string;
  longitude: string;
  id: string;
  name: string;
  location: string;
  //queList: any;
  virtualQue: number;
}

const initialInterestPoints = [
  {latitude: "45.78173642570172", longitude: "21.22622501567062", id: '69', name:"First", location: "Aici", virtualQue: 2},
  // {latitude: 45.75852373718626, longitude: 21.22326607813157, id: '2'},
];

const styles1 = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
export const Map = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [interestPoints, setInterestPoints] = useState<InterestPoint[]>(
    initialInterestPoints,
  );
  const [initialPosition, setInitialPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 45.74632, longitude: 21.23904});


  console.log(initialPosition);
  const getInterestPoints = () => {
      fetchInterestPoints()
          //.then(res => console.log(res.data))
          .then((res) => {setInterestPoints(res.data);})
          .catch((err) => console.log(err.message));
  };

  const postInterestPoints = (id: string) => {
    axios
        .post("///", {
          id: id
        })
        .catch((err) => console.log(err));
  }

    useEffect(() => {
      //requestLocationPermission().then(() => console.log("successs"));
      getInterestPoints();
    //   Geolocation.getCurrentPosition(
    //     position =>
    //       setInitialPosition(prevPosition => ({
    //         ...prevPosition,
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       })),
    //     error => {console.log(error);},
    // );

  }, []);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }


  const [distance, setDistance] = useState<number>(0);
  return (
    <View style={styles.MainContainer}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Text style={stylesModal.modalText}>Will you go?</Text>
            <Text style={stylesModal.modalText}>The approximate distance is {distance.toFixed(2)}km.</Text>
            <View style={stylesModal.inlineButtons}>
            <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
              <Text style={stylesModal.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
              <Text style={stylesModal.textStyle}>No</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyles}>
        {interestPoints?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude ? parseFloat(marker.latitude) : 0,
              longitude: marker.longitude ? parseFloat(marker.longitude) : 0,
            }}
            onPress={() => {setModalVisible(true); setDistance(getDistance(initialPosition, {latitude:  parseFloat(marker.latitude), longitude: parseFloat( marker.longitude)}) / 1000);} }
          >
            <Icon name="festival" type="materialicons" color="black" />
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
          }}
          onPress={() => setModalVisible(true) }
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 5
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
