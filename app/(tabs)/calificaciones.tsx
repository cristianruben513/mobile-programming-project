import { Image, Platform, SafeAreaView } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 p-6">
      <ThemedView className="p-6 gap-6 flex-1">
        <ThemedText type="title">Explore</ThemedText>

        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{" "}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
            and{" "}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/explore.tsx
            </ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in{" "}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/_layout.tsx
            </ThemedText>{" "}
            sets up the tab navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Android and iOS support">
          <ThemedText>You can open this project on Android and iOS</ThemedText>
        </Collapsible>
        <Collapsible title="Images">
          <ThemedText>
            For static images, you can use the{" "}
            <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
            provide files for different screen densities
          </ThemedText>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{ alignSelf: "center" }}
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
            to see how to load{" "}
            <ThemedText style={{ fontFamily: "SpaceMono" }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        <Collapsible title="Light and dark mode components">
          <ThemedText>
            This template has light and dark mode support. The{" "}
            <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{" "}
            hook lets you inspect what the user's current color scheme is, and
            so you can adjust UI colors accordingly.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        {Platform.select({
          ios: <ThemedText>Only iOS</ThemedText>,
        })}
      </ThemedView>
    </SafeAreaView>
  );
}
