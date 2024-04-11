import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import handlerDate from "../../../utils/date";
import { styles } from "../../style/forecastStyles";

const ForecastList = ({ days, icons }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          opacity: 0.6,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            textAlign: "right",
            color: "white",
            marginRight: 15,
          }}
        >
          7일간의 날씨
        </Text>
      </View>
      <View style={""}>
        {days.map((day, idx) => {
          const { weather, dt, temp, nowTemp } = day;
          const { main, description } = weather[0];
          const { koDate, weekday } = handlerDate(dt);
          if (idx === 0) return null;
          return (
            <View key={idx} style={styles.day}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>{weekday.slice(0, 1)}</Text>
              </View>
              <View style={styles.descriptionBox}>
                <Ionicons
                  name={icons[main]}
                  size={20}
                  style={styles.icon}
                  color='#fff'
                />
                <Text style={styles.description}>{description}</Text>
              </View>
              <View style={styles.maxminTempBox}>
                <Text style={styles.maxminTemp}>
                  {" " + parseFloat(temp.min).toFixed(1)}° /
                  {" " + parseFloat(temp.max).toFixed(1)}°
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ForecastList;
