import { FlatList, SafeAreaView, Text, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import ClassCard from "@/components/Class/ClassCard";
import Loader from "@/components/Loader";
import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { ClassCardProps } from "@/types/classCard";

export default function HomeScreen() {
  const { data, error } = useDatabaseQuery(
    ` SELECT 
        sc.id as id,
        u_student.name AS student_name,
        u_student.email AS student_email,
        c.id_class,
        c.name AS className,
        c.code AS class_code,
        c.cover AS classCover,
        t.id_teacher,
        t.field AS teacher_field,
        u_teacher.name AS teacherName,
        u_teacher.email AS teacher_email,
        u_teacher.creation_date AS teacher_creation_date
    FROM 
        Students s
        JOIN Users u_student ON s.id_user = u_student.id_user
        JOIN StudentsClasses sc ON s.id_student = sc.id_student
        JOIN Classes c ON sc.id_class = c.id_class
        JOIN Teachers t ON c.id_teacher = t.id_teacher
        JOIN Users u_teacher ON t.id_user = u_teacher.id_user
    WHERE 
        s.id_student = 1;`,
    [],
  );

  if (error) {
    return <Loader />;
  }

  if (data && data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-xl font-bold">No estas unido a niguna clase</Text>
      </View>
    );
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
              classCover={item.classCover}
              className={item.className}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
