// import React from "react"
// import {Button, StyleSheet, Text, View } from "react-native";
// import {RNCamera} from 'react-native-camera';
// import {useCamera} from 'react-native-camera-hooks';
//
// export const Camera = () => {
//     const captureHandle = async() => {
//         try {
//             const data = await takePicture();
//             console.log(data.uri);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const [{cameraRef}, {takePicture}] = useCamera(null);
//     return (<View>
//         <RNCamera ref={cameraRef} type={RNCamera.Constants.Type.back}
//              captureAudio={false}>
//             {/*<Button title="Capture" onPress={() => captureHandle()}>*/}
//
//             {/*</Button>*/}
//         </RNCamera>
//     </View>)
// }
//
// const styles = StyleSheet.create({
//     preview: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "flex-end"
//     }
// })

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const Camera = () => {
    const [photo, setPhoto] = useState(null);

    const takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        setPhoto(data.uri);
    };


    const uploadPhoto = () => {
        // Add code to send the photo to an API here
    };

    return (
        <View style={styles.container}>
            {photo ? (
                <Image source={{ uri: photo }} style={styles.preview} />
            ) : (
                <RNCamera
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <View />;
                        return (
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.button}>
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
