import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { GradesProps } from "@/types/types";

const Grades: React.FC<GradesProps> = ({ route, navigation }) => {
    return (
        <>
            <Text>
                Grades
            </Text>
        </>
    )
}

export default Grades;