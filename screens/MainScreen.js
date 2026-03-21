import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import Infor from './Infor';
import Upload from './Upload';

const Tab = createBottomTabNavigator();

export default function MainScreen ({route}){
    return(
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown:false,
            tabBarIcon: ({ focused }) => {
                if (route.name === "Home") {
                    return (
                    <Image
                        source={
                        focused
                            ? require("../assets/home_solid.png")
                            : require("../assets/home.png")
                        }
                        style={{ width: 24, height: 24 }}
                    />
                    );
                }
                else if (route.name === "Infor") {
                    return (
                    <Image
                        source={
                        focused
                            ? require("../assets/user_solid.png")
                            : require("../assets/user.png")
                        }
                        style={{ width: 24, height: 24 }}
                    />
                    );
                }
                else if (route.name === "Upload") {
                    return (
                    <Image
                        source={
                        focused
                            ? require("../assets/add_solid.png")
                            : require("../assets/add.png")
                        }
                        style={{ width: 24, height: 24 }}
                    />
                    );
                }
            },
        })}>
            <Tab.Screen name='Home' component={Home} initialParams={{ email: route.params.email }}/>
            <Tab.Screen name='Upload' component={Upload} initialParams={{ email: route.params.email }}/>
            <Tab.Screen name='Infor' component={Infor} initialParams={{ email: route.params.email }}/>
        </Tab.Navigator>
    )
};