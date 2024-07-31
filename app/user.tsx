import Loader from "@/components/Loader";
import { useUserStore } from "@/stores/useUserStore";
import { getInitials } from "@/utils/get-initials";
import { Text, View } from "react-native";

export default function UserModal() {
  const { user } = useUserStore();

  if (!user) return <Loader />;

  const initials = getInitials(user.userName);

  return (
    <View className="flex-1 p-6 gap-5">
      <View className="mx-auto size-[170px] justify-center items-center bg-blue-200 rounded-full mb-3">
        <Text className="text-2xl">{initials}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">
          Tipo de usuario:
        </Text>
        <Text className="font-semibold text-lg">{user.userRole}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">Usuario:</Text>
        <Text className="font-semibold text-lg">{user.userName}</Text>
      </View>
      <View className="border border-neutral-300 p-5 py-4 rounded-xl bg-neutral-50">
        <Text className="font-bold text-xl text-green-600 mb-1">
          Correo electronico:
        </Text>
        <Text className="font-semibold text-lg">{user.userEmail}</Text>
      </View>
    </View>
  );
}
