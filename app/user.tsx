import Loader from "@/components/Loader";
import { useDatabaseQuery } from "@/hooks/useDatabaseQuery";
import { Text, View } from "react-native";

export default function UserModal() {
  const query = `SELECT 
    u.id_user,
    u.name,
    u.email,
    CASE 
        WHEN s.id_student IS NOT NULL THEN 'Alumno'
        WHEN t.id_teacher IS NOT NULL THEN 'Maestro'
        ELSE 'Desconocido'
    END AS rol,
      t.field AS clase_impartida
    FROM 
    Users u
    LEFT JOIN Students s ON u.id_user = s.id_user
    LEFT JOIN Teachers t ON u.id_user = t.id_user
    where u.id_user = 8;`;

  const { data, error } = useDatabaseQuery(query, []);

  if (error || !data) return <Loader />;

  const { name } = data[0];

  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="flex-1 p-6 gap-5">
      <View className="mx-auto size-[170px] justify-center items-center bg-blue-200 rounded-full mb-3">
        <Text className="text-2xl">{initials}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">
          Tipo de usuario:
        </Text>
        <Text className="font-semibold text-lg">{data[0].rol}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">Usuario:</Text>
        <Text className="font-semibold text-lg">{data[0].name}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">
          Correo electronico:
        </Text>
        <Text className="font-semibold text-lg">{data[0].email}</Text>
      </View>
    </View>
  );
}
