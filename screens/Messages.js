import React from "react";
import styles from "../Style";
import Loading from "../components/Loading";
import { NavigateReactContext } from "../components/NavigateContext";
import { Text, TouchableOpacity, Image, View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class MessagesScreen extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    this.context.actions.initBadgeMessages();
    const user = this.context.state.user;
    const messages = this.context.state.messages;
    if (user != null) {
      this.setState({ user, messages }, async () => {
        this.setState({ isReady: true });
      });
    }
  }
  componentDidUpdate() {
    if (this.state.messages != this.context.state.messages) {
      this.setState({
        messages: this.context.state.messages,
      });
    }
  }
  render() {
    if (this.state.isReady) {
      if (!this.state.messages) {
        return (
          <View style={{ flex: 1 }}>
            <LinearGradient {...linearGradient} />
            <View
              style={{
                margin: 10,
                paddingTop: 20,
              }}
            >
              <Text style={styles.title}>Messages</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: -100,
                  textAlign: "center",
                }}
              >
                Sorry but you have no messages
              </Text>
              <FontAwesome5
                style={{ margin: 20 }}
                name="heart-broken"
                size={50}
                color="white"
              />
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.containerMessages}>
            <LinearGradient {...linearGradient} />

            <View
              style={{
                margin: 10,
                paddingTop: 20,
              }}
            >
              <Text style={styles.title}>Messages</Text>
            </View>
            <FlatList
              data={this.state.messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Message", {
                      item,
                      user: this.state.user,
                    })
                  }
                >
                  <View
                    style={[
                      styles.containerMessage,
                      {
                        backgroundColor: "#e6e6e6",
                        margin: 5,
                        borderRadius: 40,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("ProfileUser", {
                          user: item,
                          from: "message",
                        })
                      }
                    >
                      <Image
                        source={{ uri: item.Photo }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <Text>{item.Username}</Text>
                      <Text style={styles.message}>{item.Message}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      }
    } else {
      return <Loading />;
    }
  }
}
