import { Text, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import Tabs from "./src/components/Tabs/Tabs";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Harmond: require("./assets/fonts/Harmond.otf"),
      PretendardRegular: require("./assets/fonts/PretendardRegular.otf"),
    });
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs />
    </View>
  );
}
