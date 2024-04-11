import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../style/weatherStyles";

export default CurrentWeather = ({ today, icons }) => {
  return (
    <View style={styles.day}>
      <View style={styles.dateBox}>
        <Text style={styles.date}>{today.date.koDate}</Text>
        <Text style={styles.date}>{today.date.weekday}</Text>
      </View>
      <View style={styles.tempBox}>
        <Ionicons
          name={icons[today.weather[0].main]}
          size={80}
          style={styles.icon}
          color='#fff'
        />
        <Text style={styles.temp}>{parseFloat(today.nowTemp).toFixed(1)}°</Text>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{today.weather[0].description}</Text>
      </View>
      <View style={styles.maxminTempBox}>
        <Text style={styles.maxminTemp}>
          {" " + parseFloat(today.temp.max).toFixed(1)}°/
          {" " + parseFloat(today.temp.min).toFixed(1)}°
        </Text>
      </View>
    </View>
  );
};
