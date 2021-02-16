import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import Style from "../Style";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class Terms extends Component {
  render() {
    return (
      <View style={Style.container}>
        <StatusBar hidden />
        <LinearGradient {...linearGradient} />
        <AntDesign
          onPress={() => this.props.navigation.navigate("Login")}
          style={{ position: "absolute", top: 0, left: 15, margin: 15 }}
          name="arrowright"
          color="white"
          size={40}
        />
        <View style={[Style.containerProfileItem, { marginTop: 65 }]}>
          <View style={[Style.info, { marginTop: 20 }]}>
            <ScrollView>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                1. Acceptance of Terms of Use Agreement.
              </Text>
              <Text style={{ marginTop: 10 }}>
                By creating a WeMatch account, whether through a mobile device,
                mobile application or computer (collectively, the “Service”) you
                agree to be bound by (i) these Terms of Use, (ii) our Privacy
                Policy, Cookie Policy, Arbitration Procedures (if applicable to
                you) and Safety Tips, each of which is incorporated by reference
                into this Agreement, and (iii) any terms disclosed and agreed to
                by you if you purchase additional features, products or services
                we offer on the Service (collectively, this "Agreement"). If you
                do not accept and agree to be bound by all of the terms of this
                Agreement, please do not use the Service. We may make changes to
                this Agreement and to the Service from time to time. We may do
                this for a variety of reasons including to reflect changes in or
                requirements of the law, new features, or changes in business
                practices. The most recent version of this Agreement will be
                posted on the Service under Settings and also on goWeMatch.com,
                and you should regularly check for the most recent version. The
                most recent version is the version that applies. If the changes
                include material changes that affect your rights or obligations,
                we will notify you in advance of the changes by reasonable
                means, which could include notification through the Service or
                via email. If you continue to use the Service after the changes
                become effective, then you agree to the revised Agreement.
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
                2. Eligibility.
              </Text>
              <Text style={{ marginTop: 10 }}>
                You must be at least 18 years of age to create an account on
                WeMatch and use the Service. By creating an account and using
                the Service, you represent and warrant that:
              </Text>
              <Text>
                you can form a binding contract with WeMatch,you are not a
                person who is barred from using the Service under the laws of
                the United States or any other applicable jurisdiction–meaning
                that you do not appear on the U.S. Treasury Department’s list of
                Specially Designated Nationals or face any other similar
                prohibition,you will comply with this Agreement and all
                applicable local, state, national and international laws, rules
                and regulations, and you have never been convicted of a felony
                or indictable offense (or crime of similar severity), a sex
                crime, or any crime involving violence, and that you are not
                required to register as a sex offender with any state, federal
                or local sex offender registry.
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
                3. Your Account.
              </Text>
              <Text style={{ marginTop: 10 }}>
                In order to use WeMatch, you may sign in using your Facebook
                login. If you do so, you authorize us to access and use certain
                Facebook account information, including but not limited to your
                public Facebook profile. For more information regarding the
                information we collect from you and how we use it, please
                consult our Privacy Policy. You are responsible for maintaining
                the confidentiality of your login credentials you use to sign up
                for WeMatch, and you are solely responsible for all activities
                that occur under those credentials. If you think someone has
                gained access to your account, please immediately contact us.
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
                4. Modifying the Service and Termination.
              </Text>
              <Text style={{ marginTop: 10 }}>
                WeMatch is always striving to improve the Service and bring you
                additional functionality that you will find engaging and useful.
                This means we may add new product features or enhancements from
                time to time as well as remove some features, and if these
                actions do not materially affect your rights or obligations, we
                may not provide you with notice before taking them. We may even
                suspend the Service entirely, in which event we will notify you
                in advance unless extenuating circumstances, such as safety or
                security concerns, prevent us from doing so. You may terminate
                your account at any time, for any reason, by following the
                instructions in "Settings" in the Service, however if you use a
                third party payment account, you will need to manage in app
                purchases through such account (e.g., iTunes, Google Play) to
                avoid additional billing. WeMatch may terminate your account at
                any time without notice if it believes that you have violated
                this Agreement. Upon such termination, you will not be entitled
                to any refund for purchases. After your account is terminated,
                this Agreement will terminate, except that the following
                provisions will still apply to you and WeMatch: Section 4,
                Section 5, and Sections 12 through 19.
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
