import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Avatar: {
        width: Platform.OS === 'ios' ? wp(60): wp(57),
        height: Platform.OS === 'ios' ? hp(28): hp(30.2)
    },
    googleGoogleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderColor: '#000',
        borderWidth: wp(.4),
        borderRadius: wp(1),
        width: wp(80),
        height: hp(8),
        padding: wp(4),
        margin: wp(1)
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24a0ed',
        width: wp(80),
        height: hp(8),
        borderRadius: wp(1),
        margin: wp(1)
    },
    textButton: {
        color: '#fff',
        fontSize: wp(4),
    },
    verifyCode: {
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
        textDecorationLine: 'underline',
        margin: wp(1),
        fontSize: wp(4)
    }
});

export default styles;