import { StyleSheet, Text, View, TextInput,TouchableOpacity, justifyContent, alignItems, Button, Color } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
        <Text style={[styles.login,{marginTop:40}]}>Who!</Text>
        <View style={[styles.box,{width:100,height:100}]}/>
      </View>

      <Text style={styles.text}>Name</Text>
      <TextInput style={styles.box}></TextInput>

      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.box}></TextInput>

      <Text style={styles.text}>Address</Text>
      <TextInput style={styles.box}></TextInput>

      <Text style={styles.text}>Avatar URL</Text>
      <TextInput style={styles.box}></TextInput>

      <Text style={styles.text}>Description</Text>
      <TextInput style={[styles.box,{height:150}]}></TextInput>

      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textinbox}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textinbox}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical:5,
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'Courier New',
  },
  login:{
    fontSize:60,
    fontWeight:'bold',
    fontFamily:'Courier New',
    marginBottom:50
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
    width:90,
    marginTop:20,
    marginHorizontal:10
  },
  textinbox:{
    fontSize:25,
    fontWeight:'bold',
    fontFamily:'Courier New',
  }
});
