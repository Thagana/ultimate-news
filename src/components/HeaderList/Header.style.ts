import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 27,
    },
    connected : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    connectedText: {
        fontSize: 20,
    },
    header: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30
    },
    searchContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    search: {
        borderRadius: 20,
        borderWidth: 1,
        color: '#fff',
        padding: 17,
    },
    weather: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    iconContainer: {
        padding: 10,
    },
    temperatureHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    weatherIcon: { 
        width: 50, 
        height: 50,
    },
    itemsHeader: {
        marginHorizontal: 3
    },
    listContainer: {
        flex: -1,
    }
    
});

export default style;