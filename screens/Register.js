import { StyleSheet, Text, View, TextInput,TouchableOpacity, justifyContent, alignItems, Button } from 'react-native';

export default function Register({navigation}) {
  return (
    <View style={style.container}>
      <Text style={style.login}>Register</Text>

      <Text style={style.text}>Name</Text>
      <TextInput value='test' style={style.box}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Email</Text>
      <TextInput value='lmao@gmail.com' style={style.box}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Password</Text>
      <TextInput value='....' style={style.box}></TextInput>
      <View style={{height:20}}></View>

      <Text style={style.text}>Confirm Password</Text>
      <TextInput value='....' style={style.box}></TextInput>
      <View style={{height:30}}></View>

      <TouchableOpacity style={style.button}>
        <Text style={style.textinbox}>Create</Text> 
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    borderWidth: 3,
    borderColor: 'black',
    height:"90%",
    width:"auto",
    padding:40,
    margin:50,
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    height:35,
    width:"100%",
    padding:10,
    marginVertical:3,
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
  login:{
    alignSelf:'center',
    fontSize:50,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:70,
    marginBottom:40
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginTop:15
  },
  forget:{
    fontSize:15,
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
    width:120,
    marginTop:20
  },
  textinbox:{
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'Courier New',
  }
});