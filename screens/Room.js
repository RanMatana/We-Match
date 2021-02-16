import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import CardItem from "../components/CardItem";
import Style from "../Style";
import { updateUserCurrentPlaces, match2Insert, Reject2Insert } from "../api";
import Loading from "../components/Loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isReady: false,
      struct: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params != undefined) {
      this.setState(
        {
          item: this.props.route.params.item,
          user_id: this.props.route.params.user_id,
        },
        () => {
          this.getUsersInRoom();
        }
      );
    }
  }

  getUsersInRoom = async () => {
    let users = await updateUserCurrentPlaces(
      this.state.item.key,
      this.state.user_id
    );
    if (users != null) {
      this.setState({ users, struct: null }, () => {
        var struct;
        if (this.state.users != []) {
          struct = this.state.users.map((item, index) => (
            <Card
              key={index}
              onSwipedRight={async () =>
                await match2Insert(this.state.user_id, item.User_ID)
              }
              onSwipedLeft={async () =>
                await Reject2Insert(this.state.user_id, item.User_ID)
              }
            >
              <CardItem
                image={item.Photo}
                name={item.Username}
                description={item.About}
                age={item.Birth}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ));
        }

        this.setState({ struct });
      });
    }
    this.setState({ isReady: true });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params != undefined) {
      if (prevProps.route.params.item.key != this.props.route.params.item.key) {
        this.setState(
          {
            item: this.props.route.params.item,
            user_id: this.props.route.params.user_id,
          },
          () => {
            this.getUsersInRoom();
          }
        );
      }
    } else {
      this.getUsersInRoom();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route.params != undefined) {
      return {
        item: nextProps.route.params.item,
        user_id: nextProps.route.params.user_id,
      };
    }
    return null;
  }
  refresh = () => {
    this.setState({ isReady: false }, () => {
      setTimeout(() => {
        this.getUsersInRoom();
        this.setState({ isReady: true });
      }, 4000);
    });
  };
  render() {
    if (this.props.route.params != undefined) {
      if (this.state.isReady) {
        if (this.state.struct) {
          return (
            <ImageBackground
              source={{ uri: this.props.route.params.item.backdrop }}
              style={Style.bg}
            >
              <View style={Style.containerRoom}>
                <CardStack
                  loop={false}
                  verticalSwipe={false}
                  renderNoMoreCards={() => null}
                  onSwipedAll={async () =>
                    setTimeout(() => {
                      this.setState({ struct: null });
                    }, 500)
                  }
                  ref={(swiper) => (this.swiper = swiper)}
                >
                  {this.state.struct}
                </CardStack>
              </View>
            </ImageBackground>
          );
        } else
          return (
            <ImageBackground
              source={{ uri: this.state.item.poster }}
              resizeMode="cover"
              style={Style.bg}
            >
              <View style={Style.container}>
                <View
                  style={[
                    Style.containerProfileItem,
                    {
                      borderColor: "black",
                      borderWidth: 2,
                      backgroundColor: "#e6e6e6",
                    },
                  ]}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 10,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>You are in:</Text>
                    <Text style={{ fontSize: 28 }}>
                      {this.state.item.title}
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      You have passed all users
                    </Text>
                    <Text>or</Text>
                    <Text>there are no people in this room.</Text>
                    <View
                      style={{
                        marginTop: 30,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontStyle: "italic" }}>
                        Try refreshing or returning to the home screen
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 20,
                          width: 80,
                        }}
                      >
                        <FontAwesome
                          name="refresh"
                          size={30}
                          onPress={this.refresh}
                        />
                        <AntDesign
                          name="home"
                          size={30}
                          onPress={() => this.props.navigation.navigate("Home")}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          );
      } else return <Loading />;
    } else {
      return (
        <ImageBackground
          source={require("../assets/party.jpg")}
          resizeMode="cover"
          style={[Style.bg, { opacity: 0.8 }]}
        >
          <View style={Style.container}>
            <View style={[Style.containerProfileItem]}>
              <Text
                style={[
                  styles.infoContent,
                  {
                    textAlign: "center",
                    margin: 10,
                    fontWeight: "bold",
                    fontSize: 28,
                    color: "black",
                  },
                ]}
              >
                Please Select Place !
              </Text>
              <Image
                source={require("../assets/red-x.png")}
                style={{
                  width: 200,
                  height: 200,
                  margin: 50,
                }}
              />
            </View>
            <TouchableOpacity
              style={[
                Style.btnOpacityDefalut,
                { backgroundColor: "black", borderColor: "#e58963" },
              ]}
              onPress={() => {
                Vibration.vibrate(100);
                this.props.navigation.navigate("Home");
              }}
            >
              <Text style={{ color: "white" }}>Back To Home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    }
  }
}
