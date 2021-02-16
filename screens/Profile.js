import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Vibration,
} from "react-native";
import * as firebase from "firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfileItem from "../components/ProfileItem";
import styles from "../Style";
import Loading from "../components/Loading";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fix_user } from "../user";
import { NavigateReactContext } from "../components/NavigateContext";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default class Profile extends Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    const currentUser = this.context.state.user;
    const Place = this.context.state.currentPlace;
    let user = fix_user(currentUser);
    this.setState(
      {
        Username: user.Username,
        Gender: user.Gender,
        Interested: user.Interested,
        Photo: user.Photo,
        About: user.About,
        Range: user.Range,
        Place: Place?.title,
        user,
      },
      () => {
        let age =
          new Date().getFullYear() - parseInt(this.state.user.Birth.split("-"));
        this.setState({ isReady: true, age });
      }
    );
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route.params != undefined) {
      let user = fix_user(nextProps.route.params.user);
      return {
        Username: user.Username,
        Gender: user.Gender,
        Interested: user.Interested,
        Photo: user.Photo,
        About: user.About,
        Range: user.Range,
        user,
      };
    }
    return null;
  }
  render() {
    if (this.state.isReady) {
      return (
        <ImageBackground source={require("../assets/bg.png")} style={styles.bg}>
          <ScrollView style={styles.containerProfile}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FullScreen", {
                  image: this.state.Photo,
                })
              }
            >
              <ImageBackground
                source={{ uri: this.state.Photo }}
                style={styles.photo}
              />
            </TouchableOpacity>
            <ProfileItem
              name={this.state.Username}
              age={this.state.age - 1}
              gender={this.state.Gender}
              interested={this.state.Interested}
              about={this.state.About}
              range={this.state.Range}
            />
            <View style={styles.actionsProfile}>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() => {
                  Vibration.vibrate(100);
                  firebase.auth().signOut();
                }}
              >
                <FontAwesome name="sign-out" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() =>
                  this.props.navigation.navigate("EditProfile", {
                    user: this.state.user,
                  })
                }
              >
                <AntDesign name="edit" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() =>
                  this.state.Place
                    ? this.props.navigation.navigate("CurrentPlace", {
                        user: this.state.user,
                      })
                    : alert("You need to enter place!")
                }
              >
                <Text style={styles.textButton}>Where am I?</Text>
                <EvilIcons name="location" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      );
    } else {
      return <Loading />;
    }
  }
}
