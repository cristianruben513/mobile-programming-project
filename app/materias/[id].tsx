import Loader from "@/components/Loader";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SubjectExample() {
  const { id } = useLocalSearchParams();
  const { data, error } = useDatabaseQuery(
    `SELECT
      Classes.name as class_name, 
      Classes.cover as class_cover,
      Classes.code as class_code, 
      Users.name as teacher_name    
     FROM Classes 
     INNER JOIN Teachers ON Classes.id_teacher = Teachers.id_teacher 
     INNER JOIN Users ON Teachers.id_user = Users.id_user 
     WHERE Classes.id_class = ?`,
    [id],
  );

  if (error || !data || data.length === 0) {
    return <Loader />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{ uri: data[0]?.class_cover }}
          style={styles.headerImage}
        />
      }
    >
      <Stack.Screen
        options={{
          title: data[0]?.class_name,
        }}
      />

      <View>
        <Text>Profesor:</Text>
        <Text className="text-xl font-bold mt-1">{data[0]?.teacher_name}</Text>
      </View>

      <View className="p-2 px-4 border border-green-400 bg-green-50 rounded-xl">
        <ThemedText style={{ color: "green" }} type="defaultSemiBold">
          Codigo de la materia:
        </ThemedText>
        <ThemedText>{data[0]?.class_code}</ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
  },
});
