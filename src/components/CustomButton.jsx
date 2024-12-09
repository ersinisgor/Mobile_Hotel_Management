import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { COLORS } from "../utils/constants";

const CustomButton = ({ title, onPress, style, disabled, width }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 48,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    // fontFamily: "Lato-Bold",
    fontFamily: "Poppins-SemiBold",
  },
});
