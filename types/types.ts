import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Selection: { class_id: number };
  Grades: { class_id: number };
  Assists: { class_id: number };
};

export type SelectionProps = NativeStackScreenProps<
  RootStackParamList,
  "Selection"
>;
export type GradesProps = NativeStackScreenProps<RootStackParamList, "Grades">;
export type AssistsProps = NativeStackScreenProps<
  RootStackParamList,
  "Assists"
>;
