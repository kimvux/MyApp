import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard,ScrollView, Image, KeyboardAvoidingView, Platform  } from 'react-native';
import { useState, useEffect } from 'react';
import { getDB, getUsersData, getPostsData, getCommentsForPost, insertComment } from '../database/db';
import { Post,CommentView, formatTime } from './Post';


export default function Comment({navigation,route}){
    const [username, setUsername] = useState("");
    const [userid, setId] = useState("");
    const [avatar, setAvatar] = useState("");
    const [picture, setPicture] = useState("");
    const [des, setDes] = useState("");
    const [imageHeight, setImageheight] = useState("");
    const [createdAt,setCreatedat] = useState("");

    const [myname, setMyname] = useState("");
    const [myid, setMyid] = useState("");
    const [myavatar, setMyavatar] = useState("");
    const [comment, setComment] = useState("");

    const [db,setDb] = useState(null);
    const [cmdata,setCmdata] = useState([]);

    const loadcomment = async() => {
        if (db){
            const comments = await getCommentsForPost(db,route.params?.postid);
            setCmdata(comments);
        }
    };

    useEffect(() => {
        const setupdb = async() => {
            const db = await getDB();
            setDb(db);
            console.log("Vào comment");
        }
        setupdb();
    },[])

    useEffect(() => {
        const loaduser = async() => {
            if (db){
                const users = await getUsersData(db); 
                const user = users.find(u => u.id === route.params.userid);
                if (user){
                    setMyname(user.name);
                    setMyavatar(user.avatar);
                    setMyid(user.id);
                }
                const posts = await getPostsData(db);
                const post = posts.find(u => u.postid === route.params.postid);
                if (post){
                    setAvatar(post.avatar);
                    setUsername(post.name);
                    setCreatedat(post.createdAt);
                    setId(post.userid);
                    setPicture(post.picture);
                    setDes(post.des);
                    setImageheight(post.imageHeight);
                }
            }
        };
        loaduser();
        loadcomment();
    }, [db])

    const postcomment = async() => {
        try{
            await insertComment(db,route.params.postid,myid,comment,new Date().toISOString());
            setComment("");
            await loadcomment();
            Keyboard.dismiss();
        }
        catch(error){
            console.error("Lỗi comment: ",error);
        }
    }
    
    return (
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={-30}>
            <View style={style.container}>
                <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
                    <TouchableOpacity style={{width:30, height:30, alignItems:'center', justifyContent:'center', marginRight:5}} onPress={() => navigation.goBack()}>
                        <Image style={{width:15, height:15}} source={require("../assets/cross.png")}/>
                    </TouchableOpacity> 
                    <Image source={{uri:avatar}} style={{width: 40, height: 40, borderRadius:90}}/>
                    <View style={{flexDirection:'column', marginLeft:10}}>
                        <Text style={{fontFamily:'Courier New', fontSize:25}}>{username}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontFamily:'Courier New', fontSize:12}}>@UID_{userid} - </Text>
                            <Text style={{fontFamily:'Courier New', fontSize:12}}>{formatTime(createdAt)}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex:1,width:'100%'}} keyboardShouldPersistTaps="handled" onScrollBeginDrag={Keyboard.dismiss}>
                    <Text style={{marginHorizontal:10, marginBottom:10}}>{des}</Text>
            
                    <Image source={{uri:picture}} style={{width:'100%', height: imageHeight, resizeMode:'contain'}}/>

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
                    {cmdata.map((c,index) => (
                        <CommentView key={index} CreatedAt={c.createdAt} Username={c.name} Avatar={{uri:c.avatar}} Comment={c.comment}/>
                    ))}
                </ScrollView>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', paddingHorizontal:10}}>
                    <Image source={{uri:myavatar}} style={{width: 50, height: 50, borderRadius:90}}/>
                    <TextInput style={style.box} value={comment} onChangeText={setComment} placeholder="Write a comment..."/>
                    <TouchableOpacity style={{justifyContent:'center'}} onPress={postcomment}>
                        <Image source={require("../assets/post.png")}/>
                    </TouchableOpacity>
                </View>                
            </View>
        </KeyboardAvoidingView>
    )
}
const style = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    paddingVertical:30
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    borderRadius:45,
    height:50,
    flex:1,
    paddingHorizontal:20,
    marginHorizontal:10,
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
});