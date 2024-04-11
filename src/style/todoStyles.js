import { StyleSheet } from "react-native";
import { theme } from "../../utils/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 45,
    fontFamily: "z",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  editing: {
    borderRadius: 30,
    width: 140,
  },
  scrollView: {},
  btnBox: {
    flexDirection: "row",
    gap: 20,
  },
  todo: {
    backgroundColor: theme.bg,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  todoEditing: {
    backgroundColor: "#fff",
  },
  todoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
  },
  todoTextComplete: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
