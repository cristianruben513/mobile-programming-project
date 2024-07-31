import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SelectionProps } from "@/types/types"; // Ensure this import is correct

const Selection: React.FC<SelectionProps> = ({ route, navigation }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Elige que deseas ingresar</Text>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate("Grades", { class_id: route.params.class_id })}>
                    <View style={[styles.card, styles.grade]}>
                        <Text style={styles.name}>Calificacion</Text>
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/student-cap.png")}
                        />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Assists", { class_id: route.params.class_id })}>
                    <View style={[styles.card, styles.assistance]}>
                        <Text style={[styles.name, { color: "#fff" }]}>Asistencia</Text>
                        <Image style={styles.image} source={require("../../assets/images/check-circle.png")} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 60,
        width: "100%",
    },
    card: {
        height: 120,
        width: "100%",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    grade: {
        backgroundColor: "#FFD102",
    },
    assistance: {
        backgroundColor: "#009EE1",
        color: "#fff",
    },
    name: {
        fontSize: 30,
        marginRight: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 70,
    },
    main: {
        flex: 1,
        padding: 20,
        marginVertical: 150,
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default Selection;
