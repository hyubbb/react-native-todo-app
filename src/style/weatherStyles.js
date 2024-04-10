import { StyleSheet } from "react-native";

export const tyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393b3a",
    gap: 30,
  },
  city: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
  },
  dateBox: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: { fontSize: 20, color: "#fff", width: "100", color: "#757575" },
  day: { width: SCREEN_WIDTH, alignItems: "center" },
  temp: { fontSize: 120, color: "#fff" },
  description: { fontSize: 30, color: "#fff" },
  descriptionBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  maxminTempBox: {
    width: SCREEN_WIDTH,
    alignItems: "flex-end",
  },
  maxminTemp: {
    fontSize: 20,
    marginRight: 30,
    color: "#fff",
  },
});
