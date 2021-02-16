import React, { Component } from 'react'
import { View, Image, Dimensions } from 'react-native'
import Style from '../Style';

const { height, width } = Dimensions.get('screen');

export default class FullScreenImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'http'
        }

    }
    componentDidMount() {
        //console.log(this.props.route);
        this.props.route != undefined ? this.setState({ image: this.props.route.params.image }) : this.setState({ image: this.props.navigation.state.params.image })
    }
    render() {
        return (
            <View style={Style.container}>
                <Image resizeMode="cover" source={{ uri: this.state.image }} style={{ height: height / 2, width }} />
            </View>
        )
    }
}