import Loader from "@/components/Loader";
import { useUserStore } from "@/stores/useUserStore";
import { getInitials } from "@/utils/get-initials";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

function Card({ title, value }: { title: string; value: string }) {
  return (
    <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
      <Text className="font-bold text-xl text-green-600 mb-1">{title}</Text>
      <Text className="font-semibold text-lg">{value}</Text>
    </View>
  );
}

export default function UserModal() {
  const { user } = useUserStore();

  if (!user) return <Loader />;

  const initials = getInitials(user.userName);

  return (
    <View className="flex-1 p-6 gap-5">
      <View className="mx-auto size-[170px] justify-center items-center bg-blue-200 rounded-full mb-3">
        <Text className="text-2xl">{initials}</Text>
      </View>

      <Card title="Usuario:" value={user.userName} />
      <Card title="Correo electronico:" value={user.userEmail} />

      <TouchableOpacity className="flex-row justify-center items-center py-4 rounded-xl bg-green-600 gap-3">
        <Ionicons name="camera" size={24} color="white" />
        <Text className="text-white text-lg font-bold">
          Agregar foto de perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
