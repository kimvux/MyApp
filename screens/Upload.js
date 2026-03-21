import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions, TouchableWithoutFeedback, Keyboard,} from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Upload({navigation,route}){
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");

    const [picture, setPicture] = useState("");
    const [des, setDes] = useState("");
    const [imageHeight, setImageheight] = useState("");

    useFocusEffect(
      React.useCallback(() => {
        const loaduser = async() => {
          if (route.params?.email){
            const usersData = await AsyncStorage.getItem('users');
            const users = JSON.parse(usersData);
            const user = users.find(u => u.email === route.params.email);
            if (user){
              setUsername(user.username);
              setAvatar(user.avatar);
              setImageheight(0);
            }
          }
          else 
            Alert.alert('Error', 'Failed to load data');
        };
      loaduser();
      }, [])
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
          const actualHeight = screenWidth * aspectRatio > 400 ? 400 : screenWidth * aspectRatio;
          setImageheight(actualHeight);
        }
      };

    const post = async() => {
      if (!des && !picture){
        Alert.alert('Hmmm...', 'Anything to say?');
        return;
      }
      try {
        const postsData = await AsyncStorage.getItem('posts');
        const posts = postsData ? JSON.parse(postsData) : [];

        const post = {
          postid:"",
          createdAt: new Date().toISOString(),
          username: username,
          avatar:avatar,
          des: des,
          picture:picture,
          imageHeight:imageHeight,
        };
        posts.push(post);
        await AsyncStorage.setItem('posts', JSON.stringify(posts));
        Alert.alert('Success', 'Posted successful');
        setImageheight(0);
        setDes("");
        setPicture(null);
        navigation.navigate('Home');
      }
      catch (error) {
        Alert.alert('Error', 'Failed to post');
      }
    };

    const cancel = async() => {
      setImageheight(0);
      setDes("");
      setPicture(null);
      navigation.navigate('Home');
    };
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

            <Image source={{uri:picture}} style={{width:'100%', height:imageHeight, resizeMode:'contain'}}/>

            <TextInput style={[styles.box,{height:150,flex:1}]} placeholder="What's on your mind?" value={des} onChangeText={setDes} multiline></TextInput>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',padding:20}}>
              <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={chonanh}>
                <Image source={require("../assets/picture.png")}/>
                <Text style={styles.text}> Add picture</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={post}>
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
    paddingHorizontal:20
  },
  box:{
    width:"100%",
    fontSize:18,
    fontWeight:'bold',
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
