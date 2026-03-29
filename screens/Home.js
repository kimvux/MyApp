import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getPostsData, getDB } from '../database/db';
import {Post} from './Post';

const Tab = createBottomTabNavigator();

export default function Home({navigation,route}){
    const [postsData, setPostdata] = useState([]);
    const [db, setDb] = useState(null);
    const [myid,setMyid] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            const loadpost = async() => {
                const db = await getDB();
                setDb(db);
                const posts = await getPostsData(db);
                setPostdata(posts);
                setMyid(route.params?.id);
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
                    Myid={myid}
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