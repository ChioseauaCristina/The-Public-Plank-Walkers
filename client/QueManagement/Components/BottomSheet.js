import React, {useState} from "react";
import { Text, View, Dimensions, Animated } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import {Map} from "./Map";
import {lightColors} from "@rneui/base";

const { height } = Dimensions.get("window");

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center"
    },
    section: {
        backgroundColor: lightColors.grey5,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
    },
    panel: {
        flex: 1,
        backgroundColor: "white",
        position: "relative"
    },
    panelHeader: {
        height: 140,
        backgroundColor: "#b197fc",
        justifyContent: "flex-end",
        padding: 24
    },
    textHeader: {
        fontSize: 26,
        color: "#FFF"
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -24,
        right: 18,
        width: 48,
        height: 48,
        zIndex: 1
    },
    iconBg: {
        backgroundColor: "#2b8a3e",
        position: "absolute",
        top: -24,
        right: 18,
        width: 48,
        height: 48,
        borderRadius: 24,
        zIndex: 1
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
    },
    listContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
};



const initialInterestPoints = [
    {latitude: "45.78173642570172", longitude: "21.22622501567062", id: '69', name:"First", location: "Aici", virtualQue: 2},
    // {latitude: 45.75852373718626, longitude: 21.22326607813157, id: '2'},
];



class BottomSheet extends React.Component {
    static defaultProps = {
        draggableRange: { top: height + 180 - 64, bottom: 180 }
    };

    _draggedValue = new Animated.Value(180);

    render() {
        const { top, bottom } = this.props.draggableRange;


        const backgoundOpacity = this._draggedValue.interpolate({
            inputRange: [height - 48, height],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });

        const iconTranslateY = this._draggedValue.interpolate({
            inputRange: [height - 56, height, top],
            outputRange: [0, 56, 180 - 32],
            extrapolate: "clamp"
        });

        const textTranslateY = this._draggedValue.interpolate({
            inputRange: [bottom, top],
            outputRange: [0, 8],
            extrapolate: "clamp"
        });

        const textTranslateX = this._draggedValue.interpolate({
            inputRange: [bottom, top],
            outputRange: [0, -112],
            extrapolate: "clamp"
        });

        const textScale = this._draggedValue.interpolate({
            inputRange: [bottom, top],
            outputRange: [1, 0.7],
            extrapolate: "clamp"
        });

        const objects = [{name: "Zaza", place: "Complex"},
            {name: "Farmacia Dona", place: "Farmaceutice"},
            {name: "Lidl", place: "Magazine"},
            {name: "Heaven", place: "Clubbing"},
            {name: "First", place: "First"}
        ]

        return (
            <View style={styles.container}>
                <Map />
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={this.props.draggableRange}
                    animatedValue={this._draggedValue}
                    snappingPoints={[360]}
                    height={height + 180}
                    friction={0.5}
                >

                    <View style={styles.panel}>
                        <Animated.View
                            style={[
                                styles.iconBg,
                                {
                                    opacity: backgoundOpacity,
                                    transform: [{ translateY: iconTranslateY }]
                                }
                            ]}
                        />
                        <View style={styles.panelHeader}>
                            <Animated.View
                                style={{
                                    transform: [
                                        { translateY: textTranslateY },
                                        { translateX: textTranslateX },
                                        { scale: textScale }
                                    ]
                                }}
                            >
                                <Text style={styles.textHeader}>Where you could go</Text>
                            </Animated.View>
                        </View>
                            <View style={styles.listContainer}>
                                {objects.map(m =>
                                    <View style={styles.section}>
                                    <View style={{marginRight: 110}}>
                                        <Text style={styles.label}>{m.name}</Text>
                                        <Text style={styles.value}>{m.place}</Text>
                                    </View>
                                </View>)}

                            </View>
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}

export default BottomSheet;
