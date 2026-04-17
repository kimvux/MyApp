import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useState, useEffect } from 'react';
import { getDB,clearAllData } from '../database/db';

export default function Login({ navigation,route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState(null);

  const handleClear = async () => {
    await clearAllData(db);
    console.log("Đã xóa hết data");
  };

  useEffect(() => {
    const setupdb = async() => {
      const database = await getDB();
      setDb(database);
      console.log("Login sẵn sàng");
    }
    setupdb();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    if (!db){
      console.error("DB đâu?");
      return;
    }
    try {
      {/**
        const result = await db.getFirstAsync(
        `select id from Users where email = ? and password = ?;`,
        [email,password]
      );
      if (result !== null){
        navigation.replace('MainScreen',{id:result.id});
      }
      else {
        Alert.alert('Error', 'Invalid email or password');
      }
         */}
      const res = await fetch(`http://blackntt.net:4321/login?email=${email}&password=${password}`,{
        method:'POST',
      });
      
      if(res.ok){
        const data = await res.json();
        navigation.replace('MainScreen',{id:email,name:data.name});
      }
    } 
    catch (error) {
      Alert.alert('Error', 'Failed to load data');
      console.error("lỗi:",error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        {/**
         * <TouchableOpacity style={style.button} onPress={handleClear}>
              <Text style={style.textinbox}>clear</Text>
            </TouchableOpacity>
         */}
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:"100%",
    width:"100%",
    padding:80,
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    height:50,
    width:'100%',
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