import { Dimensions, StyleSheet } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FONT = "PretendardRegular";
export const styles = StyleSheet.create({
  container: {
    width: "100",
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#555657",
    borderRadius: 12,
    justifyContent: "center",
    gap: 20,
  },
  day: {
    width: "100",
    justifyContent: "space-between",
    gap: 20,
    flexDirection: "row",
    marginVertical: 10,
  },

  dateBox: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  date: {
    fontFamily: FONT,
    fontSize: 20,
    color: "#fff",
  },
  temp: { fontFamily: FONT, fontSize: 30, color: "#fff" },
  descriptionBox: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontFamily: FONT,
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  maxminTempBox: { flex: 3, alignItems: "center" },
  maxminTemp: {
    fontFamily: FONT,
    flex: 1,
    fontSize: 20,

    color: "#fff",
  },
});
