import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation,route}){
    const [crstate,setcrstate] = useState(0);
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.techbook}>Techbook</Text>
            </View>

            <View style={{flex:1,width:'100%'}}>

            </View>

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

                <TouchableOpacity onPress={() => {setcrstate(4); navigation.navigate("Infor",{user:route.params?.user})}}>
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
    marginHorizontal:30
  },
  header:{
    flexDirection:'row',
    width:'100%',
    borderBottomWidth:1,
    paddingBottom:10
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