import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getPostsData, getDB } from '../database/db';

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
                        <Text style={{fontFamily:'Courier New', fontSize:12}}>@UID_{UserId} - </Text>
                        <Text style={{fontFamily:'Courier New', fontSize:12}}>{formatTime(CreatedAt)}</Text>
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
    const [db, setDb] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const loadpost = async() => {
                const db = await getDB();
                setDb(db);
                const posts = await getPostsData(db);
                setPostdata(posts);
            };
            loadpost();
        }, [])
    );
    
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.techbook}>fakebook</Text>
                <TouchableOpacity style={{}}>
                    <Image source={require("../assets/search.png")}/>
                </TouchableOpacity>
            </View>
            

            <ScrollView style={{flex:1,width:'100%',backgroundColor:'lightgray'}}>
                {postsData.map((post,index) => (
                    <Post
                    key={index}
                    PostId={post.postid}
                    CreatedAt={post.createdAt}
                    Avatar={{uri:post.avatar}}
                    Username={post.name}
                    UserId={post.userid || "unknown"}
                    Description={post.des}
                    Picture={{uri:post.picture}}
                    ImageHeight={post.imageHeight}
                    />
                ))}            
            </ScrollView>
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
    backgroundColor:'white'
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