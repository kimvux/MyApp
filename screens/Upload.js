import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions, TouchableWithoutFeedback, Keyboard,} from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getDB, getUsersData, insertPost } from '../database/db';

export default function Upload({navigation,route}){
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [picture, setPicture] = useState("");
    const [title,setTitle] = useState("");
    const [des, setDes] = useState("");
    const [imageHeight, setImageheight] = useState("");
    const [email,setEmail] = useState("");
    
    const [db, setDb] = useState(null);

    useEffect(() => {
      /*
      const setupdb = async() => {
        const db = await getDB();
        setDb(db);
      }
      setupdb();
      */
      const loaduser = async() => {
        if (route.params?.id){
          setEmail(route.params.id);
          setUsername(route.params.name);
        }
      }
      loaduser();
    }, []);
    /*
    useFocusEffect(
      React.useCallback(() => {
        const loaduser = async() => {
          if (route.params?.id && db){
            try{
              const usersData = await getUsersData(db);
              const user = usersData.find(u => u.id === route.params.id);
              if (user){
                setUsername(user.name);
                setAvatar(user.avatar);
                setEmail(user.email);
                setImageheight(0);
              }
            }
            catch(error){
              console.error("Lỗi post bài: ",error);
            }
          }
        }
      loaduser();
      }, [db, route.params.id])
    );
    

    const chonanh = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1,
        });
        if (!result.canceled) {
          setPicture(result.assets[0].uri);
          const screenWidth = Dimensions.get('window').width;
          const asset = Image.resolveAssetSource(result.assets[0]);
          const aspectRatio = asset.height / asset.width;
          setImageheight(screenWidth * aspectRatio);
        }
      };
    */

    const post = async() => {
      if (!des && !title){
        Alert.alert('Hmmm...', 'Anything to say?');
        return;
      }
      try {
        /*
        await insertPost(db,route.params.id,des,picture,imageHeight,new Date().toISOString());
        Alert.alert('Success', 'Posted successful');
        setImageheight(0);
        setDes("");
        setPicture("");
        navigation.navigate('Home');
        */
        const res = await fetch(`http://blackntt.net:4321/posts`,{
          method:'POST',
          headers:{ 'Content-Type': 'application/json' },
          body:JSON.stringify({title:title,description:des,creator_email:email})
        })
        if(res.ok){
          Alert.alert('Success', 'Posted successful');
          setImageheight(0);
          setDes("");
          setPicture("");
          navigation.navigate('Home');
        }
      }
      catch (error) {
        Alert.alert('Error', 'Failed to post');
      }
    };

    const cancel = async() => {
      setImageheight(0);
      setDes("");
      setPicture("");
      navigation.navigate('Home');
    };

    const xoaanh = async() => {
      setPicture("");
      setImageheight(0);
    }
    
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:'100%'}}>
              <TouchableOpacity style={{width:40, height:40, alignItems:'center', justifyContent:'center'}} onPress={cancel}>
                <Image style={{width:20, height:20}} source={require("../assets/cross.png")}/>
              </TouchableOpacity> 
              <Text style={styles.header}>New post</Text>
              <View style={{width:40, height:40}}/>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>
                <Image source={{uri:avatar}} style={{width: 70, height: 70, borderRadius:90}}/>
                <Text style={{fontFamily:'Courier New', fontSize:25, marginLeft:10}}>{username}</Text>
            </View>

            {picture !== "" && (
              <TouchableOpacity style={{flexDirection:'row', alignItems:'center',marginBottom:10}} onPress={xoaanh}>
                <Image style={{width:6, height:6}} source={require("../assets/cross.png")}/>
                <Text style={[styles.text,{fontSize:15,color:'gray'}]}> Remove picture</Text>
              </TouchableOpacity>
            )}

            <Image source={{uri:picture}} style={{width:'100%', height:imageHeight > 400 ? 400 : imageHeight, resizeMode:'contain'}}/>

            <TextInput style={styles.box} placeholder="Title" value={title} onChangeText={setTitle} multiline></TextInput>
            <TextInput style={styles.box} placeholder="What's on your mind?" value={des} onChangeText={setDes} multiline></TextInput>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:20, justifyContent:'space-between', width:'100%'}}>
            
              {/*<TouchableOpacity style={{flexDirection:'row', alignItems:'center',marginVertical:10}} onPress={chonanh}>
                <Image source={require("../assets/picture.png")}/>
                <Text style={styles.text}> Add picture</Text>
              </TouchableOpacity> */}

              <TouchableOpacity style={{flexDirection:'row', alignItems:'center',alignSelf:'flex-end', padding:10, backgroundColor:'#EDEDED', borderRadius:20}} onPress={post}>
                <Image source={require("../assets/post.png")}/>
                <Text style={styles.text}> Post</Text>
            </TouchableOpacity>
            </View>
            
        </View>
      </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:"100%",
    width:"100%",
    paddingTop:70,
    paddingHorizontal:20,
    backgroundColor:'white'
  },
  box:{
    textAlignVertical:'top',
    width:"100%",
    fontSize:18,
    fontWeight:'bold',
    height:150,
    flex:1,
    marginTop:10
  },
  header:{
    alignSelf:'center',
    fontWeight:'bold',
    fontFamily:'Courier New',
    fontSize:30,
  },
  text:{
    fontSize:22,
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
