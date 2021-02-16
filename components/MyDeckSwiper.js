import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

const { height, width } = Dimensions.get('screen');

const cards = [
    {
        name: 'Ran Matana',
        image: require('../assets/ran.jpg'),
        age: 28,
    },
    {
        name: 'Ran',
        image: require('../assets/ran.jpg'),
        age: 25,
    },
];

export default class MyDeckSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            photo: this.props.photo,
            name: this.props.name,
            logo: this.props.logo,
        }
    }
    componentDidUpdate() {
        if (this.state.name != this.props.name) {
            this.setState({
                id: this.props.id,
                photo: this.props.photo,
                name: this.props.name,
                logo: this.props.logo,
            });
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={{ width, height: height / 6 }}>
                    <Image resizeMode="cover" style={{ width, height: height / 6 }} source={{ uri: this.state.photo }} />
                </View>
                <View style={{ height: 400, marginTop: -5 }}>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3, backgroundColor: '#e6e6e6' }}>
                                <CardItem style={{ backgroundColor: '#e6e6e6' }} >
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text >{item.age}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
                <View style={{ width, height: 200, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => this._deckSwiper._root.swipeRight()}>
                        <Image source={require('../assets/heart.png')} style={{ width: 80, height: 80 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._deckSwiper._root.swipeLeft()}>
                        <Image source={require('../assets/unlike.png')} style={{ width: 70, height: 70, marginTop: 6 }} />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.header}>
          <View style={{ width: width / 2, margin: 20 }}>
            <Text style={styles.content}>You Are In: {`\n`}</Text>
            <Text style={styles.in}>{this.state.name}</Text>
          </View>
          <Image style={{ width: width / 2, height: height / 7 }} source={{ uri: this.state.logo }} />
        </View> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        width: width,
        height: height / 7,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: height / 2 + 50,
    },
    content: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    in: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});