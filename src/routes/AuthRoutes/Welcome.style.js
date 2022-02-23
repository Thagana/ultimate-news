import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#24a0ed',
        width: 200,
        height: 50,
        borderRadius: 10
    },
    iconMargin: {
        marginHorizontal: 4,
    },
    googleText: {
        color: '#fff'
    }
});

export default styles