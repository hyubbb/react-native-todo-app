import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import * as Location from "expo-location";
import handlerDate from "../../../utils/date";
import ForecastList from "./ForecastList";
import { styles } from "../../style/weatherStyles";
import { API_KEY } from "@env";
import CurrentWeather from "./CurrentWeather";

export default Weather = () => {
  const [city, setCity] = useState("...loading");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);
  const [today, setToday] = useState([]);
  const icons = {
    Clear: "sunny",
    Clouds: "cloudy",
    Rain: "rainy",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Drizzle: "day-rain",
    Thunderstorm: "lightning",
  };

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
    const { daily, current } = data;
    console.log(current);
    const { dt: todayDate, temp } = current;
    const currentDateTime = handlerDate(todayDate);
    const todayTemp = daily[0].temp;
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
          <CurrentWeather today={today} icons={icons} />
          <ForecastList days={days} icons={icons} />
        </>
      )}
    </View>
  );
};
