import { StyleSheet, Text, useColorScheme } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface Props {
  placeholder: string;
  value?: string;
  onValueChange: (value: string) => void;
  errors: string;
  touched: boolean;
  items: { label: string; value: string }[];
  props?: any;
}

export default function Picker({
  errors,
  touched,
  value,
  placeholder,
  items,
  onValueChange,
}: Props) {
  const colorScheme = useColorScheme();

  const universalStyles = StyleSheet.create({
    input: {
      marginTop: 10,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 8,
      color: colorScheme === "dark" ? "white" : "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  const pickerSelectStyles = StyleSheet.create({
    placeholder: {
      color: "gray",
    },
    inputIOS: {
      ...universalStyles.input,
    },
    inputAndroid: {
      ...universalStyles.input,
    },
  });

  return (
    <>
      <RNPickerSelect
        onValueChange={onValueChange}
        placeholder={{ label: placeholder, value: null }}
        items={items}
        style={pickerSelectStyles}
        value={value}
      />
      {errors && touched && <Text className="text-red-500 mb-6">{errors}</Text>}
    </>
  );
}
