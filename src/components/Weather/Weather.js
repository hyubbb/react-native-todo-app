import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";

import * as Location from "expo-location";
import handlerDate from "../../../utils/date";
import { Ionicons } from "@expo/vector-icons";
import ForecastList from "./ForecastList";
import { styles } from "../../style/weatherStyles";
const API_KEY = process.env.API_KEY;
const icons = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default Weather = () => {
  const [city, setCity] = useState("...loading");
  const [ok, setOk] = useState(true);

  const [days, setDays] = useState([]);
  const [today, setToday] = useState([]);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    await setCurrentDate({
      latitude,
      longitude,
    });
  };

  const setCurrentDate = async ({ latitude, longitude }) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
    );

    const data = await response.json();
    console.log(data);
    const { daily, current } = data;
    const { dt: todayDate, weather: todayWeather, temp } = current;
    const currentDateTime = handlerDate(todayDate);
    const todayTemp = daily[0].temp;
    console.log(current);
    const todayData = {
      ...current,
      nowTemp: temp,
      temp: todayTemp,
      date: currentDateTime,
    };
    setToday(todayData);
    setDays(daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>

        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.day}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>{today.date.koDate}</Text>
                <Text style={styles.date}>{today.date.weekday}</Text>
              </View>
              <View>
                <Ionicons
                  name={icons[today.weather[0].main]}
                  size={40}
                  style={styles.icon}
                  color='#fff'
                />
                <Text style={styles.temp}>
                  {parseFloat(today.nowTemp).toFixed(1)} °
                </Text>
              </View>

              <Text style={styles.description}>
                {today.weather[0].description}
              </Text>
              <View style={styles.maxminTempBox}>
                <Text style={styles.maxminTemp}>
                  {" " + parseFloat(today.temp.max).toFixed(1)}°/
                  {" " + parseFloat(today.temp.min).toFixed(1)}°
                </Text>
              </View>
            </View>
            <ForecastList days={days} />
          </>
        )}
      </View>
    </>
  );
};
