import React from "react";
import {Dimensions, Text, View } from "react-native";
import { PieChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';

const chartData = [
    {
        name: 'Queue',
        population:  5 + Math.random(),
        color: '#b700ff',
        legendFontColor: '#b700ff',
        legendFontSize: 15,
    },
    {
        name: 'Virtual queue',
        population: 20,
        color: '#00aeff',
        legendFontColor: '#00aeff',
        legendFontSize: 15,
    },
];

export const Graphs = () => {
    const data = {
        labels: ['9-11', '11-13', '13-15', '15-17', '17-19'],
        datasets: [
            {
                data: [10, 45, 28, 80, 99, 0],
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue color
            },
        ],
    };
    return (<View>
        <Text style={{fontSize: 30, marginLeft: 160, marginTop: 50}}>Details</Text>

        <PieChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={220}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 10]}
        hasLegend={true}
        chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundColor: '#000',

        }}
        style={{
            marginTop: 50
        }}
    />

        <BarChart
            data={data}
            width={400}
            height={200}
            chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black color
                style: {
                    borderRadius: 16,
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
                marginTop: 50
            }}
        />
    </View>);
}