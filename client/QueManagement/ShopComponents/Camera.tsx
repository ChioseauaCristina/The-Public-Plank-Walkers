import axios from 'axios';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const Camera = () => {
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setPhoto(data.uri);
        }
    };

    // const API = axios.create({ baseURL: 'http://10.0.2.2:5080'});
    const uploadPhoto = async () => {
        // Add code to send the photo to an API here
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: photo,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
            console.log(photo);
            // const res = await API.post()
            const response = await axios({url: 'http://10.0.2.2:8000/api/blah', data: formData, method: "POST"});
            console.log(response.data);
            setPhoto(null); // Resets the photo state to null to show the camera view again
        } catch (error) {
            console.error(error);
            setPhoto(null);
        }
    };

    return (
        <View style={styles.container}>
            {!photo && (
                <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <View />;
                        return (
                            <TouchableOpacity onPress={takePicture} style={styles.button}>
                                <Text style={styles.buttonText}>Take Photo</Text>
                            </TouchableOpacity>
                        );
                    }}
                </RNCamera>
            )}
            {photo && (
                <TouchableOpacity onPress={uploadPhoto} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Upload Photo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        width: 200,
        backgroundColor: '#4a90e2',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    uploadButton: {
        width: 200,
        backgroundColor: '#4a90e2',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 18,
    },
});
