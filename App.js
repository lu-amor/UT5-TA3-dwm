import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Keyboard, FlatList } from 'react-native';
import Task from './components/TaskItem';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = ()  => {
    Keyboard.dismiss();
    if (task && task.trim() !== '') { 
      setTaskItems([...taskItems, task]);
    } else {
      alert('Your task cannot be empty');
    }
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}> 
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        {/* FlatList para hacer la lista scrolleable */}
        <FlatList
          data={taskItems}
          renderItem={({ item, index }) => (
            <Task 
              key={index} 
              text={item} 
              onDelete={() => completeTask(index)} 
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.items}
          contentContainerStyle={{ paddingBottom: 100 }} // Añadimos padding al final para evitar solapamiento con el input
        />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task'} 
          value={task} 
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9dbbd',
  },
  tasksWrapper:{
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginHorizontal: 2,
    color: '#a53860',
  },
  items: {
    flex: 1,
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f9dbbd',
    marginBottom: 30,
  },
  input: {
    paddingVertical: 15,
    width: 275,
    paddingLeft: 15,
    backgroundColor: '#ffa5ab',
    borderRadius: 60,
    borderColor: '#a53860',
    borderWidth: 2,
    color: '#450920',
  },
  addWrapper: {
    width: 55,
    height: 55,
    backgroundColor: '#ffa5ab',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a53860',
    borderWidth: 2,
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#a53860',
  },
});
