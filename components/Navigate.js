import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Root } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Room from "../screens/Room";
import Messages from "../screens/Messages";
import CurrentMessage from "../screens/CurrentMessage";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import DetailsPlace from "../screens/DetailsPlace";
import ProfileUser from "../screens/ProfileUser";
import FullScreenImage from "../screens/FullScreenImage";
import Matches from "../screens/Matches";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CurrentPlace from "../screens/CurrentPlace";
import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { NavigateReactContext } from "./NavigateContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const colorOfTab = "#dc6997";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function MessagesMenu({ navigation, route }) {
  React.useEffect(() => {
    if (route.state && route.state.index > 0) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={CurrentMessage}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#e58963",
          },
          headerTitle: "",
          transitionSpec: {
            open: {
              animation: "timing",
            },
            close: {
              animation: "timing",
              config: {
                duration: 300,
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function HomeMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsPlace"
        component={DetailsPlace}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function MatchMenu({ navigation, route }) {
  React.useEffect(() => {
    if (route.state && route.state.index > 0) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Matches"
        component={Matches}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={CurrentMessage}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#e58963",
          },
          headerTitle: "",
          transitionSpec: {
            open: {
              animation: "timing",
            },
            close: {
              animation: "timing",
              config: {
                duration: 300,
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrentPlace"
        component={CurrentPlace}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FullScreen"
        component={FullScreenImage}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#e58963",
          },
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

class MainTabScreen extends React.Component {
  static contextType = NavigateReactContext;

  constructor(props) {
    super(props);
    this.state = {
      badgeMsg: null,
      badgeMc: null,
    };
  }

  setBadge = async (title) => {
    if (title.includes("Sent Message")) {
      this.context.actions.updateMessages();
      this.context.actions.incBadgeMessages();
    } else {
      this.context.actions.updateMatches();
      this.context.actions.incBadgeMatches();
    }
  };
  componentDidMount() {
    registerForPushNotificationsAsync().then(() => {
      Notifications.addNotificationReceivedListener((res) => {
        let title = res.request.trigger.remoteMessage.data.title;
        this.setBadge(title);
      });
      //   registerForPushNotificationsAsync().then(() => {
      //     Notifications.addNotificationResponseReceivedListener(async (res) => {
      //       let title = res.notification.request.content.title;
      //       if (title.includes("Sent Message")) {
      //         await AsyncStorage.setItem("MessageBadges", "0");
      //         this.setState({ badgeMsg: null });
      //       } else {
      //         await AsyncStorage.setItem("MatchesBadges", "0");
      //         this.setState({ badgeMc: null });
      //       }
      //     });
      //   });
    });
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#dc6997",
          adaptive: true,
        }}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileMenu}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={colorOfTab}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Matches"
          component={MatchMenu}
          options={{
            tabBarBadge: this.context.state.badgeMatches,
            tabBarLabel: "Matches",
            tabBarIcon: () => (
              <FontAwesome name="fire" color={colorOfTab} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesMenu}
          options={{
            tabBarBadge: this.context.state.badgeMessges,
            tabBarLabel: `Messages`,
            tabBarIcon: () => (
              <AntDesign name="message1" color={colorOfTab} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Room"
          component={Room}
          options={{
            tabBarLabel: `Room`,
            tabBarIcon: () => (
              <AntDesign name="hearto" color={colorOfTab} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeMenu}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <AntDesign name="home" color={colorOfTab} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default class Navigate extends Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <MainTabScreen />
        </NavigationContainer>
      </Root>
    );
  }
}
