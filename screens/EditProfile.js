import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import Style from "../Style";
import AntDesign from "react-native-vector-icons/AntDesign";
import Slider from "@react-native-community/slider";
import { imageUpload, putUser } from "../api";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import CheckBox from "@react-native-community/checkbox";
import { NavigateReactContext } from "../components/NavigateContext";

export default class EditProfile extends Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      about: "",
      range: 0,
      image: "http",
      interestedMan: null,
      interestedFemale: null,
    };
  }
  componentDidMount() {
    //console.log(this.props.route.params.user);
    this.getPermissionAsync();
    this.setState({ image: this.props.route.params.user.Photo });
    this.props.route.params.user.Interested == "Woman"
      ? this.setState({ interestedFemale: true })
      : this.setState({ interestedMan: true });
    this.props.route.params.user.Gender == "Man"
      ? this.setState({ gender: true })
      : this.setState({ gender: false });
  }
  changeAbout = (text) => {
    if (this.state.about.split(" ").length - 1 < 30) {
      text.split(" ").length / 4 == 0 ? (text += "\n") : "";
      this.setState({ about: text });
    }
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri }, () => console.log(result));
      }
    } catch (E) {
      console.log(E);
    }
  };

  checkDetailes = async () => {
    if (this.state.username == "") {
      this.setState({ username: this.props.route.params.user.Username });
    }
    if (this.state.image != this.props.route.params.user.Photo) {
      let url = await imageUpload(
        this.state.image,
        this.props.route.params.user.Username
      );
      this.setState({ image: url });
    }
    if (this.state.about == "") {
      this.setState({ about: this.props.route.params.user.About });
    }
    if (this.state.range == 0) {
      this.setState({ range: this.props.route.params.user.Range });
    }
    this.state.interestedMan
      ? this.setState({ interested: true })
      : this.setState({ interested: false });
  };
  checkSave = () => {
    Alert.alert(
      "Change details",
      "Are you sure you want to change the details?",
      [
        {
          text: "No",
          onPress: () => console.log("Nothing"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.changeDetails() },
      ],
      { cancelable: false }
    );
  };
  changeDetails = async () => {
    await this.checkDetailes();
    let d = new Date(this.props.route.params.user.Birth);
    let user = {
      User_ID: this.props.route.params.user.User_ID,
      Username: this.state.username,
      Email: this.props.route.params.user.Email,
      Gender: this.state.gender,
      Interested: this.state.interested,
      Photo: this.state.image,
      Latitude: this.props.route.params.user.Latitude,
      Longitude: this.props.route.params.user.Longitude,
      Token: this.props.route.params.user.Token,
      Range: this.state.range,
      About: this.state.about,
      BirthdayString: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
    };
    let u = await putUser(user);
    if (u != null) {
      setTimeout(() => {
        this.context.actions.update();
      }, 5000);
    }
    this.props.navigation.navigate("Profile", { user });
  };

  save = () => {
    Vibration.vibrate(100);
    this.checkSave();
  };
  setSelectionInterested = () => {
    this.state.interestedMan
      ? this.setState({ interestedMan: false, interestedFemale: true })
      : this.setState({ interestedMan: true, interestedFemale: false });
  };
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FullScreen", {
                image: this.state.image,
              })
            }
          >
            <ImageBackground
              style={Style.profileImage}
              source={{ uri: this.state.image }}
            >
              <AntDesign
                onPress={() => this.props.navigation.navigate("Profile")}
                style={{ position: "absolute", top: 0, margin: 15 }}
                name="arrowright"
                color="white"
                size={40}
              />
              <AntDesign
                onPress={this._pickImage}
                style={{ position: "absolute", bottom: 0, margin: 15 }}
                name="pluscircleo"
                color="white"
                size={40}
              />
            </ImageBackground>
          </TouchableOpacity>
          <View style={[Style.containerProfileItem, { marginTop: 35 }]}>
            <View style={[Style.info, { marginTop: 20 }]}>
              <Text style={Style.iconProfile}>
                <AntDesign name="user" size={16} />
              </Text>
              <TextInput
                placeholder={this.props.route.params.user.Username}
                placeholderTextColor="white"
                style={Style.input}
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
              />
            </View>
            <View style={Style.info}>
              <View
                style={[
                  Style.ViewOfInput,
                  { flexDirection: "column", marginTop: 20, marginRight: -20 },
                ]}
              >
                <Text style={{ marginRight: 50 }}>
                  What is your Interested ?
                </Text>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "row-reverse" }}>
                    <CheckBox
                      value={this.state.interestedMan}
                      onChange={() => this.setSelectionInterested()}
                    />
                    <Text style={{ margin: 5 }}>Male</Text>
                  </View>
                  <View style={{ flexDirection: "row-reverse" }}>
                    <CheckBox
                      value={this.state.interestedFemale}
                      onChange={() => this.setSelectionInterested()}
                    />
                    <Text style={{ margin: 5 }}>Female</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ textAlign: "center", margin: 5 }}>
              {this.state.about.split(" ").length - 1}/30
            </Text>
            <View style={Style.info}>
              <Text style={Style.iconProfile}>
                <AntDesign name="profile" size={16} />
              </Text>
              <TextInput
                style={[Style.input, { height: 150, textAlignVertical: "top" }]}
                placeholderTextColor="white"
                placeholder={this.props.route.params.user.About}
                value={this.state.about}
                onChangeText={(text) => this.changeAbout(text)}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <Text style={{ textAlign: "center", margin: 10 }}>
              Maximum 30 words required
            </Text>
            <View style={[Style.info, { justifyContent: "center" }]}>
              <Slider
                style={{ width: 200, height: 20, flexDirection: "row-reverse" }}
                minimumValue={5}
                maximumValue={100}
                step={5}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="#000000"
                onValueChange={(range) => this.setState({ range })}
              />
            </View>
            <Text style={{ textAlign: "center" }}>{this.state.range}</Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 30,
              }}
            >
              <TouchableOpacity
                style={[
                  Style.btnOpacityDefalut,
                  { backgroundColor: "#dc6997", borderColor: "#e58963" },
                ]}
                onPress={this.save}
              >
                <Text style={{ color: "white" }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
