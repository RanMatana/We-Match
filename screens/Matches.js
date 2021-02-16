import React from "react";
import styles from "../Style";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CardItem from "../components/CardItem";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import Loading from "../components/Loading";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigateReactContext } from "../components/NavigateContext";

export default class Matches extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    this.context.actions.initBadgeMatches();
    const user = this.context.state.user;
    const matches = this.context.state.matches;
    if (user != null) {
      this.setState({ user, matches }, async () => {
        this.setState({ isReady: true });
      });
    }
  }
  componentDidUpdate() {
    if (this.state.matches != this.context.state.matches) {
      this.setState({
        matches: this.context.state.matches,
      });
    }
  }
  render() {
    if (this.state.isReady) {
      if (this.state.matches != null) {
        return (
          <View style={styles.containerMatches}>
            <LinearGradient {...linearGradient} />
            <View style={{ margin: 10, paddingTop: 20 }}>
              <Text style={styles.title}>Matches</Text>
            </View>
            <FlatList
              numColumns={2}
              data={this.state.matches}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ProfileUser", {
                      user: item,
                      from: "matches",
                    })
                  }
                >
                  <CardItem image={item.Photo} name={item.Username} variant />
                </TouchableOpacity>
              )}
            />
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <LinearGradient {...linearGradient} />
            <View style={{ margin: 10, paddingTop: 20 }}>
              <Text style={styles.title}>Matches</Text>
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
                Sorry but you have no matches
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
      }
    } else {
      return <Loading />;
    }
  }
}
