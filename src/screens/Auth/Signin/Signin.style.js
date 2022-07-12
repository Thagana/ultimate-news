import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Avatar: {
        width: 100,
        height: 100
    },
    googleGoogleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 7,
        width: 300,
        height: 50,
        margin: 2,
        padding: 3,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24a0ed',
        width: 300,
        height: 50,
        borderRadius: 10,
        margin: 2
    },
    textButton: {
        color: '#fff'
    },
    verifyCodeText: {
        textDecorationLine: 'underline'
    },
});

export default styles;