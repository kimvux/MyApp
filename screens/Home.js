import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { useState } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function formatTime(createdAt) {
  if (!createdAt) return '';
  
  const now = new Date();
  const postTime = new Date(createdAt);
  const diff = now - postTime;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function Post({PostId,CreatedAt,Username,Avatar,UserId,Description,Picture,ImageHeight}){
    return(
        <View style={{backgroundColor:'white', marginVertical:1, width:'100%'}}>
            <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
                <Image source={Avatar} style={{width: 40, height: 40, borderRadius:90}}/>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontFamily:'Courier New', fontSize:25}}>{Username}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontFamily:'Courier New', fontSize:12}}>@UID_{UserId}</Text>
                        <Text> - {formatTime(CreatedAt)}</Text>
                    </View>
                </View>
                
            </View>
            
            <Text style={{marginHorizontal:10, marginBottom:10}}>{Description}</Text>
            
            <Image source={Picture} style={{width:'100%', height: ImageHeight, resizeMode:'contain'}}/>

            <View style={{flexDirection:'row', justifyContent:'flex-start', margin:10}}>
                <TouchableOpacity style={{marginRight:10}}>
                    <Image source={require("../assets/like.png")}/>
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight:10}}>
                    <Image source={require("../assets/comment.png")}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{marginRight:10}}>
                    <Image source={require("../assets/share.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function Home({navigation,route}){
    const [postsData, setPostdata] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadpost = async() => {
                const posts = await AsyncStorage.getItem('posts');
                setPostdata(posts ? JSON.parse(posts) : []);
            };
            loadpost();
        }, [])
    );
    
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.techbook}>Techbook</Text>
                <TouchableOpacity style={{}}>
                    <Image source={require("../assets/settings.png")}/>
                </TouchableOpacity>
            </View>
            

            <ScrollView style={{flex:1,width:'100%',backgroundColor:'lightgray'}}>
                {postsData.map((post,index) => (
                    <Post
                    key={index}
                    PostId={post.postid}
                    CreatedAt={post.createdAt}
                    Avatar={{uri:post.avatar}}
                    Username={post.username}
                    UserId={post.userid || "unknown"}
                    Description={post.des}
                    Picture={{uri:post.picture}}
                    ImageHeight={post.imageHeight}
                    />
                ))}            
            </ScrollView>
            {/**
             * <View style={style.footer}>
                <TouchableOpacity onPress={() => setcrstate(0)}>
                    <Image source={crstate === 0 ? require("../assets/home_solid.png") : require("../assets/home.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setcrstate(1)}>
                    <Image source={crstate === 1 ? require("../assets/search_solid.png") : require("../assets/search.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setcrstate(2)}>
                    <Image source={crstate === 2 ? require("../assets/add_solid.png") : require("../assets/add.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setcrstate(3)}>
                    <Image source={crstate === 3 ? require("../assets/bell_solid.png") : require("../assets/bell.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setcrstate(4); navigation.navigate("Infor",{email:route.params?.email})}}>
                    <Image source={crstate === 4 ? require("../assets/user_solid.png") : require("../assets/user.png")}/>
                </TouchableOpacity>
            </View>
             */}
            
            
        </View>
    )
}
const style = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:'100%',
    minWidth:300,
  },
  techbook:{
    fontFamily:'Courier New',
    fontWeight:'bold',
    fontSize:45,
    color:'black',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    borderBottomWidth:1,
    paddingTop:60,
    paddingBottom:10,
    paddingHorizontal:20
  },    
  footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    width:'100%',
    paddingVertical:25,
    paddingHorizontal:45,
    borderTopWidth:1,
  },
});