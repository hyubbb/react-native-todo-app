import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "../../style/todoStyles";
import { theme } from "../../../utils/colors";
export default TodoList = ({
  todos,
  completeTodo,
  deleteTodos,
  handlerEdit,
  editText,
  working,
  onChangeText,
  onChangeEdit,
  addTodo,
  text,
}) => {
  return (
    <>
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(todos).map((key) => {
          const { text, work, complete, edit } = todos[key];
          if (working !== work) return;
          return (
            <View
              key={key}
              style={
                !edit ? styles.todo : { ...styles.todo, ...styles.todoEditing }
              }
            >
              {edit ? (
                <TextInput
                  keyboardType='default'
                  value={editText}
                  defaultValue={text}
                  returnKeyType='done'
                  style={styles.editing}
                  autoFocus={true}
                  onChangeText={onChangeEdit}
                  onSubmitEditing={() => handlerEdit(key)}
                />
              ) : (
                <Text
                  style={!complete ? styles.todoText : styles.todoTextComplete}
                >
                  {text}
                </Text>
              )}
              <View style={styles.btnBox}>
                {!edit && (
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
                )}
                {!complete && (
                  <TouchableOpacity
                    onPress={() => handlerEdit(key)}
                    hitSlop={10}
                  >
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
    </>
  );
};
