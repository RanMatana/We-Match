import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  StatusBar,
} from "react-native";
import * as firebase from "firebase";
import Style from "../Style";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import * as Network from "expo-network";
import Internet from "../components/Internet";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
    };
    this.RotateValueHolder = new Animated.Value(0);
  }
  async componentDidMount() {
    this.StartImageRotateFunction();
    let net = await Network.getNetworkStateAsync();
    if (net.isConnected == true) {
      this.setState({ isReady: true }, () => {
        setTimeout(() => {
          firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? "App" : "Auth");
          });
        }, 2000);
      });
    } else this.setState({ isReady: false });
  }
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.StartImageRotateFunction());
    return true;
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    if (this.state.isReady) {
      return (
        <View style={Style.container}>
          <StatusBar hidden />
          <LinearGradient {...linearGradient} />
          <Image
            source={require("../assets/header.png")}
            style={styles.image}
          />
          <Animated.Image
            style={{
              transform: [{ rotate: RotateData }],
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 0,
            }}
            source={require("../assets/Logo.png")}
          />
        </View>
      );
    } else return <Internet />;
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 50,
    margin: 50,
  },
});
