import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { AssistsProps } from "@/types/types";


const Assists: React.FC<AssistsProps> = ({ route, navigation }) => {
    return (
        <>
            <Text>
                Assists
            </Text>
        </>
    )
}

export default Assists;