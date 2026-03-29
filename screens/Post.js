import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function formatTime(createdAt) {
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

export function CommentView({CreatedAt,Username,Avatar,Comment}){
    return(
        <View>
            <View style={{flexDirection:'row', alignItems:'flex-start', margin:10}}>
                <Image source={Avatar} style={{width: 40, height: 40, borderRadius:90}}/>
                <View style={{flexDirection:'column', marginLeft:10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontFamily:'Courier New', fontSize:18}}>{Username}</Text>
                        <Text style={{fontFamily:'Courier New', fontSize:12}}> - {formatTime(CreatedAt)}</Text>
                    </View>
                    <Text style={{marginBottom:5}}>{Comment}</Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', paddingRight:50}}>
                        <TouchableOpacity>
                            <Text style={{color:'#696969'}}>Reply</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity>
                                <Image style={{width:15,height:15,marginHorizontal:5}} source={require("../assets/like.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={{width:15,height:15,marginHorizontal:5}} source={require("../assets/dislike.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export function Post({PostId,CreatedAt,Username,Avatar,UserId,Description,Picture,ImageHeight,Myid}){
    const navigation = useNavigation();
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

                <TouchableOpacity style={{marginRight:10}} onPress={() => navigation.navigate("Comment",{postid:PostId, userid:Myid})}>
                    <Image source={require("../assets/comment.png")}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{marginRight:10}}>
                    <Image source={require("../assets/share.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
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
});