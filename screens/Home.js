import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Post({ID,Username,UserId,Description,Source}){
    const screenWidth = Dimensions.get('window').width;
    const asset = Image.resolveAssetSource(Source);
    const aspectRatio = asset.height / asset.width;
    const imageHeight = screenWidth * aspectRatio;

    return(
        <View style={{backgroundColor:'white', marginVertical:1, width:'100%'}}>
            <View style={{flexDirection:'row',  marginLeft:10}}>
                <Text>{ID}</Text>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <Text style={{fontFamily:'Courier New'}}>{Username}</Text>
                    <Text>{UserId}</Text>
                </View>
                
            </View>
            
            <Text style={{marginLeft:10}}>{Description}</Text>
            
            <Image source={Source} style={{width:'100%', height: imageHeight, resizeMode:'contain'}}/>

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
    const [crstate,setcrstate] = useState(0);

    const posts = [
        {
            id: 3,
            username: "kim",
            userid: "12039",
            description: "Hello world",
            source: require("../assets/PostImages/zhao.png")
        },
        {
            id: 1,
            username: "kim",
            userid: "12039",
            description: "Hello world",
            source: require("../assets/PostImages/orp.png")
        },
        {
            id: 2,
            username: "kim",
            userid: "12039",
            description: "Hello world",
            source: require("../assets/PostImages/belle.png")
        },
    ];

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.techbook}>Techbook</Text>
                <TouchableOpacity style={{}}>
                    <Image source={require("../assets/settings.png")}/>
                </TouchableOpacity>
            </View>

            <ScrollView style={{flex:1,width:'100%',backgroundColor:'lightgray'}}>
                {posts.map(post => (
                    <Post
                    key={post.id}
                    ID={post.id}
                    Username={post.username}
                    UserId={post.userid}
                    Description={post.description}
                    Source={post.source}
                    />
                ))}
            </ScrollView>

            <View style={style.footer}>
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
    paddingTop:45
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
    width:'100%',
    borderBottomWidth:1,
    paddingVertical:10,
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