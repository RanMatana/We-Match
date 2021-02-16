import React from 'react';
import styles from '../Style';
import { Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileItem = ({
    age,
    gender,
    interested,
    about,
    location,
    range,
    name
}) => {
    return (
        <View style={styles.containerProfileItem}>
            {age && <View style={styles.matchesProfileItem}>
                <Text style={[styles.matchesTextProfileItem, { textAlign: 'center' }]}>
                    {/* <Icon name="heart" /> */}
                    Age: {age}
                </Text>
            </View>}

            {name && <Text style={styles.name}>{name}</Text>}

            {gender && <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Fontisto name="intersex" size={16} />
                </Text>
                <Text style={styles.infoContent}>Gender: {gender}</Text>
            </View>}

            {interested && <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <AntDesign name="like2" size={16} />
                </Text>
                <Text style={styles.infoContent}>Interested: {interested}</Text>
            </View>}

            {location && <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <EvilIcons name="location" size={20} />
                </Text>
                <Text style={styles.infoContent}>{location}</Text>
            </View>}

            {range && <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Entypo name="gauge" size={20} />
                </Text>
                <Text style={styles.infoContent}>{range}km</Text>
            </View>}

            {about && <View>
                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        <AntDesign name="profile" size={16} />
                    </Text>
                    <Text style={styles.infoContent}>About</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoContent}>{about}</Text>
                </View>
            </View>}

        </View>
    );
};

export default ProfileItem;
