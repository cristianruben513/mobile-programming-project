import { FlatList, SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import ClassCard from "@/components/Class/ClassCard";
import Loader from "@/components/Loader";
import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { ClassCardProps } from "@/types/classCard";

export default function HomeScreen() {
  const { data, error } = useDatabaseQuery(
    `SELECT
      Classes.id_class as id,
      Classes.name as className, 
      Classes.cover as cover,
      Users.name as teacherName    
     FROM Classes 
     INNER JOIN Teachers ON Classes.id_teacher = Teachers.id_teacher 
     INNER JOIN Users ON Teachers.id_user = Users.id_user`,
    [],
  );

  console.log("dddddddddddd");
  console.log(data);

  if (error) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 gap-6 px-6">
        <FlatList
          className="pb-4"
          data={data}
          keyExtractor={(item: ClassCardProps) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassCard
              id={item?.id}
              teacherName={item.teacherName}
              cover={item.cover}
              className={item.className}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
