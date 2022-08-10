import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        marginHorizontal: 30,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 4,
    },
    rowItems: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    rowAction: {
        marginHorizontal: 12,
    },
    showText: {
        marginLeft: 2,
    }
});

export default styles;