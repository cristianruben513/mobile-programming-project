import { Colors } from "@/constants/Colors";
import { useUserStore } from "@/stores/useUserStore";
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { getInitials } from "@/utils/get-initials";

export default function UserButton() {
  const { user } = useUserStore();

  const initials = getInitials(user?.userName) ?? "hh";

  return (
    <Link href="/user" asChild>
      <Pressable
        style={{
          backgroundColor: Colors.dark.header,
          borderRadius: 20,
          marginRight: 20,
          padding: 2,
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-white text-sm">{initials}</Text>
      </Pressable>
    </Link>
  );
}
