import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { messagesBetween, sendMsg } from "../api";
import * as Notifications from "expo-notifications";
import { NavigateReactContext } from "../components/NavigateContext";

export default class CurrentMessage extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    this.initMessages();
    Notifications.addNotificationReceivedListener((res) => {
      this.initMessages();
    });
  }
  initMessages = () => {
    this.setState(
      {
        From_User: this.props.route.params.user.User_ID,
        To_User: this.props.route.params.item.User_ID,
      },
      async () => {
        const fetchMessages = await messagesBetween(
          this.state.From_User,
          this.state.To_User
        );
        let arrayMessages = [];
        if (fetchMessages !== null && fetchMessages.length > 0) {
          for (let i = 0; i < fetchMessages.length; i++) {
            let mes = {
              _id: fetchMessages[i].From_User + fetchMessages[i].Date,
              text: fetchMessages[i].Text,
              createdAt: fetchMessages[i].Date,
              user: {
                _id: fetchMessages[i].From_User,
                avatar: this.props.route.params.item.Photo,
              },
            };
            arrayMessages.push(mes);
          }
        }
        this.setState({
          messages: arrayMessages.reverse(),
        });
      }
    );
  };
  onSend = async (message) => {
    await sendMsg(this.state.From_User, this.state.To_User, message[0].text);
    this.context.actions.updateMessages();
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message),
      };
    });
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => this.onSend(message)}
        user={{
          _id: this.props.route.params.user.User_ID,
          name: this.props.route.params.user.Username,
        }}
      />
    );
  }
}
