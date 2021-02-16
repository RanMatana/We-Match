import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'
import { currentPlace } from '../api';
import Style from '../Style'
import Loading from '../components/Loading'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class CurrentPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        }
    }
    async componentDidMount() {
        const Place = await currentPlace(this.props.route.params.user.User_ID);
        this.setState({ Place, isReady: true })
    }
    render() {
        if (this.state.isReady) {
            return (
                <ImageBackground source={{ uri: this.state.Place.Photo }} resizeMode="cover" style={Style.bg}>
                    <AntDesign onPress={() => this.props.navigation.navigate('Profile')} style={{ position: 'absolute', top: 0, margin: 15 }} name="arrowright" color="white" size={40} />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[Style.containerProfileItem, { borderColor: 'black', borderWidth: 2, backgroundColor: '#e6e6e6' }]}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                                <Text style={{ fontSize: 18 }}>Are you in:</Text>
                                <Text style={{ margin: 10, fontSize: 28, fontWeight: 'bold' }}>{this.state.Place.Name}</Text>
                                <Text>{this.state.Place.Address}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            )
        } else return <Loading />
    }
}
