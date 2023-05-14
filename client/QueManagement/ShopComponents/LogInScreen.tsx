import React, { useState } from "react"
import {ScrollView, StyleSheet, Text, View } from "react-native"
import { Camera } from "./Camera"
import CustomButton from "./CustomButton"
import CustomInput from "./CustomInputs"
import { Graphs } from "./graphs"
import { ShopForm } from "./ShopForm"

enum ShopPageEnum {
    login = 0,
    form = 1,
    camera = 2
}

export const LogInScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<ShopPageEnum>(0);
    return (
        <View>
            {(() => {
                switch (isLoggedIn) {
                    case 0:
                        return (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View>
                                    <Text style={styles.text_SignIN}>SIGN IN AS CLIENT</Text>
                                    <CustomInput
                                        placeholder="Username"
                                        value={username}
                                        setValue={setUsername}
                                        secureTextEntry={false}
                                    />
                                    <CustomInput
                                        placeholder="Password"
                                        value={password}
                                        setValue={setPassword}
                                        secureTextEntry={true}
                                    />

                                    <CustomButton text="Login" onPress={() => setIsLoggedIn(1)} />
                                </View>
                            </ScrollView>
                        );
                    case 1:
                        return <ShopForm onSubmit = {() => setIsLoggedIn(2)}/>;
                    case 2:
                        return <Graphs />
                    default:
                        return null;
                }
            })()}
        </View>
    );
};

const styles = StyleSheet.create({
    text_SignIN:{
        textAlign: 'center',
        marginHorizontal: 50,
        marginTop:50,
        width: '70%',
        maxWidth: 300,
        fontSize: 40,
        fontFamily: 'Gill Sans Extrabold',


    },
    root:{
        alignItems: 'center',
        padding: 20,

    }
})