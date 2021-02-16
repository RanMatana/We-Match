import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  Vibration,
} from "react-native";
import Style from "../Style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { NavigateReactContext } from "../components/NavigateContext";
import Rating from "../Rating";
import { checkIfUserClicked, insertLike } from "../api";

const { height, width } = Dimensions.get("screen");

export default class DetailsPlace extends Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      like: false,
    };
  }
  async componentDidMount() {
    let check = await checkIfUserClicked(
      this.props.route.params.item.key,
      this.props.route.params.user_id
    );
    this.setState({ check });
  }
  goToPlace = () => {
    Linking.openURL(
      `https://www.waze.com/ul?ll=${this.props.route.params.item.latitude}%2C${this.props.route.params.item.longitude}&navigate=yes&zoom=17`
    );
  };
  like = async () => {
    if (this.state.check == null) {
      await insertLike(
        this.props.route.params.item.key,
        this.props.route.params.user_id
      );
    }
    this.setState({ check: true });
  };
  enter = () => {
    this.context.actions.enterPlace(this.props.route.params.item);
    Vibration.vibrate(100);
    this.props.navigation.navigate("Room", {
      item: this.props.route.params.item,
      user_id: this.props.route.params.user_id,
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "column" }}>
            <ImageBackground
              style={{ height: 200, width: 500 }}
              source={{ uri: this.props.route.params.item.backdrop }}
            >
              <AntDesign
                onPress={() => this.props.navigation.navigate("Home")}
                style={{ position: "absolute", top: 0, margin: 15 }}
                name="arrowright"
                color="white"
                size={40}
              />
            </ImageBackground>
            <View
              style={{
                width,
                height: height / 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  marginTop: -120,
                  borderRadius: 100,
                }}
                source={{ uri: this.props.route.params.item.poster }}
              />
            </View>
          </View>
          <View style={[Style.containerProfileItem, { marginTop: -35 }]}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={Style.name}>
                {this.props.route.params.item.title}
              </Text>
              <Rating rating={this.props.route.params.item.rating} />
            </View>
            <View style={Style.info}>
              <Text style={Style.iconProfile}>
                <EvilIcons name="location" size={20} />
              </Text>
              <Text style={Style.infoContent}>
                {this.props.route.params.item.description}
              </Text>
            </View>
            <View style={Style.info}>
              <Text style={Style.iconProfile}>
                <Entypo name="gauge" size={20} />
              </Text>
              <Text style={Style.infoContent}>
                {parseInt(this.props.route.params.item.distance / 1000)}km from
                you
              </Text>
            </View>
            <View style={Style.info}>
              <Text style={Style.iconProfile}>
                <AntDesign name="profile" size={16} />
              </Text>
              <Text style={Style.infoContent}>About</Text>
            </View>
            <View style={Style.info}>
              <Text style={Style.infoContent}>
                {this.props.route.params.item.releaseDate}
              </Text>
            </View>
            {this.state.check != null ? (
              <View
                style={[
                  Style.info,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Text style={[Style.infoContent, { color: "black" }]}>
                  You Liked this place
                </Text>
              </View>
            ) : null}
          </View>
          <View style={Style.actionsProfile}>
            <TouchableOpacity
              style={Style.circledButton}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.iconButton}>
                <AntDesign name="home" size={26} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.circledButton} onPress={this.like}>
              <Text style={styles.iconButton}>
                <AntDesign name="like2" size={26} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.circledButton}
              onPress={this.goToPlace}
            >
              <Text style={styles.iconButton}>
                <MaterialCommunityIcons name="waze" size={26} />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.roundedButton} onPress={this.enter}>
              <Text style={{ color: "white" }}>Enter to the Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
