import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import Backdrop from "../components/Backdrop";
import Rating from "../Rating";
import Style from "../Style";
import * as Notifications from "expo-notifications";
import { NavigateReactContext } from "../components/NavigateContext";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export default class HomeScreen extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      scrollX: new Animated.Value(0),
    };
  }

  navigateNotifications = async (title) => {
    if (title.includes("Sent Message")) {
      this.context.actions.updateMessages();
      this.context.actions.lessBadgeMessages();
      this.props.navigation.navigate("Messages");
    } else {
      this.context.actions.updateMatches();
      this.context.actions.lessBadgeMatches();
      this.props.navigation.navigate("Matches");
    }
  };
  async componentDidMount() {
    this.setState({
      places: this.context.state.places,
      user: this.context.state.user,
    });
    Notifications.addNotificationResponseReceivedListener((res) => {
      let title = res.notification.request.content.title;
      this.navigateNotifications(title);
    });
  }
  componentDidUpdate() {
    if (this.state.places != this.context.state.places) {
      this.setState({
        places: this.context.state.places,
      });
    }
  }

  render() {
    if (this.state.places.length == 0) {
      return (
        <View style={Style.container}>
          <LinearGradient {...linearGradient} />
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
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                There are no places of entertainment in the range you have
                chosen .. Please return to the profile and edit the range
              </Text>
              <MaterialCommunityIcons
                style={{ marginTop: 20 }}
                name="account-circle-outline"
                size={50}
                color="#dc6997"
                onPress={() => this.props.navigation.navigate("Profile")}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Backdrop places={this.state.places} scrollX={this.state.scrollX} />
          <StatusBar hidden />
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.places}
            keyExtractor={(item) => item.key + "-Home"}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: "center" }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              if (!item.poster) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];

              const translateY = this.state.scrollX.interpolate({
                inputRange,
                outputRange: [100, 50, 100],
                extrapolate: "clamp",
              });

              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View
                    style={{
                      marginHorizontal: SPACING,
                      padding: SPACING * 2,
                      alignItems: "center",
                      transform: [{ translateY }],
                      backgroundColor: "white",
                      borderRadius: 34,
                      marginBottom: width / 4,
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        Vibration.vibrate(100);
                        this.props.navigation.navigate("DetailsPlace", {
                          item,
                          user_id: this.state.user.User_ID,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: item.poster }}
                        style={Style.posterImage}
                      />
                    </TouchableWithoutFeedback>
                    <Text style={{ fontSize: 24 }} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Rating rating={item.rating} />
                    <TouchableOpacity
                      style={[
                        Style.btnOpacityDefalut,
                        {
                          backgroundColor: "#dc6997",
                          borderColor: "#e58963",
                        },
                      ]}
                      onPress={() => {
                        Vibration.vibrate(100);
                        this.props.navigation.navigate("DetailsPlace", {
                          item,
                          user_id: this.state.user.User_ID,
                        });
                      }}
                    >
                      <Text style={{ color: "white" }}>For more details</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              );
            }}
          />
        </View>
      );
    }
  }
}
