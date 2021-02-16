import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Vibration,
  ImageBackground,
  ScrollView,
  Keyboard,
} from "react-native";
import Style from "../Style";
import CheckBox from "@react-native-community/checkbox";
import { imageUpload, registerUserFire, registerUserSQL } from '../api';
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Slider from "@react-native-community/slider";
import { Spinner } from "native-base";

const inputName = {
  style: Style.input,
  placeholderTextColor: "white",
};
const inputDay = {
  placeholder: "DD",
  style: [Style.input, { width: 60, marginRight: 50 }],
  placeholderTextColor: "white",
  keyboardType: "numeric",
};
const inputMonth = {
  placeholder: "MM",
  style: [Style.input, { width: 60 }],
  placeholderTextColor: "white",
  keyboardType: "numeric",
};
const inputYear = {
  placeholder: "YYYY",
  style: [Style.input, { width: 80 }],
  placeholderTextColor: "white",
  keyboardType: "numeric",
};

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: "",
      month: "",
      year: "",
      genderMan: true,
      genderFemale: false,
      name: "",
      interestedMan: false,
      interestedFemale: true,
      image: "http",
      error: "",
      range: 0,
      about: "",
      con: null,
    };
  }
  changeAbout = (text) => {
    if (this.state.about.split(" ").length - 1 < 30) {
      text.split(" ").length / 4 == 0 ? (text += "\n") : "";
      this.setState({ about: text });
    }
  };
  componentDidMount() {
    this.getPermissionAsync();
    this.setState({ image: this.props.navigation.state.params.res.Photo });
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  changeDay = (day) => {
    if (this.state.day.length < 2) this.setState({ day });
  };
  changeMonth = (month) => {
    if (this.state.month.length < 2) {
      this.setState({ month });
    }
  };
  changeYear = (year) => {
    if (this.state.year.length < 4) {
      this.setState({ year });
    }
  };
  setSelectionGender = () => {
    this.state.genderMan
      ? this.setState({ genderMan: false, genderFemale: true })
      : this.setState({ genderMan: true, genderFemale: false });
  };
  setSelectionInterested = () => {
    !this.state.interestedMan
      ? this.setState({ interestedMan: true, interestedFemale: false })
      : this.setState({ interestedMan: false, interestedFemale: true });
  };
  checkUsername = async () => {
    if (this.state.name === "") {
      this.setState({ name: this.props.navigation.state.params.res.Username });
    }
  };
  //take email from props and delete functions
  btnContinue = async () => {
    Vibration.vibrate(100);
    Keyboard.dismiss();
    if (
      this.state.day != "" &&
      this.state.month != "" &&
      this.state.year != ""
    ) {
      if (
        1 <= parseInt(this.state.day) &&
        parseInt(this.state.day) <= 31 &&
        1 <= parseInt(this.state.month) &&
        parseInt(this.state.month) <= 12 &&
        parseInt(this.state.year) > 1950
      ) {
        inputDay.style = [
          Style.input,
          { color: "white", width: 60, marginRight: 50 },
        ];
        inputMonth.style = [Style.input, { color: "white", width: 60 }];
        inputYear.style = [Style.input, { color: "white", width: 80 }];
        if (parseInt(this.state.year) < 2002) {
          inputYear.style = [Style.input, { color: "white", width: 80 }];
          if (this.state.value == 0 || this.state.about == "") {
            this.setState({
              error: "Please fill in all the details including Range and About",
            });
          } else {
            this.setState({ error: null }, () => {
              this.setState({ con: "a" }, async () => {
                let url = await imageUpload(
                  this.state.image,
                  this.props.navigation.state.params.res.Username
                );
                await this.checkUsername();
                const d = new Date(
                  this.state.year +
                    "-" +
                    this.state.month +
                    "-" +
                    this.state.day
                );
                let user = {
                  Username: this.state.name,
                  Email: this.props.navigation.state.params.res.Email,
                  Gender: this.state.genderMan,
                  Interested: this.state.interestedMan,
                  Photo: url,
                  Latitude: "1",
                  Longitude: "1",
                  Token: "1",
                  Range: this.state.range,
                  BirthdayString: `${d.getFullYear()}-${
                    d.getMonth() + 1
                  }-${d.getDate()}`,
                  About: this.state.about,
                };
                await registerUserSQL(user);
                await registerUserFire(user);
                setTimeout(() => {
                  this.props.navigation.navigate("Navigate");
                }, 3000);
              });
            });
          }
        } else {
          inputYear.style = [Style.input, { color: "red", width: 80 }];
          this.setState({ error: "You must be over 18 years old" });
        }
      } else {
        inputDay.style = [
          Style.input,
          { color: "red", width: 60, marginRight: 50 },
        ];
        inputMonth.style = [Style.input, { color: "red", width: 60 }];
        inputYear.style = [Style.input, { color: "red", width: 80 }];
        this.setState({ error: "Invalid Date" });
      }
    } else {
      this.setState({ error: "Please enter full date of birth" });
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
              resizeMode="cover"
              source={{ uri: this.state.image }}
              style={[
                Style.profileImage,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <TouchableOpacity onPress={this._pickImage}>
                <Image
                  resizeMode="cover"
                  source={require("../assets/add.png")}
                  style={{ height: 60, width: 60 }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
          <View style={[Style.containerProfileItem, { marginTop: 35 }]}>
            <View style={[Style.info, { marginTop: 20 }]}>
              <View
                style={[
                  Style.ViewOfInput,
                  { flexDirection: "column", marginRight: -20 },
                ]}
              >
                <Text style={[Style.iconProfile, { marginRight: 40 }]}>
                  Name
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    {...inputName}
                    value={this.state.name}
                    placeholder={
                      this.props.navigation.state.params.res.Username
                    }
                    onChangeText={(name) => this.setState({ name })}
                  />
                </View>
              </View>
            </View>
            <View style={[Style.info]}>
              <View
                style={[
                  Style.ViewOfInput,
                  { flexDirection: "column", marginRight: -20 },
                ]}
              >
                <Text style={{ marginRight: 50 }}>Date of Birth</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    {...inputYear}
                    onChangeText={(year) => this.changeYear(year)}
                    value={this.state.year}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === "Backspace") {
                        this.setState({
                          year: this.state.year.substring(
                            0,
                            this.state.year.length - 1
                          ),
                        });
                      }
                    }}
                  />
                  <Text style={{ margin: 10 }}>/</Text>
                  <TextInput
                    {...inputMonth}
                    onChangeText={(month) => this.changeMonth(month)}
                    value={this.state.month}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === "Backspace") {
                        this.setState({
                          month: this.state.month.substring(
                            0,
                            this.state.month.length - 1
                          ),
                        });
                      }
                    }}
                  />
                  <Text style={{ margin: 10 }}>/</Text>
                  <TextInput
                    {...inputDay}
                    onChangeText={(day) => this.changeDay(day)}
                    value={this.state.day}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === "Backspace") {
                        this.setState({
                          day: this.state.day.substring(
                            0,
                            this.state.day.length - 1
                          ),
                        });
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={Style.info}>
              <View
                style={[
                  Style.ViewOfInput,
                  { flexDirection: "column", marginTop: 20, marginRight: -20 },
                ]}
              >
                <Text style={{ marginRight: 50 }}>What is your Gender ?</Text>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                    <CheckBox
                      value={this.state.genderMan}
                      onChange={() => this.setSelectionGender()}
                    />
                    <Text style={{ margin: 5 }}>Male</Text>
                  </View>
                  <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                    <CheckBox
                      value={this.state.genderFemale}
                      onChange={() => this.setSelectionGender()}
                    />
                    <Text style={{ margin: 5 }}>Female</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Style.info}>
              <View
                style={[
                  Style.ViewOfInput,
                  { flexDirection: "column", marginRight: -20 },
                ]}
              >
                <Text style={{ marginRight: 50 }}>
                  What are you interested in ?
                </Text>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                    <CheckBox
                      value={this.state.interestedMan}
                      onChange={() => this.setSelectionInterested()}
                    />
                    <Text style={{ margin: 5 }}>Male</Text>
                  </View>
                  <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                    <CheckBox
                      value={this.state.interestedFemale}
                      onChange={() => this.setSelectionInterested()}
                    />
                    <Text style={{ margin: 5 }}>Female</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Style.container}>
              <Text style={{ margin: 10 }}>Distance From Place (km)</Text>
              <Text> Range : {this.state.range}</Text>
              <Slider
                style={{ width: 200, height: 20, flexDirection: "row-reverse" }}
                minimumValue={5}
                maximumValue={100}
                step={5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(range) => this.setState({ range })}
              />
              <View style={[Style.ViewOfInput, { height: 30, marginTop: 40 }]}>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Text style={[{ marginRight: 60 }]}>About You</Text>
                  <Text style={{ marginRight: 20 }}>
                    {this.state.about.split(" ").length - 1}/30
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                style={[
                  Style.input,
                  { height: 150, textAlignVertical: "top", margin: 10 },
                ]}
                placeholderTextColor="white"
                placeholder="Enter something about yourself"
                value={this.state.about}
                onChangeText={(text) => this.changeAbout(text)}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginTop: 10 }}>Maximum 30 words required</Text>
            </View>
            {this.state.error == null ? null : (
              <Text style={{ color: "red", margin: 10, textAlign: "center" }}>
                {this.state.error}
              </Text>
            )}

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={[
                  Style.btnOpacity,
                  {
                    borderColor: "white",
                    borderWidth: 2,
                    backgroundColor: "#020a30",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                onPress={this.btnContinue}
              >
                {this.state.con ? (
                  <Spinner color="red" />
                ) : (
                  <Text style={[Style.textLogin, { color: "white" }]}>
                    CONTINUE
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
