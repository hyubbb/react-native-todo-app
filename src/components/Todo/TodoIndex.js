import { View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";

export default todoIndex = () => {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState([]);
  const [todos, setTodos] = useState({});
  const STORAGE_KEY = "@todos";

  useEffect(() => {
    loadTodos();
    loadWorking();
  }, []);

  const onChangeText = (payload) => setText(payload);
  const onChangeEdit = (payload) => setEditText(payload);

  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = {
      ...todos,
      [Date.now()]: { text, work: working, complete: false, edit: false },
    };
    const sortedData = sortedTodos(newTodos);
    setTodos(sortedData);
    await saveTodos(sortedData);
    setText("");
  };

  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
    }
  };

  const sortedTodos = (data) => {
    const complete = {};
    const unComplete = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.complete) {
        complete[key] = value;
      } else {
        unComplete[key] = value;
      }
    });

    const sortObjectByKeys = (obj) => {
      // 객체의 키를 기준으로 오름차순 정렬
      const sortedEntries = Object.entries(obj).sort((a, b) => a[0] - b[0]);
      // 정렬된 배열로부터 새 객체 생성
      return Object.fromEntries(sortedEntries);
    };

    const sortedComplete = sortObjectByKeys(complete);
    const sortedUnComplete = sortObjectByKeys(unComplete);

    return { ...sortedUnComplete, ...sortedComplete };
  };

  const loadTodos = async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(response);
      const sortedData = sortedTodos(data);
      setTodos(sortedData);
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

  const handlerEdit = (key) => {
    if (editing && editing !== key) {
      editTodo(editing);
    }

    editTodo(key);
  };

  const editTodo = (key) => {
    const isEditing = !todos[key].edit;
    todos[key] = {
      ...todos[key],
      text: isEditing ? todos[key].text : editText,
      edit: isEditing,
    };

    if (isEditing) {
      setEditText(todos[key].text);
      setEditing(key);
    } else {
      setEditText("");
      setEditing(false);
    }

    setTodos({ ...todos });
  };

  const completeTodo = async (key) => {
    const newTodos = { ...todos };
    newTodos[key] = { ...newTodos[key], complete: !newTodos[key].complete };
    const sortedData = sortedTodos(newTodos);
    setTodos(sortedData);
    await saveTodos(sortedData);
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
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        padding: 15,
      }}
    >
      <TodoHeader saveWorking={saveWorking} working={working} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodos={deleteTodos}
        handlerEdit={handlerEdit}
        editText={editText}
        working={working}
        onChangeText={onChangeText}
        addTodo={addTodo}
        onChangeEdit={onChangeEdit}
        text={text}
      />
    </View>
  );
};
