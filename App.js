import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "./utills/colors";
import { useEffect, useState } from "react";
export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});

  useEffect(() => {
    loadTodos();
    loadWorking();
  }, []);

  // const work = () => setWorking(true);
  // const travel = () => setWorking(false);
  const onChangeText = (payload) => setText(payload);

  const STORAGE_KEY = "@todos";

  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = {
      ...todos,
      [Date.now()]: { text, work: working, complete: false },
    };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };

  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTodos = async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(response);
      // 객체를 [키, 값] 쌍의 배열로 변환
      const itemsArray = Object.entries(data);

      // 배열을 'complete'의 값에 따라 정렬
      itemsArray.sort((a, b) => {
        const aValue = a[1].complete ? 1 : 0;
        const bValue = b[1].complete ? 1 : 0;
        return aValue - bValue; // complete가 true인 것을 앞으로
      });

      // 정렬된 배열을 다시 객체로 변환
      const sortedObject = itemsArray.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

      setTodos(sortedObject);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodos = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newTodos = {
            ...todos,
          };
          delete newTodos[key];
          setTodos(newTodos);
          saveTodos(newTodos);
        },
      },
    ]);
    return;
  };

  const editTodo = async (key) => {
    // return;
  };

  const completeTodo = async (key) => {
    const newTodos = { ...todos };
    newTodos[key] = { ...newTodos[key], complete: !newTodos[key].complete };
    setTodos(newTodos);
    await saveTodos(newTodos);

    // return;
  };

  const saveWorking = async (state) => {
    try {
      await AsyncStorage.setItem("@state", JSON.stringify(state));
      setWorking(state);
    } catch (e) {
      console.log(e);
    }
  };

  const loadWorking = async () => {
    try {
      const response = await AsyncStorage.getItem("@state");
      setWorking(JSON.parse(response));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => saveWorking(true)}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveWorking(false)}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          keyboardType='default'
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={working ? " Add a to do?" : "where do you want to to?"}
          value={text}
          onSubmitEditing={addTodo}
          returnKeyType='done'
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.keys(todos).map((key) => {
          const { text, work, complete } = todos[key];
          if (working !== work) return;
          return (
            <View key={key} style={styles.todo}>
              <Text
                style={!complete ? styles.todoText : styles.todoTextComplete}
              >
                {text}
              </Text>
              <View style={styles.btnBox}>
                <TouchableOpacity
                  onPress={() => completeTodo(key)}
                  hitSlop={10}
                >
                  <FontAwesome6
                    name='check'
                    size={14}
                    color={!complete ? theme.grey : "black"}
                  />
                </TouchableOpacity>
                {!complete && (
                  <TouchableOpacity onPress={() => editTodo(key)} hitSlop={10}>
                    <FontAwesome6
                      name='edit'
                      size={14}
                      color={!complete ? theme.grey : "black"}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteTodos(key)} hitSlop={10}>
                  <FontAwesome6
                    name='trash-alt'
                    size={14}
                    color={!complete ? theme.grey : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 30,
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
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
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
  todoText: { color: "#fff", fontSize: 14, fontWeight: 500 },
  todoTextComplete: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
