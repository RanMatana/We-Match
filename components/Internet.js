import React, { Component } from 'react'
import { Text, View, ImageBackground, Image } from 'react-native'
import Style from '../Style'

export default class Internet extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/party.jpg')} resizeMode="cover" style={[Style.bg, { opacity: 0.8 }]}>
                <View style={Style.container}>
                    <View style={[Style.containerProfileItem]}>
                        <Text style={[styles.infoContent, { textAlign: 'center', margin: 10, fontWeight: 'bold', fontSize: 28, color: 'black' }]}>Mo Internet Access !</Text>
                        <Image source={require('../assets/red-x.png')} style={{
                            width: 200,
                            height: 200,
                            margin: 50,
                        }} />
                        <Text style={{ textAlign: 'center',fontWeight:'bold',fontSize:18 }}>Please connect to the internet</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
