import { StyleSheet, Text, View, TextInput,TouchableOpacity, justifyContent, alignItems, Button, Color } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function Infor({navigation, route}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [des, setDes] = useState("");
  useEffect(() => {
    if(route.params?.user){
      setUsername(route.params.user.username);
      setEmail(route.params.user.email);
      setAddress(route.params.user.address);
      setAvatar(route.params.user.avatar);
      setDes(route.params.user.des);
    }
  }, []);

  const handleSave = async () => {

  };

  const handleLogout = async () => {

  };
  return (
    <View style={styles.container}>

      <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center',alignSelf:'center'}}>
        <Text style={[styles.login]}>Who!</Text>
        <View style={[styles.box,{width:100,height:100}]}/>
      </View>

      <Text style={styles.text}>Name</Text>
      <TextInput style={styles.box} value={username} onChangeText={setUsername}></TextInput>

      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.box} value={email} onChangeText={setEmail}></TextInput>

      <Text style={styles.text}>Address</Text>
      <TextInput style={styles.box} value={address} onChangeText={setAddress}></TextInput>

      <Text style={styles.text}>Avatar URL</Text>
      <TextInput style={styles.box} value={avatar} onChangeText={setAvatar}></TextInput>

      <Text style={styles.text}>Description</Text>
      <TextInput style={[styles.box,{height:150}]} value={des} onChangeText={setDes}></TextInput>

      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textinbox}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textinbox}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize:60,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginVertical:50
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:15
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderWidth: 2,
    borderColor: 'black',
    height:40,
    width:105,
    marginTop:20,
    marginHorizontal:20
  },
  textinbox:{
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'Courier New',
  }
});
