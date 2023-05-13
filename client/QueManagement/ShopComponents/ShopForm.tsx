import React from "react"
import {StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomInput from "./CustomInputs";
import { CustomInputShop } from "./CustomInputSgop";
import {Controller, FieldValues, useForm} from 'react-hook-form';
import axios from "axios";

export const ShopForm = () => {
    const {control, handleSubmit} = useForm();
    const postShopForm = async (data: FieldValues) => {
        const response = await axios
            .post('http://10.0.2.2:5080:5080/api/PoIInteraction', {
                data: {
                    name: data.name,
                    location: data.location,
                    latitude: data.latitude,
                    longitude: data.longitude,
                },
            })
            .then(response => console.log(response))
            // .then(response => response.json())
            .catch(err => console.log(err));
    };
    const onSubmitPressed = async (data: FieldValues) => {
        try {
            const response = await postShopForm(data);
            console.log(response);
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register enterprise</Text>
            <CustomInputShop
                control={control}
                name={'patientName'}
                placeholder={'Name'}
            />
            <CustomInputShop
                control={control}
                name={'location'}
                placeholder={'Location'}
            />
            <CustomInputShop control={control} name={'latitude'} placeholder={'Latitude'} />
            <CustomInputShop control={control} name={'longitude'} placeholder={'Longitude'} />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(data => onSubmitPressed(data))}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2C3E50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button1: {
        backgroundColor: '#ABB2B9',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});