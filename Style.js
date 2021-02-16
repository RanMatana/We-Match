import { StyleSheet, Dimensions, Platform } from 'react-native';

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

const { height, width } = Dimensions.get('screen');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;



export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width,
        height: height / 3
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
    },
    header: {
        width: width / 2,
        height: 60,
        margin: 50,
    },
    btnOpacity: {
        width: width - 100,
        height: 55,
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    },
    btnOpacityDefalut: {
        width: width / 2, height: 50, borderRadius: 100, borderWidth: 3, alignItems: 'center', justifyContent: 'center'
    },
    Card: {
        width: width / 3,
        height: height / 4,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 50
    },
    image: {
        width: width / 2,
        height: height / 3,
    },
    textLogin: {
        textAlign: 'center',
        fontSize: 19,
    },
    input: {
        height: 50, width: width - 100, backgroundColor: '#020a30', color: 'white', padding: 15, borderRadius: 20
    },
    ViewOfInput: {
        width, height: 70, flexDirection: 'column', justifyContent: 'space-around'
    },
    ViewOfImage: {
        width, height: height / 4, backgroundColor: '#e6e6e6', alignItems: 'center', justifyContent: 'center'
    },
    bg: {
        flex: 1,
        width,
        height,
    },
    containerRoom: { marginHorizontal: 10, marginTop: 10 },
    // COMPONENT - CARD ITEM
    containerCardItem: {
        backgroundColor: WHITE,
        borderRadius: 8,
        alignItems: "center",
        margin: 10,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 },
        borderWidth:3,
        borderColor:'white'
    },
    matchesCardItem: {
        marginTop: -35,
        backgroundColor: '#dc6997',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    matchesTextCardItem: {
        color: WHITE
    },
    descriptionCardItem: {
        color: GRAY,
        textAlign: "center"
    },
    status: {
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    online: {
        width: 6,
        height: 6,
        backgroundColor: ONLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    offline: {
        width: 6,
        height: 6,
        backgroundColor: OFFLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    statusText: {
        color: GRAY,
        fontSize: 12
    },
    actionsCardItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 30,
    },
    miniButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: WHITE,
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: DARK_GRAY,
        shadowOffset: { height: 10, width: 0 }
    },
    star: {
        color: STAR_ACTIONS
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 30,
        backgroundColor: '#e6e6e6',
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: DARK_GRAY,
        shadowOffset: { height: 10, width: 0 },
        borderRadius: 100,
        borderColor: 'white'
    },
    like: {
        fontSize: 25,
        color: LIKE_ACTIONS
    },
    dislike: {
        fontSize: 25,
        color: DISLIKE_ACTIONS
    },
    flash: {
        color: FLASH_ACTIONS
    },
    // COMPONENT - PROFILE ITEM
    containerProfileItem: {
        backgroundColor: WHITE,
        paddingHorizontal: 10,
        paddingBottom: 25,
        margin: 20,
        borderRadius: 8,
        marginTop: -65,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    matchesProfileItem: {
        width: 131,
        marginTop: -15,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
        textAlign: "center",
        alignSelf: "center"
    },
    matchesTextProfileItem: {
        color: WHITE
    },
    name: {
        paddingTop: 25,
        paddingBottom: 5,
        color: DARK_GRAY,
        fontSize: 15,
        textAlign: "center"
    },
    descriptionProfileItem: {
        color: GRAY,
        textAlign: "center",
        paddingBottom: 20,
        fontSize: 13
    },
    info: {
        paddingVertical: 8,
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    iconProfile: {
        fontSize: 12,
        color: DARK_GRAY,
        paddingHorizontal: 10
    },
    infoContent: {
        color: GRAY,
        fontSize: 13
    },
    top: {
        paddingTop: 50,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    // CONTAINER - PROFILE
    containerProfile: { marginHorizontal: 0 },
    photo: {
        width,
        height: 450
    },
    topIconLeft: {
        fontSize: 20,
        color: WHITE,
        paddingLeft: 20
    },
    topIconRight: {
        fontSize: 20,
        color: WHITE,
        paddingRight: 20
    },
    actionsProfile: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    iconButton: { fontSize: 20, color: WHITE },
    textButton: {
        fontSize: 15,
        color: WHITE,
        paddingLeft: 5
    },
    circledButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    roundedButton: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        height: 50,
        borderRadius: 25,
        backgroundColor: SECONDARY_COLOR,
        paddingHorizontal: 20
    },
    // Loading Component
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Home
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    // CONTAINER - MATCHES
    containerMatches: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },
    title: { paddingBottom: 10, fontSize: 32, color: DARK_GRAY, textAlign: 'center', fontWeight: 'bold' },

    // COMPONENT - MESSAGE
    containerMessage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        width
    },
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
        marginRight: 20,
        marginVertical: 15
    },
    message: {
        color: GRAY,
        fontSize: 12,
        paddingTop: 5
    },
    // CONTAINER - MESSAGES
    containerMessages: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },
    content: {
        width: width / 2 + 60,
        height: 80,
        flexDirection: 'column',
    }
});