import { StyleSheet, Text, View, TextInput,TouchableOpacity, TouchableWithoutFeedback, Keyboard, justifyContent, alignItems, Button, Color, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { getUsersData, getDB, updateUser,createTable } from '../database/db';

export default function Infor({navigation, route}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [des, setDes] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    const setupdb = async() => {
      const db = await getDB();
      setDb(db);
    }
    setupdb();
  }, []);

  useEffect(() => {
    const loaduser = async() => {
      if (route.params?.id && db){
        const users = await getUsersData(db); 
        const user = users.find(u => u.id === route.params.id);
        if (user){
          setUsername(user.name);
          setEmail(user.email);
          setAddress(user.address);
          setAvatar(user.avatar);
          setDes(user.description);
        }
      }
    };
    loaduser();
  },[db, route.params?.id])

  const chonanh = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      await updateUser(db,route.params?.id,username,email,address,avatar,des);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
    } 
    catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  const handleLogout = async () => {
    navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center',alignSelf:'center'}}>
          <Text style={[styles.login]}>Who!</Text>
          <TouchableOpacity style={[{width:100,height:100,borderWidth: 2,alignItems:'center',justifyContent:'center',}]} onPress={chonanh}>
            <Image source={{uri:avatar}} style={{width:100,height:100}}/>
          </TouchableOpacity>
            
          
        </View>

        <Text style={styles.text}>Name</Text>
        <TextInput style={styles.box} value={username} onChangeText={setUsername}></TextInput>

        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.box} value={email} onChangeText={setEmail}></TextInput>

        <Text style={styles.text}>Address</Text>
        <TextInput style={styles.box} value={address} onChangeText={setAddress}></TextInput>

        <Text style={styles.text}>Avatar URL</Text>
        <TextInput style={styles.box} value={avatar} onChangeText={setAvatar} onPress={chonanh} readOnly></TextInput>

        <Text style={styles.text}>Description</Text>
        <TextInput style={[styles.box,{height:150,textAlignVertical:'top'}]} value={des} onChangeText={setDes} multiline></TextInput>

        <View style={{flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.textinbox}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.textinbox}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:"100%",
    width:"100%",
    minWidth:300,
    padding:60,
    backgroundColor:'white'
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    height:50,
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
