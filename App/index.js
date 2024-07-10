// Filename: index.js
// Combined code from all files

// App.js
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.date}</Text>
      <Text>{item.duration}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No workouts recorded. Add some!</Text>}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddWorkout', { setWorkouts })}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const AddWorkoutScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  const { setWorkouts } = route.params;

  const handleAddWorkout = () => {
    setWorkouts(prevWorkouts => [...prevWorkouts, { name, date, duration }]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Workout Name" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Date" 
          value={date} 
          onChangeText={setDate} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Duration" 
          value={duration} 
          onChangeText={setDuration} 
        />
        <TouchableOpacity style={styles.button} onPress={handleAddWorkout}>
          <Text style={styles.buttonText}>Add Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    margin: 20,
    fontSize: 18,
    color: '#777',
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}