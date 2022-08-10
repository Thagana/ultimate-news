import { StyleSheet } from "react-native";


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
        height: 60,
        padding: 10,
        margin: 3
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24a0ed',
        width: 300,
        height: 60,
        borderRadius: 10,
        margin: 3
    },
    textButton: {
        color: '#fff'
    },
    signInText: {
        textDecorationLine: 'underline'
    },
});

export default styles;