import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation,route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      if(route.params?.user){
        setEmail(route.params.user.email);
        setPassword(route.params.user.password);
      }
    }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          Alert.alert('Success', 'Login successful');
          navigation.replace('MainScreen', { email : user.email });
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No users found. Please register first.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.login}>Login</Text>

      <Text style={style.text}>Email</Text>
      <TextInput
        style={style.box}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <View style={{ height: 20 }} />

      <Text style={style.text}>Password</Text>
      <TextInput
        style={style.box}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={[style.forget, { flex: 2 }]}>Forget password?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[style.forget, { color: 'blue', flex: 1 }]}>Register?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={style.textinbox}>Sign in</Text>
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
    marginVertical:5,
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
  login:{
    alignSelf:'center',
    fontSize:80,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:70,
    marginBottom:45
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