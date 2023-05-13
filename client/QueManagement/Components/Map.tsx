/* eslint-disable no-undef */
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {fetchInterestPoints} from "../Api";
import axios from "axios";

interface InterestPoint {
  latitude: number;
  longitude: number;
  id: string;
}

const initialInterestPoints = [
  {latitude: 45.78173642570172, longitude: 21.22622501567062, id: '69'},
  {latitude: 45.75852373718626, longitude: 21.22326607813157, id: '2'},
];

export const Map = () => {
  const [interestPoints, setInterestPoints] = useState<InterestPoint[]>(
    initialInterestPoints,
  );
  const [initialPosition, setInitialPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 45.75669736751978, longitude: 21.22576658496006});

  const getInterestPoints = () => {
      fetchInterestPoints()
          .then((res) => {setInterestPoints(res.data);})
          .catch((err) => console.log(err));
  };

  const postInterestPoints = (id: string) => {
    axios
        .post("///", {
          id: id
        })
        .catch((err) => console.log(err));
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position =>
        setInitialPosition(prevPosition => ({
          ...prevPosition,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })),
      error => console.log(error),
    );
    //getInterestPoints();
  }, []);

  return (
    <View style={styles.MainContainer}>
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
        {interestPoints.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => console.log(marker.id)}
            //title={marker.title}
            //description={marker.description}
          >
            <Icon name="festival" type="materialicons" color="black" />
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
          }}
          onPress={() => console.log("pressed")}
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
