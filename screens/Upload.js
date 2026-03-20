import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Upload({route}){
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [des, setDes] = useState("");
    const [picture, setPicture] = useState("");

    useEffect(() => {
    const loaduser = async() => {
      if (route.params?.email){
        const usersData = await AsyncStorage.getItem('users');
        const users = JSON.parse(usersData);
        const user = users.find(u => u.email === route.params.email);
        if (user){
          setUsername(user.username);
          setAvatar(user.avatar);
          setDes(user.des);
        }
      }
      else 
        Alert.alert('Error', 'Failed to load data');
    };
    loaduser();
    }, []);

    const chonanh = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          setPicture(result.assets[0].uri);
        }
      };

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={{uri:avatar}} style={{width: 70, height: 70, borderRadius:90}}/>
                <Text style={{fontFamily:'Courier New', fontSize:25, marginLeft:10}}>{username}</Text>
            </View>
            <TouchableOpacity style={[{width:100,height:100,borderWidth: 2,alignItems:'center',justifyContent:'center',}]} onPress={chonanh}>
                <Image source={{uri:picture}} style={{width:'100%', resizeMode:'contain'}}/>
            </TouchableOpacity>
            <TextInput style={[styles.box,{height:150,flex:1}]} placeholder="What's on your mind?" value={des} onChangeText={setDes} multiline></TextInput>
            
            <TouchableOpacity>
                <Image source={require("../assets/post.png")}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:"90%",
    width:"auto",
    minWidth:300,
    padding:40,
  },
  box:{
    height:35,
    width:"100%",
    fontSize:18,
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
