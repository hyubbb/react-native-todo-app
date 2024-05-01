import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import handlerDate from "../../../utils/date";
import { styles } from "../../style/forecastStyles";

const descText = {
  "약간의 구름이 낀 하늘": "구름",
  튼구름: "흐림",
  "실 비": "약한 비",
};

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
          const descriptionText = descText[description]
            ? descText[description]
            : description;
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
                <Text style={styles.description}>{descriptionText}</Text>
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
