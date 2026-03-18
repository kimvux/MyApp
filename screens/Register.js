import { StyleSheet, Text, View, TextInput,TouchableOpacity, justifyContent, alignItems, Button, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cfpass, setCFPass] = useState("");

  const register = async () => {

    if (!username || !password || !email || !cfpass){
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password != cfpass){
      Alert.alert('Error', 'Incorrect password br br');
      return;
    }
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        Alert.alert('Error', 'Email already registered');
        return;
      }

      const user = {
        username: username,
        password: password,
        email:email,
        address: null,
        avatar: null,
        des: null,
      };
      users.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login',{user:user});
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.login}>Register</Text>

      <Text style={style.text}>Name</Text>
      <TextInput style={style.box} value={username} onChangeText={setUsername}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Email</Text>
      <TextInput style={style.box} value={email} onChangeText={setEmail}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Password</Text>
      <TextInput style={style.box} value={password} onChangeText={setPassword}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Confirm Password</Text>
      <TextInput style={style.box} value={cfpass} onChangeText={setCFPass}></TextInput>
      <View style={{height:30}}></View>

      <TouchableOpacity style={style.button} onPress={register}>
        <Text style={style.textinbox}>Create</Text> 
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    borderWidth: 3,
    borderColor: 'black',
    height:"90%",
    width:"auto",
    minWidth:300,
    padding:40,
    margin:50,
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    height:35,
    width:"100%",
    padding:10,
    marginVertical:3,
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
  login:{
    alignSelf:'center',
    fontSize:50,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:70,
    marginBottom:40
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:15
  },
  forget:{
    fontSize:15,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderWidth: 2,
    borderColor: 'black',
    height:40,
    width:120,
    marginTop:20
  },
  textinbox:{
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'Courier New',
  }
});