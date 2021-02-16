import React, { Component } from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Style from "../Style";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NavigateReactContext } from "../components/NavigateContext";

export default class ProfileUser extends Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.route.params.user.Gender
      ? this.setState({ gender: "Male" })
      : this.setState({ gender: "Female" });
    let d = new Date(this.props.route.params.user.Birth);
    this.setState({ age: new Date().getFullYear() - d.getFullYear() });
  }
  back = () => {
    this.props.route.params.from == "message"
      ? this.props.navigation.navigate("Messages")
      : this.props.navigation.navigate("Matches");
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={{ uri: this.props.route.params.user.Photo }}
          style={Style.photo}
        >
          <AntDesign
            onPress={this.back}
            style={{ position: "absolute", top: 0, margin: 15 }}
            name="arrowright"
            color="white"
            size={40}
          />
        </ImageBackground>
        <View style={styles.containerProfileItem}>
          <View style={styles.matchesProfileItem}>
            <Text
              style={[styles.matchesTextProfileItem, { textAlign: "center" }]}
            >
              {/* <Icon name="heart" /> */}
              Age: {this.state.age}
            </Text>
          </View>
          <Text style={styles.name}>
            {this.props.route.params.user.Username}
          </Text>
          <View style={styles.info}>
            <Text style={styles.iconProfile}>
              <Fontisto name="intersex" size={16} />
            </Text>
            <Text style={styles.infoContent}>Gender: {this.state.gender}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.iconProfile}>
              <AntDesign name="profile" size={16} />
            </Text>
            <Text style={styles.infoContent}>About</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoContent}>
              {this.props.route.params.user.About}
            </Text>
          </View>
          <View style={Style.actionsProfile}>
            <TouchableOpacity
              style={Style.circledButton}
              onPress={() => {
                this.props.navigation.navigate("Message", {
                  item: this.props.route.params.user,
                  user: this.context.state.user,
                });
              }}
            >
              <Text style={styles.iconButton}>
                <AntDesign name="message1" size={26} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
