import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from "firebase";
import CoverNavigate from "./components/CoverNavigate";
import LoginScreen from "./screens/Login";
import LoadingScreen from "./screens/Loading";
import Authentication from "./screens/Authentication";
import FullScreenImage from "./screens/FullScreenImage";
import Terms from "./screens/Terms";

var firebaseConfig = {
  apiKey: "AIzaSyBUvfrx98kO2UxoxAWKntWHAurZ1pVpqD4",
  authDomain: "wematch-e2e4e.firebaseapp.com",
  databaseURL: "https://wematch-e2e4e.firebaseio.com",
  projectId: "wematch-e2e4e",
  storageBucket: "wematch-e2e4e.appspot.com",
  messagingSenderId: "722131163432",
  appId: "1:722131163432:web:7f0e9f5848d5a49474181d",
  measurementId: "G-91FHPWFG4J",
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  CoverNavigate: {
    screen: CoverNavigate,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Authentication: {
    screen: Authentication,
    navigationOptions: {
      headerShown: false,
    },
  },
  FullScreen: {
    screen: FullScreenImage,
    navigationOptions: {
      headerTitle: "",
      headerStyle: { backgroundColor: "#e58963" },
    },
  },
  Terms: {
    screen: Terms,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
