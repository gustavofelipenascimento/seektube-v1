import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    ThemeDark,
    ThemeLight,
    ThemeDarkNavigation,
    ThemeLightNavigation,
  } from "../config/theme";
  import { useTheme } from "../contexts/ThemeContexts";
import { Provider } from "react-native-paper";
import HomeScreen from '../screens/HomeScreen';
import SkNewsScreen from '../screens/SkNewsScreen';
import SobreScreen from '../screens/SobreScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SkStudyScreen from '../screens/SkStudyScreen';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Provider theme={theme}>
        <NavigationContainer theme={themeNavigation}>
            <Stack.Navigator>
                <Stack.Screen
                    name="TabNavigator"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen} 
                options={{
                    title: 'home',
                    tabBarIcon: 'home',
                }}
                />
                <Tab.Screen
                name="News"
                component={SkNewsScreen}
                options={{
                    title: 'news',
                    tabBarIcon: 'newspaper',
                }} /> 
                <Tab.Screen 
                name="Sobre"
                component={SobreScreen}
                options={{
                    title: 'sobre',
                    tabBarIcon: 'information',
                }}/>
                <Tab.Screen
                name=""
                component={SignInScreen}
                options={{
                    title: 'contato',
                    tabBarIcon: 'mail',
                }} />
                <Tab.Screen
                name=""
                component={SignUpScreen} 
                options={{
                 title: 'study',
                 tabBarIcon: 'book',   
                }} />
                <Tab.Screen
                name="Perfil"
                component={SkStudyScreen}
                options={{
                    title: 'perfil',
                    tabBarIcon: 'account',
                }} />
        </Tab.Navigator>
    );
}