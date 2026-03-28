import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';
import { getDB, createTable } from './database/db';


import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import MainScreen from "./screens/MainScreen";
import Infor from "./screens/Infor";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initDB = async() => {
      try{
        const db = await getDB();
        await createTable(db);
        console.log("Database khởi tạo thành công");
      }
      catch(error){
        console.error("Lỗi khởi tạo database:", error);
      }
    }
    initDB();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Infor" component={Infor}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}