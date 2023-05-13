import React, { useState } from "react"
import {ScrollView, StyleSheet, Text, View } from "react-native"
import CustomButton from "./CustomButton"
import CustomInput from "./CustomInputs"

export const LogInScreen = () => {
    const [username, setUsername] = useState<string>("");
    return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <Text style={styles.text_SignIN}>SIGN IN AS CLIENT</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Password"
                value={username}
                setValue={setUsername}
                secureTextEntry={true}
            />

            {/*<CustomButton*/}
            {/*    text="Forgot password?"*/}
            {/*    onPress={onForgotPasswordPressed}*/}
            {/*    type='TERTIARY'*/}
            {/*/>*/}
            <CustomButton text="Login" onPress={console.log("aici")}/>
            {/*<CustomButton*/}
            {/*    text="Sign In with Google"*/}
            {/*    onPress={onSignInWithGoogle}*/}
            {/*    backgrColor="#FAE9EA"*/}
            {/*    foregrColor="#DD4D44"*/}

            {/*/>*/}

            {/*<CustomButton*/}
            {/*    text="Don't have an account? Sign Up"*/}
            {/*    onPress={onSignUpPressed}*/}
            {/*    type='SECONDARY'*/}
            {/*/>*/}

        </View>
    </ScrollView>);
}

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