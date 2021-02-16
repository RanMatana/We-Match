import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  authentication,
  getPlaces,
  putUser,
  getLastMessages,
  getMatches,
  currentPlace,
} from "../api";
import * as firebase from "firebase";
import registerForPushNotificationsAsync from "../components/registerForPushNotificationsAsync";
import Loading from "../components/Loading";
export const NavigateReactContext = React.createContext();

export class NavigateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  updateUserAndPlace = async () => {
    const { email, displayName } = firebase.auth().currentUser;
    const user = await authentication(email);
    if (user != null) {
      registerForPushNotificationsAsync().then((token) =>
        this.setState({ token }, () => {
          // need to check if have duplicate token if yes remove from server

          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState(
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
                async () => {
                  user.Latitude = this.state.latitude;
                  user.Longitude = this.state.longitude;
                  user.Token = this.state.token;
                  let d = new Date(user.Birth);
                  user.BirthdayString = `${d.getFullYear()}-${
                    d.getMonth() + 1
                  }-${d.getDate()}`;
                  await putUser(user);
                  this.setState({ user }, async () => {
                    const places = await getPlaces(
                      this.state.user.Latitude,
                      this.state.user.Longitude,
                      this.state.user.Range
                    );
                    if (places != null && places.length > 0) {
                      this.setState(
                        {
                          places: [
                            { key: "empty-left" },
                            ...places,
                            { key: "empty-right" },
                          ],
                        },
                        async () => {
                          await this.getCurrentPlace();
                          await this.getMessages();
                          await this.getMatches();
                        }
                      );
                    } else {
                      this.setState({ places: [] }, async () => {
                        await this.getCurrentPlace();
                        await this.getMessages();
                        await this.getMatches();
                      });
                    }
                  });
                }
              );
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
          );
        })
      );
    }
  };

  getMessages = async () => {
    let userMessages = await getLastMessages(this.state.user.User_ID);
    if (userMessages != null) {
      this.setState({ messages: userMessages });
    }
  };
  getMatches = async () => {
    let userMatches = await getMatches(this.state.user);
    this.setState({ matches: userMatches ? userMatches : null, isReady: true });
  };
  getCurrentPlace = async () => {
    const Place = await currentPlace(this.state.user.User_ID);
    this.setState({ currentPlace: Place });
  };
  async componentDidMount() {
    const badgeMessges = await AsyncStorage.getItem("MessageBadges");
    const badgeMatches = await AsyncStorage.getItem("MatchesBadges");
    this.fixBadges(badgeMessges, badgeMatches);
    await this.updateUserAndPlace();
  }

  actions = {
    enterPlace: (place) => {
      this.setState({ currentPlace: place });
    },
    incBadgeMessages: () => {
      this.setState(
        {
          badgeMessges:
            this.state.badgeMessges == null
              ? 1
              : parseInt(this.state.badgeMessges) + 1,
        },
        async () => {
          await AsyncStorage.setItem(
            "MessageBadges",
            this.state.badgeMessges.toString()
          );
        }
      );
    },
    incBadgeMatches: () => {
      this.setState(
        {
          badgeMatches:
            this.state.badgeMatches == null
              ? 1
              : parseInt(this.state.badgeMatches) + 1,
        },
        async () => {
          await AsyncStorage.setItem(
            "MatchesBadges",
            this.state.badgeMatches.toString()
          );
        }
      );
    },
    lessBadgeMessages: () => {
      this.setState(
        {
          badgeMessges:
            this.state.badgeMessges == 1 || this.state.badgeMessges == null
              ? null
              : parseInt(this.state.badgeMessges) - 1,
        },
        async () => {
          if (this.state.badgeMessges === null) {
            await AsyncStorage.removeItem("MessageBadges");
          } else {
            await AsyncStorage.setItem(
              "MessageBadges",
              this.state.badgeMessges.toString()
            );
          }
        }
      );
    },
    lessBadgeMatches: () => {
      this.setState(
        {
          badgeMatches:
            this.state.badgeMatches == 1 || this.state.badgeMatches == null
              ? null
              : parseInt(this.state.badgeMatches) - 1,
        },
        async () => {
          if (this.state.badgeMatches === null) {
            await AsyncStorage.removeItem("MatchesBadges");
          } else {
            await AsyncStorage.setItem(
              "MatchesBadges",
              this.state.badgeMatches.toString()
            );
          }
        }
      );
    },
    initBadgeMessages: () => {
      this.setState({ badgeMessges: null }, async () => {
        await AsyncStorage.setItem("MessageBadges", "0");
      });
    },
    initBadgeMatches: () => {
      this.setState({ badgeMatches: null }, async () => {
        await AsyncStorage.setItem("MatchesBadges", "0");
      });
    },
    update: async () => {
      await this.updateUserAndPlace();
    },
    updateMessages: async () => {
      await this.getMessages();
    },
    updateMatches: async () => {
      await this.getMatches();
    },
  };

  fixBadges = (msg, match) => {
    if (msg == null || msg == undefined) {
      this.setState({ badgeMessges: null });
    } else {
      this.setState({ badgeMessges: msg == 0 ? null : msg });
    }
    if (match == null || match == undefined) {
      this.setState({ badgeMatches: null });
    } else {
      this.setState({ badgeMatches: match == 0 ? null : match });
    }
  };

  render() {
    if (this.state.isReady) {
      return (
        <NavigateReactContext.Provider
          value={{ state: this.state, actions: this.actions }}
        >
          {this.props.children}
        </NavigateReactContext.Provider>
      );
    } else return <Loading />;
  }
}
