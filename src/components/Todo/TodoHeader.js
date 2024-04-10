import React from "react";
import { styles } from "../../style/todoStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../utils/colors";

export default TodoInput = ({ saveWorking, working }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => saveWorking(true)}>
        <Text
          style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => saveWorking(false)}>
        <Text
          style={{
            ...styles.btnText,
            color: !working ? "white" : theme.grey,
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
};
