import Style from '../Style'
import { Spinner } from 'native-base';
import React from 'react';
import { Text, View, StatusBar } from 'react-native';

export default Loading = () => (
    <View style={Style.loadingContainer}>
        <StatusBar hidden />
        <Text style={Style.paragraph}>Loading...</Text>
        <Spinner color='red' />
    </View>
);