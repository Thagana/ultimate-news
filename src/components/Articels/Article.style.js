import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 20
    },
    icon: { 
        marginHorizontal: 10
    }
});

export default styles;