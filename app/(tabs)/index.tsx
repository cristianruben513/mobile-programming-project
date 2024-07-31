import { FlatList, SafeAreaView, Text, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import ClassCard from "@/components/class/ClassCard";
import Loader from "@/components/Loader";
import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { useUserStore } from "@/stores/useUserStore";
import { ClassCardProps } from "@/types/classCard";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect } from "react";

export default function HomeScreen() {
  const { setUser } = useUserStore();
  const database = useSQLiteContext();

  const query = `
  SELECT 
      u.id_user AS userId,
      u.name AS userName,
      u.password AS userPassword,
      u.email AS userEmail,
      u.creation_date AS userCreationDate,
      COALESCE(t.id_teacher, s.id_student) AS roleId,
      CASE 
          WHEN t.id_teacher IS NOT NULL THEN 'Maestro'
          WHEN s.id_student IS NOT NULL THEN 'Estudiante'
          ELSE 'unknown'
      END AS userRole
  FROM 
      Users u
      LEFT JOIN Teachers t ON u.id_user = t.id_user
      LEFT JOIN Students s ON u.id_user = s.id_user
  WHERE 
      u.id_user = ?;
`;

  const handleGetUser = useCallback(async () => {
    const dataUser = await database.getAllAsync(query, [8]);
    setUser(dataUser[0]);
  }, [database, query, setUser]);

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
