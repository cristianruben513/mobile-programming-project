import { ClassCardProps } from "@/types/classCard";
import { Link } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

export default function ClassCard({
  id,
  className,
  teacherName,
  classCover,
}: ClassCardProps) {
  return (
    <Link href={`/materias/${id}`} asChild>
      <TouchableOpacity
        className={`border rounded-lg border-sky-300/80 bg-sky-50 overflow-hidden mt-4`}
      >
        <Image
          source={{ uri: classCover }}
          style={{
            width: "100%",
            height: 80,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <View className="p-4 py-2">
          <ThemedText type="title">{className}</ThemedText>
          <ThemedText className=" font-light mt-1">{teacherName}</ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
