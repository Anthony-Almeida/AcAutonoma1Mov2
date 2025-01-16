import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen"
import RegisterScreen from "../Screens/RegisterScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GaleriaScreen from "../Screens/GaleriaScreen";
import CamaraScreen from "../Screens/CamaraScreen";

const Stack = createStackNavigator()
const Tap = createBottomTabNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Registro" component={RegisterScreen}/>
      <Stack.Screen name="Welcome" component={MyTaps}/>
    </Stack.Navigator>
  )
}

function MyTaps(){
  return(
    <Tap.Navigator>
      <Tap.Screen name="Welcome" component={WelcomeScreen}/>
      <Tap.Screen name="Galeria" component={GaleriaScreen}/>
      <Tap.Screen name="Camara" component={CamaraScreen}/>
    </Tap.Navigator>
  )
}

export default function Navegador(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}