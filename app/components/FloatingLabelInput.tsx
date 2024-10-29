// Usage example:
// <FloatingLabelInput
//     label="Email"
//     placeholder="Enter your email"
//     value={email}
//     onChangeText={setEmail}
//     keyboardType="email-address"
//     isPassword={false}
// />
// <FloatingLabelInput
//     label="Password"
//     placeholder="Enter your password"
//     value={password}
//     onChangeText={setPassword}
//     isPassword={true}
// />
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<FloatingLabelInputProps> = ({
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#7B7B7B"
      secureTextEntry={isPassword}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#7B7B7B",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default CustomInput;
