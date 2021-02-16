import React from 'react';
import styles from '../Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const CardItem = ({
    actions,
    description,
    image,
    age,
    name,
    onPressLeft,
    onPressRight,
    status,
    variant
}) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: variant ? 170 : 350,
            margin: variant ? 0 : 20
        }
    ];

    const nameStyle = [
        {
            //paddingTop: variant ? 10 : 15,
            paddingBottom: variant ? 5 : 7,
            color: '#363636',
            fontSize: variant ? 15 : 30
        }
    ];
    let d = new Date(age);
    return (
        <View style={styles.containerCardItem}>
            {/* IMAGE */}
            <Image source={{ uri: image }} style={imageStyle} />

            {/* AGE */}
            {age && (
                <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        Age: {new Date().getFullYear() - d.getFullYear()}
                        {/* <Icon name="heart" />  */}
                    </Text>
                </View>
            )}

            {/* NAME */}
            <Text style={nameStyle}>{name}</Text>

            {/* DESCRIPTION */}
            {description && (
                <Text style={styles.descriptionCardItem}>{description}</Text>
            )}

            {/* STATUS */}
            {status && (
                <View style={styles.status}>
                    <View style={status === 'Online' ? styles.online : styles.offline} />
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            )}

            {/* ACTIONS */}
            {actions && (
                <View style={styles.actionsCardItem}>
                    {/* <TouchableOpacity style={styles.miniButton}>
                        <Text style={styles.star}>
                            <Icon name="star" />
                        </Text>
                    </TouchableOpacity> */}



                    <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={() => onPressRight()}>
                        <Text style={styles.like}>
                            <AntDesign color="#44915e" name="heart" size={40} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { marginLeft: 20 }]}
                        onPress={() => onPressLeft()}
                    >
                        <Text style={styles.dislike}>
                            <Feather name="x" color="#d94141" size={40} />
                        </Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={styles.miniButton}>
                        <Text style={styles.flash}>
                            <Icon name="flash" />
                        </Text>
                    </TouchableOpacity> */}
                </View>
            )}
        </View>
    );
};

export default CardItem;
