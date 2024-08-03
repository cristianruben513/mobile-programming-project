import { TextInput, useColorScheme } from "react-native";
import { Text } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: (e: any) => void;
  errors?: string;
  touched?: boolean;
  props?: any;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  onBlur,
  errors,
  touched,
  secureTextEntry = false,
  ...props
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <>
      <TextInput
        className="text-white border border-neutral-400 rounded-lg p-6 py-4 mb-5"
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholderTextColor="gray"
        style={{ color: colorScheme === "dark" ? "white" : "black" }}
        {...props}
      />

      {errors && touched ? (
        <Text className="text-red-500 mt-1 mb-3">{errors}</Text>
      ) : null}
    </>
  );
}
