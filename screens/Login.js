import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Vibration,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import Style from "../Style";
import IconE from "react-native-vector-icons/Entypo";
import IconA from "react-native-vector-icons/AntDesign";
import { authentication } from "../api";
import * as firebase from "firebase";
import * as Crypto from "expo-crypto";
import { Spinner } from "native-base";

var AppID = "328336775282398";
const IconFacebook = <IconE name="facebook" size={30} color="#900" />;
const IconGoogle = <IconA name="google" size={30} color="#900" />;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isConnect: false };
  }
  // Button For Authentication Google
  btnGoogle = async () => {
    this.setState({ isConnect: true });
    Vibration.vibrate(100);
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `153830720205-a724oa6uu483oeue871ltma50o99eni1.apps.googleusercontent.com`,
      androidClientId: `153830720205-nm5sfp50q9kegvk17b2bib3u1h93vs7r.apps.googleusercontent.com`,
    });
    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      const check = await authentication(user.email);
      if (check) {
        this.connectUser(user.email);
      } else {
        let temp = {
          Username: user.name,
          Email: user.email,
          Photo: user.photoUrl,
        };

        this.props.navigation.navigate("Authentication", { res: temp });
      }
    } else {
      this.setState({ isConnect: false });
      // type === 'cancel'
    }
  };
  // Button For Authentication Facebook
  btnFacebook = async () => {
    this.setState({ isConnect: true });
    Vibration.vibrate(100);
    try {
      await Facebook.initializeAsync(AppID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`
        );
        let res = await response.json();
        const check = await authentication(res.email);
        if (check) {
          this.connectUser(res.email);
        } else {
          let temp = {
            Username: res.name,
            Email: res.email,
            Photo: res.picture.data.url,
          };
          this.props.navigation.navigate("Authentication", { res: temp });
        }
      } else {
        this.setState({ isConnect: false });
        // type === 'cancel'
      }
    } catch ({ message }) {
      this.setState({ isConnect: false });
      alert(`Facebook Login Error: ${message}`);
    }
  };
  connectUser = async (email) => {
    const pass = await this.encryption(email);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  encryption = async (pass) => {
    const temp = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD5,
      pass
    );
    return temp;
  };
  terms = () => {
    this.props.navigation.navigate("Terms");
  };
  render() {
    return (
      <View style={Style.container}>
        <StatusBar hidden />
        <LinearGradient {...linearGradient} />
        <Image source={require("../assets/header.png")} style={Style.header} />
        <TouchableOpacity
          style={[Style.btnOpacity, { margin: 10, backgroundColor: "white" }]}
          onPress={this.btnFacebook}
        >
          <Text style={[Style.textLogin, { color: "#dc6997" }]}>
            Continue with Facebook
          </Text>
          {IconFacebook}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Style.btnOpacity,
            {
              margin: 10,
              backgroundColor: "#dc6997",
              borderColor: "white",
              borderWidth: 2,
            },
          ]}
          onPress={this.btnGoogle}
        >
          <Text style={[Style.textLogin, { color: "white" }]}>
            Continue with Google{" "}
          </Text>
          {IconGoogle}
        </TouchableOpacity>
        <View style={{ margin: 20 }}>
          <Text style={{ color: "white" }}>
            When you try connect. you agree to
          </Text>
          <TouchableOpacity onPress={this.terms}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          {this.state.isConnect ? <Spinner color="red" /> : null}
        </View>
      </View>
    );
  }
}
