import { Dimensions, StyleSheet } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FONT = "PretendardRegular";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393b3a",
  },
  city: {
    marginTop: 50,
    marginVertical: 0,
    alignItems: "center",
  },
  cityName: {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: "600",
    color: "#fff",
  },
  dateBox: {
    marginTop: 10,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontFamily: FONT,
    fontSize: 20,
    color: "#fff",
    width: "100",
    color: "#757575",
  },
  day: { alignItems: "center" },
  temp: { fontFamily: FONT, fontSize: 80, color: "#fff", letterSpacing: -3 },
  tempBox: { flexDirection: "row", alignItems: "center", gap: 20 },
  descriptionBox: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 40,
  },
  description: {
    fontFamily: FONT,
    fontSize: 20,
    color: "#fff",
  },
  maxminTempBox: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 40,
  },
  maxminTemp: {
    fontFamily: FONT,
    fontSize: 20,
    color: "#fff",
  },
});
