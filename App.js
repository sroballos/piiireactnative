import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeMenu from "./src/screens/HomeMenu";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import Register from "./src/screens/Register";
import { auth } from "./src/firebase/config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logueado: false,
    };
  }

  componentDidMount() {
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ logueado: true });
      } else {
        this.setState({ logueado: false });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.logueado ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeMenu} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
