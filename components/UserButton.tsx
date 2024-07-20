import { Link } from "expo-router";
import { Image, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";

export default function UserButton() {
  return (
    <Link href="/user" asChild>
      <Pressable
        style={{
          backgroundColor: Colors.dark.header,
          borderRadius: 20,
          marginRight: 20,
          padding: 2,
        }}
      >
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ width: 25, height: 25 }}
        />
      </Pressable>
    </Link>
  );
}
